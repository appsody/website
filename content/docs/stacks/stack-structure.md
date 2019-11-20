---
title: Stack structure and requirements
---

# Stack structure

A stack is designed to support both ways of working; local development, and build and deploy. Therefore, all stacks follow the same structure, which is shown here:

```bash
my-stack
├── README.md //describes the contents of the stack and how it should be used
├── stack.yaml //defines the different attributes of the stack and which template the stack should use by default
├── image/
|   ├── config/
|   |   └── app-deploy.yaml //configuration file for deploying an Appsody project using the Appsody Operator
|   ├── project/
|   |   ├── [files that provide the technology components of the stack]
|   |   └── Dockerfile //defines the final image that will created by the appsody build command
│   ├── Dockerfile-stack //defines the foundation stack image, and a set of environment variables for the local development cycle
|   └── LICENSE
└── templates/
    ├── my-template-1/
    |       └── [example files as a starter for the application, e.g. "hello world"]
    └── my-template-2/
            └── [example files as a starter for a more complex application]

```

The stack structure is processed when you build a stack, to generate a Docker image for the stack, along with tar files of each of the templates, which can then all be stored/referenced in a local or public Appsody repository. The Appsody CLI can then access such a repo, to use the stack to initiate local development.

 One of things that can initially cause confusion when looking at the source of an Appsody stack is that there are two Dockerfiles. The Dockerfiles are independent of each other - one is used to build the initial stack image (`Dockerfile-stack`) and one to build the final application image (`Dockerfile`). These are both described as we examine the scenarios.


 ## The role of a stack in the development process

 The fundamental goal of stacks is to simplify the life of the developer trying to build an application using a specific set of technologies or development pattern. As such, a stack is designed to support two ways of working

 ### Local Development  
 During local development, the stack provides everything to enable the development of a new application on the local machine, with the application *always* being run in a (local) containerized Docker environment. The fact that application development uses containerization from the start (as opposed to development solely in the user space of the local machine) minimizes the chances of introducing subtle issues in the containerization process, and removes the need for a developer to install the core technology components that will underpin their application.Therefore, the requirements on the stack are to have all the dependencies for the particular technologies involved pre-built into the Docker image, and also to dynamically compliment these with whatever dependencies are added explicitly by the developer for their code.  Local development consists of the Appsody CLI (hooked into a local IDE if required), communicating with a local Docker container that is running the application under development. Furthermore, local development is accelerated by enabling application code to be held on the local file system, whilst being mounted in the Docker container, so that a local change can automatically trigger a restart of the application.

 ### Build and Deploy  
 During build and deploy, the stack enables the Appsody CLI to build a self-contained Docker image that includes both the core technologies in the stack plus the application code that has been developed, along with the combined dependencies of both. The resulting image can then be deployed manually or programmatically to any platform that supports Docker images (such as a local or public Kubernetes cluster).

## Summary of files within the stack source and user directory structure

### Stack.yaml

The `stack.yaml` file in the top level directory defines the different attributes of the stack and which template the stack should use by default. See the following example:

```bash
name: Sample Application Stack   # concise one line name for the stack
version: 0.1.0                   # version of the stack
description: sample stack to help creation of more Appsody stacks # free form text explaining more about the capabilities of this stack and various templates
license: Apache-2.0              # license for the stack
language: nodejs                 # programming language the stack uses
maintainers:                     # list of maintainer(s) details
  - name: John Smith
    email: example@example.com
    github-id: jsmith
default-template: my-template-1  # name of default template
```

### README

The top level directory must contain a `README.md` markdown file that describes the contents of the stack and how it should be used.

### LICENSE

The `image` directory must contain a `LICENSE` file.

### app-deploy.yaml

The `app-deploy.yaml` is the configuration file for deploying an Appsody project using the Appsody Operator. For more information about specifics, see [Appsody Operator User Guide](https://github.com/appsody/appsody-operator/blob/master/doc/user-guide.md).

### Dockerfile-stack

The `Dockerfile-stack` file in the `image` directory defines the foundation stack image, and a set of environment variables that specify the desired behaviour during the local development cycle. It also defines what is exposed from the host machine to the container during local development.

Environment variables can be set to alter the behaviour of the CLI and controller (see [Appsody Environment Variables](/docs/stacks/environment-variables)).

### Dockerfile

The `Dockerfile` in the `image/project` directory defines the final image that will created by the `appsody build` command, which needs to contain the content from both the stack itself along with the user application (typically modified from one of the templates). This is used to run the application as a whole, outside of Appsody CLI control.

### Templates

A template is a pre-configured starter application that is ready to use with the particular stack image. It has access to all the dependencies supplied by that image and is able to include new functionality and extra dependencies to enhance the image. A stack can have multiple templates, perhaps representing different classes of starter applications using the stack technology components.

### .appsody-config.yaml

The `.appsody-config.yaml` is not part of the the source structure. It is generated as part of the stack building process and will be placed in the user directory by the `appsody init` command. This file specifies the stack image that is used and can be overridden for testing purposes to point to a locally built stack.

For example, the following specifies that the template uses the python-flask image:

```bash
stack: python-flask:0.1
```
