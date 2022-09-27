---
title: Create a simple atomic button component with React
date: '2021-11-05'
tags: ['react', 'design', 'tailwindcss']
draft: false
summary: 'Learn the basics of building low-level, reusable, atomic components with React, TypeScript and TailwindCSS.'
---

# Creating a simple atomic button component with React

Let's talk about creating simple and re-usable atomic-level UI components for React.

I like to have low-level UI components that follow a very simple design system.

Most of the time, I want at least 3 variants in my design-system:

- A primary variant which include the brand color.
- A secondary variant which is a bit less attractive to the eye to not distract the user, for a secondary action (e.g. delete confirm vs delete cancel).
- A tertiary variant which can be used for dark-mode or be even less attractive than the secondary variant or be a "danger" variant.

In the following example, I will be using:

- TypeScript: type-safe components.
- TailwindCSS: low-level utility CSS framework, easily customizable and adaptable for your design-systems.
- clsx: a simple utility to construct `classNames` strings conditionally.

## Example with a button component

First, I start to create an object which contains the multiple variants. This object contains the classnames to apply to the button element:

```tsx
// src/components/ui/Button.tsx
const VARIANTS = {
  primary: 'bg-indigo-500 text-gray-200 hover:bg-indigo-600',
  secondary: 'bg-gray-600 text-gray-200 hover:bg-gray-700',
  tertiary: 'text-red-600',
}
```

As you can see, it's only about colors in my variants classnames.

We can leverage the power of TypeScript to create types for our Button props:

```tsx
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // Add a `variant` prop to our button which can contain a key from the
  // `VARIANTS` object.
  variant?: keyof typeof VARIANTS
}
```

Let's write the code of our Button component:

```tsx
export const Button: React.FC<ButtonProps> = ({
  children,
  // We set a default variant
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) => (
  <button
    type={type === 'submit' ? 'submit' : 'button'}
    className={clsx(
      'flex items-center justify-center rounded-md px-4 py-2 text-base font-medium transition',
      VARIANTS[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
)
```

Your button component is now ready!

Entire code below:

```tsx
import React from 'react'
import clsx from 'clsx'

const VARIANTS = {
  primary: 'bg-indigo-500 text-gray-200 hover:bg-indigo-600',
  secondary: 'bg-gray-600 text-gray-200 hover:bg-gray-700',
  tertiary: 'text-red-600',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS
}

/**
 * A `<button />` that already have a default style. You can use the `variant`
 * prop to set a default variant style _(primary, secondary or tertiary)_.
 *
 * Use this button component only for actions that doesn't make the user leave
 * the page.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) => (
  <button
    type={type === 'submit' ? 'submit' : 'button'}
    className={clsx(
      'flex items-center justify-center rounded-md px-4 py-2 text-base font-medium transition',
      VARIANTS[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
)
```

## Conclusion

You can easily apply this concept of **variants** to many types of components, such as inputs.
