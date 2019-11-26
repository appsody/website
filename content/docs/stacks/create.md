---
title: Creating a Stack
---

# Creating a stack

You might like to create your own stack, for example if the current Appsody stacks don't meet your needs or if you want to add a framework or language that isn't currently supported.

A stack comprises of two main components: a stack image, and templates that use the stack image to provide starter applications for your development team to build on.

You can start by using either the Appsody CLI `appsody stack create` command, or Git clone. Both methods involve basing your new stack on an existing stack, to create the starting point for developing your own Appsody stack.

## Getting started

### Using the Appsody CLI

The quickest way to create a new stack is to use the `appsody stack create` command, which creates a new stack by copying an existing stack. By default, the new stack is based on the [sample stack](https://github.com/appsody/stacks/tree/master/samples/sample-stack). For example, to create a new stack named `my-stack`, in a new directory, use this command:
```
appsody stack create my-stack
```

If you want to use a different stack as the basis for your new stack, use the `copy` flag to specify the stack you want to use as the starting point. You can use `appsody list` to see the available stacks. For example, to create a new stack, called `my-stack`, based on the Node.js Express stack use this command:
```
appsody stack create my-stack --copy incubator/nodejs-express
```

### Using Git clone

To create a new stack using Git, clone the [sample stack](https://github.com/appsody/stacks/tree/master/samples/sample-stack) in the stacks repository.

1. Clone the stacks repository:
   ```bash
   git clone https://github.com/appsody/stacks.git
   cd stacks/samples/sample-stack
   ```

Whichever method you used to create your stack, you now have the basic [structure](/content/docs/stacks/stack-structure.md) of an Appsody stack.
