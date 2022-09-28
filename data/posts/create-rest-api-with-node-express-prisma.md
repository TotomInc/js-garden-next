---
title: Create a REST-API in no-time with Node.js, Express, Prisma and TypeScript.
date: '2022-04-20'
tags: ['node', 'typescript', 'prisma', 'api']
draft: false
summary: 'Leverage your web knowledge to create a back-end API with in no-time and few code.'
---

# Create a REST-API in no-time with Node.JS, Express and Prisma

## Introduction

Prisma is an **ORM** (Object Relational Mapper) framework to facilitate the integration of a database inside our project by providing multiple layers of abstractions for everything related to database manipulation.

The REST-API will be written in **TypeScript** for **Node.js**, use **Express** framework to expose the API and take advantage of **Prisma ORM** to manipulate the database (a MongoDB in our example, because of [the free database using MongoDB Atlas](https://www.mongodb.com/atlas/database)).

## Project setup with Prisma

Before writing some code, let's take a dive into how Prisma is structured:

- **Prisma Client**: auto-generated, type-safe database client that we will import in our code.
- **Prisma Studio**: a simple GUI (web-based) to view and edit our database data.
- **Prisma Migrate**: a tool to make database migration simple, however we won't use it since it doesn't yet supper MongoDB databases (at the time of writing).

![](https://res.cloudinary.com/practicaldev/image/fetch/s--tPxbUmgX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://imgur.com/CTGhQZ9.png%3Futm_source%3DPrisma%2BAmbassador%26utm_medium%3DBlog%2Bpost%26utm_campaign%3DPrisma%2BAP%2BNdi-tah%2BAnyeh%2BSamweld)

First step is to create a project directory and install dependencies:

```bash
mkdir prisma-node-express-rest-api
cd prisma-node-express-rest-api
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
```

Next, create a `tsconfig.json` file and add the following configuration to compile our TypeScript code:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

It's time to invoke the [**Prisma CLI**](https://www.prisma.io/docs/concepts/components/prisma-cli) tool with `npx`:

```bash
npx prisma # will log commands that can be used
npx prisma init # initialize prisma project
```

The second command should have generated 2 things:

- A new directory `prisma/` has been created and contains a `prisma/schema.prisma` file. This file contains the Prisma configuration and database schema.
- A `.env` file has been created at the root directory of the project, this is used to define environment variables such as the database connection string.

Let's edit `prisma/schema.prisma` to actually use **MongoDB**:

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

Now we can change the database connection string to point to our Mongo database. If you haven't done it yet, you can create [a free database using MongoDB Atlas](https://www.mongodb.com/atlas/database), this is what we will use in this example.

Change the environment variable `DATABASE_URL` defined in `.env`:

```env
DATABASE_URL="mongodb+srv://database-username:database-password@cluster0.lxhae.mongodb.net/exampleDatabase"
```

### Editing Prisma schema

Open `prisma/schema.prisma` and add the following database structure:

```prisma
model Post {
  id       String     @id @default(auto()) @map("_id") @db.ObjectId
  slug     String     @unique
  title    String
  body     String
  comments Comment[]
  author   User       @relation(fields: [authorId], references: [id])
  authorId String     @db.ObjectId
}

// Comments contain a comment string and connect back to the post.
// postId must have @db.ObjectId to match up with Post's id type
model Comment {
  id      String      @id @default(auto()) @map("_id") @db.ObjectId
  post    Post        @relation(fields: [postId], references: [id])
  postId  String      @db.ObjectId
  comment String
}

model User {
  id    String        @id @default(auto()) @map("_id") @db.ObjectId
  email String        @unique
  name  String?
  posts Post[]
}
```

This create a basic database consisting of `User` that can create `Post` which can contains `Comment` from all users.

### Using Prisma Client

To get started with Prisma Cilent, you should install `@prisma/client` npm package:

```bash
npm install @prisma/client
```

Remember when we said Prisma is type-safe with TypeScript?

It's because `@prisma/client` automatically invoke `prisma generate` command when installed, which means it actually parse our `prisma/schema.prisma` file and create type-safe bindings when using `@prisma/client` package in our code.

By doing this, we have a **type-safe ORM**.

No more missing variables or invalid queries when manipulating the database with Prisma!

![](https://res.cloudinary.com/prismaio/image/upload/v1628761155/docs/FensWfo.png)

From this, our Prisma setup should be complete and we can now move to the Prisma integration with **Express**.

## Using Express with Prisma

Install `express` and its typings, with some Express packages:

```bash
npm install --save express body-parser helmet && npm install --save-dev @types/express
```

Create an `src/index.ts` file which will contain the Express REST-API server logic:

```typescript
import { PrismaClient } from '@prisma/client'
import express from 'express'
import bodyparser from 'body-parser'
import helmet from 'helmet'

const client = new PrismaClient()
export const app = express()

// Basic Express middleware for security.
app.use(helmet())
// Middleware to parse request bodies.
app.use(bodyparser.json())

// Expose `GET /api/users` endpoint to retrieve all users.
app.get('/api/users', (req, res) => {
  // Connect to database and find all users.
  client.user
    .findMany()
    .then((users) => {
      // Send a 200 OK with a JSON payload containing all users.
      res.status(200).json({ users })
    })
    .catch((err) => {
      // Handle error case with a 500 Internal Server Error.
      console.log(err)
      res.status(500).json({ error: 'something went wrong :(' })
    })
})

// Expose `GET /api/user` endpoint to create a new user.
app.post('/api/user', (req, res) => {
  // Retrieve request payload from body.
  const { email, name } = req.body

  // Create a new user.
  client.user
    .create({ data: { email, name } })
    .then((user) => {
      // Send a 200 OK with a JSON paylolad containing the freshly created user.
      res.status(200).json({ user })
    })
    .catch((err) => {
      // Handle error case with a 500 Internal Server Error.
      console.log(err)
      res.status(500).json({ error: 'something went wrong :(' })
    })
})

// Make server listen for HTTP requests on port 3000.
app.listen(3000, () => console.log('Express REST-API opened on localhost:3000'))
```

The code above should work flawlessly if you copy/paste it.

It implements the following logic:

- Create an Express server.
- Expose an endpoint to list all users.
- Expose an endpoint to create a new user.
- Listen for HTTP requests on a specific port.

For more details, the code have been commented.

### Running the server

Run the server on-the-fly with `ts-node`:

```bash
./node_modules/.bin/ts-node src/index.ts
# server should start and log a message.
# we can now make HTTP requests on :3000.
```

## Testing the REST-API

When I want to test my REST-APIs, I like to use [Insomnia](https://insomnia.rest/) which is a simple yet powerful app to send HTTP requests, with a lot of customisation (payload, authentication, cookies, automation, etc).

With Insomnia, I created 2 requests, one to list all users and another one to create a new user.

When I run the request to create a new user `POST /api/user`, it gets successfully added to the database with the following response:

```json
// 200 OK
{
  "user": {
    "id": "625fb5598731c51602eb4c93",
    "email": "example.user@example.com",
    "name": "Test user"
  }
}
```

Now, I want to make sure my user has been added to the database, so I will run the `GET /api/users` endpoint which should return a list of **all** users present in the database:

```json
// 200 OK
{
  "users": [
    {
      "id": "625fb5598731c51602eb4c93",
      "email": "example.user@example.com",
      "name": "Test user"
    }
  ]
}
```

## Conclusion

We learned how to create a simple yet powerful REST-API with few code that is entirely type-safe thanks to TypeScript and Prisma.

Our database is easily scalable thanks to MongoDB.

We leveraged our web knowledge to create a working back-end with Node.js.

This basic example is not production ready as **it lacks security features**, but this is not the goal of this post.

In the second part, we'll see how we can work with relation between models (such as creating a blog-post for a user).
