---
title: Integrating an API with React-Query and TypeScript
date: '2021-12-03'
tags: ['react', 'react-query', 'typescript', 'api']
draft: false
summary: 'Integrate a third-party API with the React-Query library while being type-safe.'
---

# Integrating an API with React-Query and TypeScript

React-Query can be pretty complex to use with TypeScript, as I haven't found great examples of how to use it especially with TypeScript.

In this example, we will use native browser `fetch` alongside React-Query to fetch some data while being entirely type-safe.

### Creating an API function to call the endpoint

I like to create my API functions into a `src/API.ts` file.

Let's start with a basic API function to fetch data for a specific user-account.

```tsx
// src/API.ts
// `QueryFunctionContext` is the type used passed to the API function parameter.
import { QueryFunctionContext } from 'react-query'

type UserAccountResponse = {
  userId: number
  user: string
  role: 'member' | 'editor' | 'admin'
}

/**
 * Get user account details.
 */
export const getUserAccount = (
  // Type the payload passed from our React component into our API function.
  // We want to pass an object containing the `accountName` property.
  // The first element (`string`) is the key of the query (needed by react-query).
  params: QueryFunctionContext<[string, { accountName?: string }]>
): Promise<UserAccountResponse> => {
  // We can destructure `param.queryKey`:
  //  - first item is the query key.
  //  - second item is the object containing properties passed from the React component.
  const [, { accountName }] = params.queryKey

  // Make sure parameters passed from React component are not undefined.
  if (!accountName) {
    throw new Error('accountName is not defined.')
  }

  // Do a native `fetch`. Handle errored responses (4xx, 5xx).
  return fetch(`/api/user?accountName=${accountName}`, { method: 'GET' }).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to fetch user-account: error ${response.status}`)
    }

    return response.json() as Promise<UserAccountResponse>
  })
}
```

- `QueryFunctionContext` is used to bridge the type between the payload we pass from our React component, to our API function.
- `UserAccountResponse` is a basic type that match the response of our back-end.
- `getUserAccount` is the exported function that we will pass to the `useQuery` function in our React component.
- Use the native `fetch` implementation, no need for `axios` or any other third-party fetching library.
- It's a good practice to always verify if your parameters passed from the React component, are not `undefined` in the API function.

### Configure React-Query with the QueryClientProvider

Use the `QueryClientProvider` component to make the use of React-Query easier by providing the `QueryClient` to the whole application.

```tsx
// src/App.tsx
import { QueryClient, QueryClientProvider } from 'react-query'

import { UserAccount } from './components/UserAccount'

export default function App() {
  // You can change the options of the QueryClient. Please be aware of
  // those important default options in React-Query:
  // https://react-query.tanstack.com/guides/important-defaults
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <UserAccount />
    </QueryClientProvider>
  )
}
```

### Consuming our API function into a React component with useQuery

Now that our API function is created, we can consume it in a basic React component.

```tsx
// src/components/UserAccount.tsx
import * as React from 'react'
import { useQuery } from 'react-query'

import { getUserAccount } from '../API'

export const UserAccount: React.FC = () => {
  const fetchUserAccount = useQuery(['getUserAccount', { accountName: 'foobar' }], getUserAccount)

  return (
    <div>
      {fetchUserAccount.isLoading ? <p>Loading "foobar" account...</p> : null}
      {fetchUserAccount.data ? fetchUserAccount.data : null}
    </div>
  )
}
```
