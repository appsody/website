---
path: /docs/stacks/create
---

# Creating a Stack

A stack is made up of two main components, the stack image and templates that 
use the stack's image. The structure 
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

The `/image/project` directory contains the base of the application. You may decide not to include any functionality for the application but you must include a `Dockerfile` here which will be used by the [`appsody build`](/docs/using-appsody/cli-commands/#appsody-build) command. 

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
Templates allow for an initial project to be created for the developers. They provide a starter that the developer can expand and adapt as they require.

All templates should be created within `/templates`. Every template is contained within its own directory, `/templates/<stack-name>`.

Each template must contain `appsody-config.yaml` to specify what stack image the template will use. For example:
```
stack: <org-name>/<stack-id>
``` 

If the stack is intended to be contributed to the  [Appsody stacks repository](https://github.com/appsody/stacks) the stack image should be called `appsody/<stack-name>:<stack-version>`.

















