---
title: Modifying a Stack
---

# Modifying a Stack

While there are many Appsody stacks to choose from, you may want to alter some aspects of an existing stack to match your development needs or standards. The modifications can impact how users will develop, build and deploy applications using the stack.

Once you have made the necessary modifications, you can [package](/content/docs/stacks/package.md) the modified stack and test it locally using Appsody CLI.

When you have ensured the stack is working as intended, you can contribute the changes to the existing Appsody stack or maintain a separate version with your modifications.


## Project templates
Templates provide an initial application to enable developers to get started with a stack. Developers can expand and adapt this template to suit their application needs.

The `templates` directory contains one or more starter applications that are given to the user when they initialise their projects. Every template is contained within its directory, `/templates/<template-name>`.

Capabilities that apply to all templates are better suited for inclusion in the stack image.

## Stack image for local development
Appsody utilizes a containerized environment during local development. The stack image defines this environment and specifies the stack behaviour during application development lifecycle.

The stack image contains common capabilities that can be leveraged by all templates. For example, the [`nodejs-express`](https://github.com/appsody/stacks/tree/master/incubator/nodejs-express) stack image provides health endpoints and Prometheus metrics without developers needing to implement it themselves.

The `image` directory contains files for the stack image. The `image/Dockerfile-stack` defines the exact steps for building the stack image.

### Handling file mounts
During local development, the application code is held on the local file system and is mounted in the running container for the stack. Stack creators configure the `APPSODY_MOUNTS` [environment variable](/content/docs/stacks/environment-variables.md) to specify a list of mount paths to achieve this behaviour.

### Stack environment variables
Stack creators configure [environment variables](/content/docs/stacks/environment-variables.md) in `Dockerfile-stack` to specify the commands for running, debugging and testing the application. `Appsody CLI` and `Appsody controller` inspect these environment variables and then drive the expected behaviour for the developer during local development.

### Monitoring file changes
Stack creators configure [environment variables](/content/docs/stacks/environment-variables.md) in `Dockerfile-stack` to specify which files are monitored for changes and how to reflect those changes in the running application.

### Managing dependencies
Appsody provides the ability to cache any installed dependencies across runs to accelerate local development. This is achieved by creating and mounting a volume independent of a specific container instance.

Stack creators configure the `APPSODY_DEPS` [environment variable](/content/docs/stacks/environment-variables.md) to specify the directory to be cached.

## Application build and deployment
Stack creators provide `Dockerfile` for building a container image for Appsody applications which includes capabilities from the stack and developer's application.

`Appsody CLI` uses this `Dockerfile` to create the application container image when [`appsody build`](/content/docs/using-appsody/cli-commands.md/#appsody-build) command is run.

Stack creators also provide a template deployment manifest `image/config/app-deploy.yaml` that `Appsody CLI` uses to support deployments to Kubernetes or Knative platforms using the `Appsody Operator`.