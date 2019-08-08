---
title: Creating a Stack
path: /docs/stacks/create
---

# Creating a Stack

A stack is made up of two main components, the stack image and templates that 
use the stack's image.
## Getting started

The quickest way to get started creating a new stack is to use the [sample stack](https://github.com/appsody/stacks/tree/master/samples/sample-stack).

1. Clone the stacks repository:
   ```bash
   git clone https://github.com/appsody/stacks.git
   cd samples/sample-stack
   ```

You now have the basic [structure](/docs/stacks/stack-structure) of a stack ready to create an Appsody stack.

## Creating the stack image
The stack image contains everything that will be common throughout all templates that leverage it. For example, the [`nodejs-express`](https://github.com/appsody/stacks/tree/master/incubator/nodejs-express/image) stack image provides health endpoints and prometheus metrics without developers needing to implement it themselves.

The `/image` directory will contain everything that is needed for the stack's image.

You **must** include a `Dockerfile-stack` file in the `/image` directory. This file defines the stack and the commands to be used by Appsody. Appsody uses [enviroment variables](/docs/stacks/environment-variables) exposed by the stack image to define these commands.

The `/image/project` directory contains the base of the application. You may decide not to include any application code here but it is recommended to add some value to the stack. For example, by controlling dependency versions. The `project` must include a production `Dockerfile` here which will be used by the [`appsody build`](/docs/using-appsody/cli-commands/#appsody-build) command. 

## Building a stack image
To build your stack image locally follow the below steps:
1. Navigate to the `/image` directory:
2. Build stack image:
```
docker build -t <org-name>/<stack-id> -f Dockerfile-stack .
```
You can now have access to the stack image to use and test locally.

### Pointing a template to use a specific stack image
1. Navigate to template directory
```
cd /templates/<template-name>
```
2. Edit `.appsody-config.yaml` to use your stack:
```
stack: <org-name>/<stack-id>
```
3. Run the template with the new stack image:
```
appsody run 
``` 

## Creating a template
Templates provide an initial application to enable developers to get started with a stack. They provide a starter application that a developer can expand and adapt as they require.

All templates should be created within `/templates`. Every template is contained within its own directory, `/templates/<template-name>`.

Each template must contain `appsody-config.yaml` to specify what stack image the template will use. For example:
```
stack: <org-name>/<stack-id>
``` 

If the stack is intended to be contributed to the  [Appsody stacks repository](https://github.com/appsody/stacks) the stack image should be called `appsody/<stack-name>:<stack-version>`.

## Contributing a stack
If you would like to contribute a new stack to the [stacks repository](https://github.com/appsody/stacks) the Appsody [contributing guildlines](https://github.com/appsody/website/blob/master/CONTRIBUTING.md) explains how.

We welcome new contributions but before starting a large piece of work we recommend to reach out to us on [slack](http://appsody-slack.eu-gb.mybluemix.net/) or [raise an issue](https://github.com/appsody/stacks/issues/) to start a discussion.

## Maintaining a separate repository
In addition to the main Appsody stacks repository, you can maintain your own set of stacks. This is useful for developing stacks and separating sets of stacks for different uses.

By default you have access to the `appsodyhub` repository:
```
$ appsody repo list
NAME      	URL                                                               
appsodyhub	https://raw.githubusercontent.com/appsody/stacks/master/index.yaml
```
A repository is defined by an `index.yaml`. This file lists all stacks and  templates it wants to make avalible.  See the `appsodyhub` [index](https://raw.githubusercontent.com/appsody/stacks/master/index.yaml) as an example.

Each template section must include a link to its `.tar.gz` file. This will be used by `appsody init` to initialize a Appsody project. 

You can add you repository by running:
```
appsody repo add <name> <index-url>
```
For example:
```
appsody repo add my-repo file:///Users/foo/index.yaml

appsody repo list
NAME      	URL                                                               
appsodyhub	https://raw.githubusercontent.com/appsody/stacks/master/index.yaml
my-repo   	file:///Users/foo/index.yaml
```

Once the repository has been added you can access the stacks in that repo by specifying the repository name when initializing your project:
```
appsody init my-repo/<stack-name>
```
