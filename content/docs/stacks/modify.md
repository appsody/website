---
title: Modifying a Stack
---

# Modifying a Stack
While there are many Appsody stacks to choose from, you might want to alter some aspects of an existing stack to match your development needs or standards. The modifications can impact how users develop, build, and deploy applications that use the stack.

After you make your modifications, you can [package](/content/docs/stacks/package.md) the modified stack and test it locally using the Appsody CLI.

## Project templates
Templates provide an initial application to enable developers to get started with a stack. Developers can expand and adapt the templates to suit the needs of their applications.

The `templates` directory contains one or more starter applications that are created for the user when they initialize their projects. Every template is contained within its own directory, `/templates/<template-name>`.

Capabilities that apply to all templates are better suited for inclusion in the stack image.

## Stack image for local development
Appsody uses a containerized environment during local development. The stack image defines this environment and specifies the stack behavior during application development lifecycle.

The stack image contains common capabilities that can be used by all templates. For example, the [`nodejs-express`](https://github.com/appsody/stacks/tree/master/incubator/nodejs-express) stack image provides health endpoints and Prometheus metrics so the developers do not need to implement them.

The `image` directory contains files for the stack image. The `image/Dockerfile-stack` defines the exact steps for building the stack image.

### Handling file mounts
During local development, the application code is held on the local file system and is mounted in the running container for the stack. Stack creators configure the `APPSODY_MOUNTS` [environment variable](/content/docs/stacks/environment-variables.md) to specify a list of mount paths to achieve this behavior.

### Stack environment variables
Stack creators configure [environment variables](/content/docs/stacks/environment-variables.md) in `Dockerfile-stack` to specify the commands for running, debugging and testing the application. `Appsody CLI` and `Appsody controller` inspect these environment variables and then drive the expected behavior for the developer during local development.

### Monitoring file changes
Stack creators configure [environment variables](/content/docs/stacks/environment-variables.md) in `Dockerfile-stack` to specify which files are monitored for changes and how to reflect those changes in the running application.

### Managing dependencies
Appsody enables the caching of any installed dependencies across runs to accelerate local development. This is achieved by creating a volume independent of a specific container instance and then mounting it every time the appsody container is started.

Stack creators configure the `APPSODY_DEPS` [environment variable](/content/docs/stacks/environment-variables.md) to specify the directory to be cached.

## Application build and deployment
Stack creators must provide `Dockerfile` that defines how to build the container image for the Appsody application, including both capabilities from the stack, and the developer's application.

Appsody CLI uses the `Dockerfile` to create the application container image when [`appsody build`](/content/docs/using-appsody/cli-commands.md/#appsody-build) command is run.

Stack creators also provide a template deployment manifest `image/config/app-deploy.yaml` that Appsody CLI uses to support deployments to Kubernetes or Knative platforms using the Appsody Operator.