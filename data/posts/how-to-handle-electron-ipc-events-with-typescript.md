---
title: How to handle Electron IPC events (renderer, main, context-bridge) with TypeScript
date: '2022-01-08'
tags: ['electron', 'typescript']
draft: false
summary: 'Manage your IPC events by using type-safe context-bridge in Electron apps with TypeScript and benefit from Electron security features.'
---

> Last updated: 2022-03-15

## Introduction

Electron IPC (inter-process communication) is a communication system between the main process and the renderer process.

Your main process is powered by NodeJS, which means you can access, for example, the `fs` module and read from files.

For security reasons, the renderer process **cannot** access such modules as it could expose vulnerabilities for your users.

Let's say we need to read a file from the renderer process, here's is a basic example:

1. Your user click on a button to read a file. The renderer process will send a `read-file` event to the main process using IPC.
2. Main process receives the event `read-file` and call `fs.readFileSync` to read the file. Only the main process can read the file because we are using the `fs` (filesystem) module from the Node.js API.
3. Once the file has been read, the main process send a `read-file-success` event to the renderer process, with the content of the file.

However, and still for security reasons, Electron introduced the `preload` script as a way to **expose whitelisted wrappers** around modules that need an access to Node.js APIs.

By doing this, you avoid exposing the `require` function, which is a function that can be **extremely dangerous** if your application need to fetch remote content (which many do).

For a deep dive about Electron process model, IPC and context-bridge module, [I already wrote a post about it here](https://blog.totominc.io/blog/electron-process-model).

We will use **TypeScript** for this post and assume you have a complete build system to handle compilation of main, renderer and preload (a blog post about this will come later).

## Isolating renderer and main processes

First, we need to make sure that our processes (`main` and `renderer`) are properly isolated from each other:

```typescript
// src/main.ts
const { BrowserWindow } = require('electron')

const win: BrowserWindow = new BrowserWindow({
  webPreferences: {
    // This is a default since Electron 5.
    nodeIntegration: false,
    // Protect against prototype pollution.
    contextIsolation: true,
    // Disable remote module.
    enableRemoteModule: false,
    // Link to your compiled preload file.
    preload: path.join(__dirname, '../dist/preload.js'),
  },
})
```

## Creating the preload script and exposing its functions

After we tweaked the parameters of our `BrowserWindow`, we can create our `src/preload.ts` file:

```typescript
// src/preload.ts

// `contextBridge` expose an API to the renderer process.
// `ipcRenderer` is used for IPC (inter-process communication) with main process.
// We use it in the preload instead of renderer in order to expose only
// whitelisted wrappers to increase the security of our aplication.
import { contextBridge, ipcRenderer } from 'electron'

// Create a type that should contain all the data we need to expose in the
// renderer process using `contextBridge`.
export type ContextBridgeApi = {
  // Declare a `readFile` function that will return a promise. This promise
  // will contain the data of the file read from the main process.
  readFile: () => Promise<string>
}

const exposedApi: ContextBridgeApi = {
  readFile: () => {
    // Send IPC event to main process to read the file.
    ipcRenderer.send('read-file')

    // Wrap a promise around the `.once` listener that will be sent back from
    // the main process, once the file has been read.
    return new Promise((resolve) => {
      ipcRenderer.once('read-file-success', (event, data: string) => resolve(data))
    })
  },
}

// Expose our functions in the `api` namespace of the renderer `Window`.
//
// If I want to call `readFile` from the renderer process, I can do it by
// calling the function `window.api.readFile()`.
contextBridge.exposeInMainWorld('api', exposedApi)
```

## Registering IPC events in the main process

Let's handle logic inside the main process. The following logic will be implemented:

1. Create an IPC listener for the `read-file` event.
2. When `read-file` event is received, start reading a basic `.txt` file using `fs` module.
3. When the file has been successfully read, send back an IPC event `read-file-success` to the renderer process containing the data of the file.

```typescript
// main.ts
import fs from 'fs'

// ...

// Wait for Electron app to be ready before registering IPC listeners.
app.whenReady().then(() => {
  // Listen to the `read-file` event.
  ipcMain.on('read-file', () => {
    const fileContent = fs.readFileSync('./file-to-read.txt', { encoding: 'utf-8' })

    // Send back an IPC event to the renderer process with the file content.
    event.sender.send('read-file-success', fileContent)
  })
})
```

## Providing extended context-bridge types to the renderer `Window`

You may get a compilation error with the source-code of your renderer process while trying to access the declared `window.api` property, especially if you have an ESLint setup:

```
Unsafe member access .readFile on an `any` value.
eslint@typescript-eslint/no-unsafe-member-access

Unsafe call of an `any` typed value.
eslint@typescript-eslint/no-unsafe-call

Property 'api' does not exist on type 'Window & typeof globalThis'.
ts(2339)
```

That's because TypeScript doesn't know that we are extending the `Window` of our renderer process and we need to explicitely tell it that we have a new **typed** property defined on our `window`.

If you remember, we created an exported type `ContextBridgeApi` in `src/preload.ts`. We can actually use this type and declare in our renderer source-code that we have extended the `Window` property with an object `api` containing this exact type `ContextBridgeApi`.

This method is called in other words in TypeScript, augmenting types.

Create a file `window.d.ts` at the root of your renderer source-code:

```typescript
// This file should augment the properties of the `Window` with the type of the
// `ContextBridgeApi` from `Electron.contextBridge` declared in `src/preload.ts`.
import type { ContextBridgeApi } from './preload'

declare global {
  interface Window {
    api: ContextBridgeApi
  }
}
```

You may need to reload VSCode (or restart any dev-server) after creating the file and you should notice that compilation/ESLint errors are gone, but also benefit from VSCode IntelliSense.

## Conclusion

I hope this post has helped you to understand how to use Electron IPC with TypeScript especially while keeping in mind the security purposes of doing this.
