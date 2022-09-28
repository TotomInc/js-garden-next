---
title: Introduction to React Testing Library
date: '2021-11-18'
tags: ['react', 'unit-testing']
draft: false
summary: 'A quick introduction to unit-testing with React Testing Library.'
---

# What is React Testing Library?

React Testing Library is a library that makes it easy to test React components in a user-centric way.

As said by Kent C. Dodds in the [React Testing Library blog post](https://kentcdodds.com/blog/react-testing-library-tutorial-part-1-introduction):

> The more your test resembles the way your software is used, the more confidence they can give you.

In our case, our software is used by end users. End users sees our websites and interact with them using the browser DOM, so we will test our components using the DOM API which Testing Library already implements very well.

React Testing Library is a superset of DOM Testing Library, which is the core library that implements all the functions related to DOM manipulation.

## What problems does React Testing Library solve?

- Write tests that doesn't include implementation details. [Here](https://kentcdodds.com/blog/testing-implementation-details) is a great article about implementation details and how they are bad for unit-testing.
- Our tests involve DOM manipulation which I find easier to write than unit-tests with "implementation details".

## What this library _is not_

- This library is not a test-runner. You need Jest or any other test-runner to run your tests. However, Jest is recommended.
- This library is not specific to a framework. It has various flavors and isn't specific to React. You can also find it for Vue, Angular, Svelte and even vanilla JS.

# React Testing Library

`create-react-app` projects already include out-of-the-box React Testing Library.

If you don't have it included in your project, you can install it with:

```bash
# npm
npm install --save-dev @testing-library/react

# yarn
yarn add -D @testing-library/react
```

## Why tests should use React Testing Library?

- **Increases confidence in your application and deployments** - combine it with a bit of code-coverage and when all tests are green (and properly covered), you can ship with confidence new releases with less bugs, which will also increase your customer satisfaction.
- **Reduce QA time** - your application will grow and you will have to spend more time on QA. React Testing Library will help you reduce that time.
- **Tests can be used as some documentation** - especially useful when working with larger teams. New developers can speed-up their onboarding process by reading the tests and trying to do some changes and seeing tests failing/passing.
- **Catch bugs before they happen** - React Testing Library will help you catch bugs before they happen to your end users.

## Creating our first test

Jest will try to find tests in a folder named `tests` or `__tests__` at the root of your project. It also tries to find every file with the suffix `.test.jsx` or `.spec.jsx` (it also works for `.tsx` for TypeScript).

I personally like to write tests in `.spec.jsx` files in the same folder as my components.

The component that we will test, is a simple counter that can be incremented.

```jsx
// components/Counter.jsx
import React from 'react'

export const Counter = () => {
  const [count, setCount] = React.useState(0)

  const increment = () => setCount(count + 1)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

Let's write our tests for the Counter component, please take notice of the comments in the code.

```jsx
// components/Counter.spec.jsx
import React from 'react'
// Utilities functions to manipulate the DOM.
import { screen, render, waitFor } from '@testing-library/react'
// This function is used to simulate DOM events that can be triggered from a user.
import userEvent from '@testing-library/user-event'

// Our Counter component that we made above.
import { Counter } from './Counter'

// Our Jest describe block.
describe('Counter tests', () => {
  // The first test is a simple one that will verify if the component has been
  // successfully rendered.
  it('should render the component', () => {
    // Use the `render` function provided by `@testing-library/react` to
    // render the Counter component.
    render(<Counter />)

    // Use the `screen` function provided by `@testing-library/react` to
    // verify if the text "Count: 0" is rendered in the DOM.
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('should increment the counter', () => {
    render(<Counter />)

    // Find the button element by its text.
    const button = screen.getByText('Increment')

    // Simulate a click on the button.
    userEvent.click(button)

    // Make sure the counter has been incremented.
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })
})
```

Let's go to the next section to run our tests.

## Running our tests

In your `package.json` file, add the following scripts:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

- `test` will run all tests.
- `test:watch` will run all tests and watch for changes.
- `test:coverage` will run all tests and generate a code coverage report.

You can use the `jest` command to run your tests:

```bash
# npm
npm test

# yarn
yarn test
```

## Conclusion

That's all for now, I hope you find this article helpful and have a great time in testing your React components.
