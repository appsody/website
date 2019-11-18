---
title: Creating a Stack
---

# Creating a stack

You might like to create your own stack, for example if the current Appsody stacks don't meet your needs or if you want to add a framework or language that isn't currently supported.

A stack comprises two main components: a stack image, and templates that use the stack image to provide starter applications for your development team to build on.

You can start by using either the Appsody CLI `appsody stack create` command, or Git clone. Both methods involve basing your new stack on an existing stack, to create the starting point for developing your own Appsody stack.

## Getting started

### Using the Appsody CLI

The quickest way to create a new stack is to use the `appsody stack create` command, which creates a new stack by copying an existing stack. By default, the new stack is based on the [sample stack](https://github.com/appsody/stacks/tree/master/samples/sample-stack). For example, to create a new stack named `my-stack`, in a new directory, use this command:

`appsody stack create my-stack`

If you want to use a different stack as the basis for your new stack, use the `copy` flag to specify the stack you want to use as the starting point. You can use `appsody list` to see the available stacks. For example, to create a new stack, called `my-stack`, based on the Node.js Express stack use this command:

`appsody stack create my-stack --copy incubator/nodejs-express`

### Using Git clone

To create a new stack using Git, clone the [sample stack](https://github.com/appsody/stacks/tree/master/samples/sample-stack) in the stacks repository.

1. Clone the stacks repository:
   ```bash
   git clone https://github.com/appsody/stacks.git
   cd stacks/samples/sample-stack
   ```

Whichever method you used to create your stack, you now have the basic [structure](/docs/stacks/stack-structure) of an Appsody stack.

## Creating the stack image
The stack image contains everything that will be common throughout all templates that leverage it. For example, the [`nodejs-express`](https://github.com/appsody/stacks/tree/master/incubator/nodejs-express/image) stack image provides health endpoints and prometheus metrics without developers needing to implement it themselves.

The `/image` directory will contain everything that is needed for the stack's image. You **must** include a `Dockerfile-stack` file in the `/image` directory, which defines how the stack image is built.

Stack creators configure [environment variables](/docs/stacks/environment-variables) in `Dockerfile-stack` to specify the behaviour they expect from the stack throughout the application development lifecycle. `Appsody CLI` and `Appsody controller` inspect these environment variables and then drive the expected behaviour for the developer.

If a stack image is built upon another stack's image, it will inherit all the Appsody variables from the base stack. It can override the variables it wants to change. This allows users to create stacks with slightly different behaviour while still getting updates from the base stack.

The `/image/project` directory contains the base of the application. You may decide not to include any application code here but it is recommended to add some value to the stack. For example, by controlling dependency versions. The `project` **must** include a production `Dockerfile` here which will be used by the [`appsody build`](/docs/using-appsody/cli-commands/#appsody-build) command.

## Creating a template
Templates provide an initial application to enable developers to get started with a stack. They provide a starter application that a developer can expand and adapt as they require.

All templates should be created within `/templates`. Every template is contained within its own directory, `/templates/<template-name>`.

If the stack is intended to be contributed to the  [Appsody stacks repository](https://github.com/appsody/stacks) the stack image should be called `appsody/<stack-name>:<stack-version>`.

## Packaging a stack locally
Now that have you have created a stack you can [package](/docs/stacks/package) it locally.

## Contributing a stack
If you would like to contribute a new stack to the [stacks repository](https://github.com/appsody/stacks) the Appsody [contributing guidelines](https://github.com/appsody/website/blob/master/CONTRIBUTING.md) explain how.

We welcome new contributions but before starting a large piece of work we recommend that you reach out to us on [Slack](http://appsody-slack.eu-gb.mybluemix.net/) or [raise an issue](https://github.com/appsody/stacks/issues/) to start a discussion.

## Maintaining a separate repository
In addition to the main Appsody stacks repository, you can maintain your own set of stacks. This is useful for developing stacks and separating sets of stacks for different uses.

By default you have access to the `incubator` repository:
```
$ appsody repo list
NAME      	    URL                                                               
*incubator	    https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml
experimental    https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml
```
A repository is defined by an `index.yaml` file. This file lists all the stacks and templates that are available within a repository. You can modify the index files within your own repositories, to say which stacks and templates you want to be available. See the `incubator` [index](https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml) file for an example.

Each template section must include a link to its `.tar.gz` file. This file is used by `appsody init` to initialize an Appsody project.

You can add your repository by running:
```
appsody repo add <name> <index-url>
```
For example:
```
appsody repo add my-repo file:///Users/foo/index.yaml

appsody repo list
NAME      	   URL                                                               
*incubator	   https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml
experimental   https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml
my-repo        file:///Users/foo/index.yaml
```

Now you can access the stacks in your repo by specifying the repository name when you initialize your project:
```
appsody init my-repo/<stack-name>
```
