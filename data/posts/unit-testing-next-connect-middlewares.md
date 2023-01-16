---
title: Unit-testing next-connect middlewares for Next.js API routes
date: '2023-01-16'
tags: ['next.js', 'typescript', 'unit-testing']
draft: false
summary: "Let's take a look at how we can unit-test middlewares for Next.js API routes using Jest and next-connect."
---

# Unit-testing next-connect middlewares

Recently, I've been working a lot on a Next.js project that exposes a REST-API using Next.js API routes combined with Vercel's Serverless Functions.

I used the [`next-connect`](https://github.com/hoangvvo/next-connect) library to easily manage my API routes by creating custom middleware functions. If you've already used Express.js and middlewares, you'll feel right at home with `next-connect`.

## Creating our middleware

Let's create a simple `next-connect` middleware that checks if the request is authenticated, using a `Bearer <token>` in the `Authorization` header.

```typescript
// lib/middlewares/auth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";

// The secret that we'll use to verify the token in the request.
const MY_SECRET = "hello-world";

export async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  // Authorization header will contain `Bearer <token>`.
  const { authorization } = req.headers;

  // Make sure there is an auth header present in the request.
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Split the auth header into its type and value.
  const [authType, authValue] = authorization.split(" ");

  // Make sure the splitted header values are valid and present.
  if (authType !== "Bearer" || !authValue) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify the token
  if (authValue !== MY_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // If everything is valid, call the next middleware.
  return next();
}
```

## Creating a test route

Now that we have our middleware, let's create an API route that we can use to test our middleware.

```typescript
// pages/api/test.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import { authMiddleware } from "../../lib/middlewares/auth";

// Initialize the router for this endpoint.
const router = createRouter<NextApiRequest, NextApiResponse>();

router
  // Consume the auth middleware.
  .use(authMiddleware)
  // Implement our custom logic after the middleware, for a GET request.
  .get(async (req, res) => {
    return res.send("Hello World!");
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).json({ message: "Something unexpected went wrong" });
  },
});
```

With your web-browser, when you hit `localhost:3000/api/test` you should get a `401 Unauthorized` response, because you're not sending a valid `Authorization` header.

I recommend using [`insomnia.rest`](https://insomnia.rest/) to send requests to your API routes in order to add custom headers such as the `Authorization`.

## Unit-testing the middleware with Jest

Now that we have our middleware and our test route, let's write some unit-tests for our middleware.

We'll use [`jest`](https://jestjs.io/) and [`node-mocks-http`](https://www.npmjs.com/package/node-mocks-http).

### Mocking request, response and next

First, we need to mock the `request`, `response` and `next` objects. Those objects are provided by `next-connect` and are used by the middleware to interact with the request and response.

However, since we are in a testing environment, we need to mock those objects in order to be able to test our middleware.

Let's create an helper function that will create those objects for us.

```typescript
// lib/tests/node-mocks-http.ts
import type { NextApiRequest } from "next";
import { createRequest } from "node-mocks-http";

/**
 * Create mocked `NextApiRequest`, `NextApiResponse` and `NextHandler` objects
 * using `node-mocks-http`. This is useful for testing middleware functions.
 *
 * @returns An object containing the mocked `req`, `res` and `next`.
 */
export function createMockedRequest({
  query = {},
  body = {},
  headers = {},
}: {
  query?: { [key: string]: string };
  body?: { [key: string]: string };
  headers?: { [key: string]: string };
}) {
  // Create mocked `request` object with custom query, body and headers.
  const req = createRequest({ query, body, headers }) as NextApiRequest;

  // Create mocked `response` object by mocking the `status` and `json` methods.
  const res: any = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  };

  // Create mocked `next` function.
  const next = jest.fn() as any;

  return { req, res, next };
}
```

### Writing the tests

Now that we have our helper function to create mocked values, let's write our tests.

```typescript
// lib/middlewares/auth.test.ts
import { createMockedRequest } from "../tests/node-mocks-http";
import { authMiddleware } from "./auth";

describe("auth middleware", () => {
  it("should throw an error if there is no authorization header", () => {
    const { req, res, next } = createMockedRequest();

    // Run the middleware function with the mocked objects.
    authMiddleware(req, res, next);

    // The middleware should fail and not call the `next` function.
    expect(next).not.toHaveBeenCalled();
    // The middleware should return a `401` status code.
    expect(res.status).toHaveBeenCalledWith(401);
    // The middleware should return an error message.
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should execute next if authorization if valid", () => {
    // Create a mocked request with a valid `Authorization` header.
    const { req, res, next } = createMockedRequest({
      headers: { Authorization: "Bearer hello-world" },
    });

    authMiddleware(req, res, next);

    // The middleware should call the `next` function.
    expect(next).toHaveBeenCalled();
  });
});
```

That's it! You can now write unit-tests for your `next-connect` middleware functions using `jest`.
