---
title: Creating a design system around the React-Select component
date: '2021-11-11'
tags: ['react', 'design']
draft: false
summary: 'Make the React-Select component easily customizable in your design-system.'
---

# Creating a design system around the React-Select component

I recently needed to create a small design-system around the famously known [React-Select](https://react-select.com/) component.

Its API is really great and so complete that it allows you to do all kind of stuff even for very specific use-cases.

On my project, I wanted to add custom styling on the React-Select component, which can be done [by following this part of their documentation](https://react-select.com/styles#provided-styles-and-state).

But then, my project grew more and I needed to add some styling variants, e.g. handling dark-mode.

The following example is written in TypeScript.

## Creating variants

I started to create a theme file which will contains all the logic about styling the React-Select component. This file (react-select-theme.ts) will contain the styling of the variants and a function to apply and override the default React-Select style.

Let's create some variants:

```tsx
// react-select-theme.ts
// It's easier to keep track of all our variants using a string literal type.
export type Variants = 'primary' | 'secondary'
```

Now we can now create the type which will contain the properties of each styling change to do:

```tsx
// react-select-theme.ts
export type VariantStyle = {
  // Those top-level properties comes from the "Style Object" API of React-Select
  // Read more about it: https://react-select.com/styles#style-object
  control: {
    backgroundColor: string
    boxShadow: string
  }

  placeholder: {
    color: string
  }

  input: {
    color: string
  }

  singleValue: {
    color: string
  }

  option: {
    backgroundColor: string
    backgroundColorFocused: string
    color: string
  }

  menu: {
    backgroundColor: string
  }
}
```

After creating those types, you can now create the variable that will contain the actual colors for our variants:

```tsx
// react-select-theme.ts
// Make sure our VARIANTS object is properly typed from the `Variants`
// string literal type and using a value of type `VariantStyle`.
const VARIANTS: { [key in Variants]: VariantStyle } = {
  // My primary variant is for the dark-mode.
  primary: {
    control: {
      backgroundColor: '#374151',
      boxShadow: '#6366F1',
    },

    placeholder: {
      color: '#9CA3AF',
    },

    input: {
      color: '#E5E7EB',
    },

    singleValue: {
      color: '#E5E7EB',
    },

    option: {
      backgroundColor: 'transparent',
      backgroundColorFocused: '#4B5563',
      color: '#E5E7EB',
    },

    menu: {
      backgroundColor: '#374151',
    },
  },

  // My secondary variant is for a light theme.
  secondary: {
    control: {
      backgroundColor: '#F3F4F6',
      boxShadow: '#6366F1',
    },

    placeholder: {
      color: '#9CA3AF',
    },

    input: {
      color: '#111827',
    },

    singleValue: {
      color: '#111827',
    },

    option: {
      backgroundColor: 'transparent',
      backgroundColorFocused: '#E5E7EB',
      color: '#111827',
    },

    menu: {
      backgroundColor: '#F3F4F6',
    },
  },
}
```

Our design-system is now type-safe and almost done. Let's apply our style changes to the React-Select component.

## Applying style changes to the React-Select component

I like to separate two different styles config when using React-Select, because we can use 2 different components by using the [isMulti prop](https://react-select.com/props):

- A simple select with only 1 selected option.
- A multi-select where you can handle multiple selected options.

To keep it simple, we will focus on applying style changes on a simple select component.

We want to keep our code type-safe, so you will need to import this type from React-Select:

```tsx
// react-select-theme.ts
import { StylesConfig } from 'react-select'
```

A bit more about the StylesConfig type, it takes some generics:

```tsx
// node_modules/react-select/styles.d.ts
type StylesConfig<Option = unknown, IsMulti extends boolean = boolean>
```

We can take advantage of StylesConfig to say we will create a style that only applies to a single select instead of multi-select (the generic IsMulti = false which should be used with isMulti prop).

This is what we will do below, along with overriding default styles and use the ones from our design-system instead:

```tsx
// react-select-theme.ts
/**
 * Default style for the `react-select` component. This style config
 * should be used with `<Select isMulti={false} />`.
 */
export const singleSelectStyle = (variant: Variants = 'primary'): StylesConfig<unknown, false> => {
  const style = VARIANTS[variant]

  return {
    control: (provided, state) => ({
      ...provided,
      // We can use properties from our design-system from the `VARIANTS`
      // variable defined a bit upper.
      backgroundColor: style.control.backgroundColor,
      boxShadow: state.isFocused ? `0 0 0 3px ${style.control.boxShadow}, 0 0 #0000` : '',
      transition: 'box-shadow 0.1s ease-in-out',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: style.placeholder.color,
    }),

    input: (provided) => ({
      ...provided,
      color: style.input.color,
    }),

    singleValue: (provided) => ({
      ...provided,
      color: style.singleValue.color,
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? style.option.backgroundColorFocused
        : style.option.backgroundColor,
      color: style.option.color,
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: style.menu.backgroundColor,
    }),
  }
}
```

## Creating a wrapper UI component

To keep things simple, we will create a UI component wrapper around our React-Select.

I will create it under `src/components/Select.tsx`:

```tsx
// src/components/Select.tsx
import React from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'

import { Variants, singleSelectStyle } from '../react-select-theme'

// Create the type for the props of our wrapper React-Select component.
// `Variants` type comes from our React-Select design-system.
export type SelectProps = ReactSelectProps<SelectOption, false> & {
  variant?: Variants
}

/**
 * Wrapper around the `react-select` component with a default style.
 * Should be used for single values only (`isMulti=false`).
 */
export const Select: React.FC<SelectProps> = ({ variant, ...props }) => {
  return <ReactSelect {...props} styles={singleSelectStyle(variant)} isMulti={false} />
}
```

Our component is now ready to be used!

You can find the entire source-code of this article as well as a working example on this CodeSandbox: [https://codesandbox.io/s/react-select-design-system-i5p19](https://codesandbox.io/s/react-select-design-system-i5p19?file=/src/index.css)
