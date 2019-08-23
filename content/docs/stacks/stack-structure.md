---
title: Stack structure
path: /docs/stacks/stack-structure
---
## Stack structure
```bash
my-stack
├── README.md
├── stack.yaml
├── image/
|   ├── project/
|   |   └── Dockerfile
│   └── Dockerfile-stack
└── templates/
    └── my-template/
```

## Stack.yaml
The stack.yaml defines different components of the stack and which template the stack should use by default. See the example below:
```bash
name: Sample Application Stack # concise one line name for the stack
version: 0.1.0 # version of the stack
description: sample stack to help creation of more appsody stacks # free form text explaining more about the capabilities of this stack and various templates
license: Apache-2.0 # license for the stack
language: nodejs # programming language the stack uses
maintainers: # list of maintainer(s) details
  - name: John Smith
    email: example@example.com
    github-id: jsmith
default-template: my-template # name of default template
```

## Stack Image
Appsody application stacks are provided to developers as a Docker image and include a pre-configured technology stack ready to start application development. It also has mechanisms to control which aspects can and cannot be overridden by the developer.

### Project directory:
The project folder should contain a production [Dockerfile](#Dockerfile) for your application and the project you are going to contribute as a content provider.

#### Dockerfile
Defines the final image that contains content from both the [image](#Image) and [template](#Templates). This is used to run the application as a whole.

### Dockerfile-stack:
The Dockerfile-stack defines the foundation application image, and a set of environment variables that specify the desired behaviour during local development cycle. It also defines what is exposed from the host machine to the container.

Environment variables can be set to alter the behaviour of the CLI and controller.

## Templates
A template is a pre-configured starter application that is ready to use with a particular image. It has access to all the dependencies supplied by that image and is able to include new functionality and extra dependencies to enhance the image where allowed.
