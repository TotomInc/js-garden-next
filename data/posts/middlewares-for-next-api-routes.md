---
title: Middlewares for Next.js API routes with next-connect
date: '2023-01-07'
tags: ['next.js', 'typescript']
draft: false
summary: 'Implement the middleware pattern similar to Express.js, inside your Next.js API routes using next-connect.'
---

# Middlewares for Next.js API routes

If you're familiar with Express.js middleware, you may have noticed that Next.js API routes don't support out-of-the-box a middleware pattern. This means that you can't easily create a middleware that can be used across multiple API routes.

A middleware is useful when you want to verify if the request is valid before executing the actual API route handler. For example, you may want to verify if the request is authenticated, or if the request contains a valid `Content-Type` header.

In this post, we'll take a look at how we can implement the middleware pattern similar to Express.js, inside your Next.js API routes using [`next-connect`](https://github.com/hoangvvo/next-connect).

## Creating the middleware

We will create a middleware that checks if a user exists in the database, based on the `userId` in the request.

- **If the user exists**, add the user object to the request object and call the next middleware (or API route handler).
- **If the user doesn't exist**, return a `404` response.

Let's create a `lib/middlewares/userId.ts` file, with the following code:

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";
import type { User } from "@prisma/client";

// I'm using Prisma as my ORM, but you can use any ORM you want.
import prisma from "@/lib/prisma";

// Extend the `NextApiRequest` type to include the user property.
export type UserIdRequest = NextApiRequest & { user: User };

export async function userId(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  // `id` is determined by the `pages/api/users/[id].ts` file.
  // You will hit `GET /api/users/1` and `req.query.id` will be `1`.
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Missing or invalid userId." });
  }

  // Using Prisma, we can find the user by its unique `id`.
  const user = await prisma.spreadsheet.findUnique({ where: { uuid: id } });

  // If the user is not found, return a 404 status code.
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Cast the `req` object to our custom `UserIdRequest` type and add the user
  // in the `req` object so we can manipulate it later in the API route handler.
  (req as UserIdRequest).user = user;

  return next();
}
```

## Using the middleware in the API route

Now that we have our middleware, we can use it in our API route. Let's create the `pages/api/users/[id]/index.ts` file, with the following code:

```typescript
import type { NextApiResponse } from "next";
import { createRouter } from "next-connect";

// Import the `userId` middleware and the request type `UserIdRequest`.
import { type UserIdRequest, userId } from "@/lib/middlewares/userId";

// Create a next-connect router with the `UserIdRequest` type as a type `request`
// for the `req` object.
const router = createRouter<UserIdRequest, NextApiResponse>();

router.use(userId).get(async (req, res) => {
  // This is the user object we added in the `userId` middleware.
  // Using generics, we can safely access the `user` property in the `req` object.
  console.log(req.user);

  // We only return the name of the user, but you can return any data you want.
  return res.status(200).json({ name: req.user.name });
});

export default router.handler({
  // `onNoMatch` is called when the request method is not supported by the API route.
  onNoMatch: (req, res) => {
    res.status(405).json({ error: "Method not allowed." });
  },

  // `onError` is called when an error is thrown in the API route handler.
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).json({ message: "Something unexpected went wrong" });
  },
});
```

I hope this post helped you understand how to implement the middleware pattern in Next.js API routes.
