---
title: Appsody Stacks
---

# Appsody Stacks

Appsody provides pre-configured application stacks that enable rapid development of quality microservice-based applications. Stacks include a base container image and project templates, which provide the language runtimes, frameworks, and any additional libraries and tools that you need for local development. Stacks are an easy way to manage consistency and adopt best practices across many applications.

---

## What makes up a stack?

### Stack Image

Appsody uses a containerized environment during local development. The stack image defines this environment and specifies the stack behavior during the development lifecycle of the application.  

### Project templates
Project templates provide a starting point, typically a 'Hello World' application, for application development. Like other components within an Appsody stack, you can customize project templates and share them across teams.  

### Stack structure

Each Appsody stack is defined by a common set of source directories and files. The following example shows the structure for a stack called `my-stack`:

```bash
my-stack
├── README.md               # describes the contents of the stack and how it should be used
├── stack.yaml              # defines the different attributes of the stack and which template the stack should use by default
├── image/
|   ├── config/
|   |   └── app-deploy.yaml # configuration file for deploying an Appsody project using the Appsody Operator
|   ├── project/
|   |   ├── [files that provide the technology components of the stack]
|   |   └── Dockerfile      # defines the final image that will created by the appsody build command
│   ├── Dockerfile-stack    # defines the foundation stack image, and a set of environment variables for the local development cycle
|   └── LICENSE
└── templates/
    ├── my-template-1/
    |       └── [example files as a starter for the application, e.g. "hello world"]
    └── my-template-2/
            └── [example files as a starter for a more complex application]

```

The `image` directory contains files for the stack image. The `image/Dockerfile-stack` Dockerfile defines the exact steps for building the stack image. `Dockerfile-stack` builds the initial stack image for local development and the `Dockerfile` builds the final application image. They are independent of each other.

The `templates` directory contains one or more starter applications that are created for you when you initialize your projects. Every template is contained within its own directory, `/templates/<template-name>`.

### Generated files

`.appsody-config.yaml` is not part of the source structure. It is generated as part of the stack building process and is placed in the user directory by the `appsody init` command. This file specifies the stack image that is used and can be overridden for testing purposes to point to a locally built stack.

---

## Stack stability levels

The criteria for each Appsody stack stability level is as follows:

### Experimental
These stacks are not production-ready and are considered as proof of concept. They might be unstable, and subject to breaking changes. They should:
- Adhere to the Appsody stack structure (i.e. [appsody stack lint](https://appsody.dev/docs/using-appsody/cli-commands#appsody-stack-lint) passes without errors)
- Support the [appsody init](https://appsody.dev/docs/using-appsody/cli-commands#appsody-init), [appsody run](https://appsody.dev/docs/using-appsody/cli-commands#appsody-run) and [appsody build](https://appsody.dev/docs/using-appsody/cli-commands#appsody-build) commands

### Incubator
These stacks are not production-ready and require further development to satisfy the stable criteria. They should encompass the experimental criteria and further:
- Maintainers must remain active in terms of contributions and reviews
- Support the [appsody test](https://appsody.dev/docs/using-appsody/cli-commands#appsody-test) and [appsody deploy](https://appsody.dev/docs/using-appsody/cli-commands#appsody-deploy) commands
- Document the limitations of the stack in the `README.md`

### Stable
These stacks are production-ready. They should encompass the incubator criteria and further:
- Support all Appsody CLI commands
- Possess no open, critical issues
- Pass on [appsody stack validate](https://appsody.dev/docs/using-appsody/cli-commands#appsody-stack-validate) and integration tests, on all 3 OS supported by Appsody without errors
- Specify the minimum Appsody, Docker and Buildah versions required in the `stack.yaml`
- Support the [appsody build](https://appsody.dev/docs/using-appsody/cli-commands#appsody-build) command with Buildah
- Prevent creation of files on the local system that cannot be removed (i.e. files owned by root or other users)
- Specify explicit versions for all required Docker images
- Tag the stack with a major version (i.e. at least 1.0.0)
- Provide documentation with regards to the migration of existing projects to use the stack
- Follow [Docker best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/), including :
    1. Minimise the size of production images 
    2. Use the official base images 
    3. Images must not have any major security vulnerabilities
    4. Containers must be run by non-root users
- Must include a detailed `README.md`, including:
    1. A short description of the stack
    2. Any prerequisites or setup required before using the stack
    3. How to access any endpoints provided by the stack

### Official Appsody Repositories

Below are the URLs for official Appsody repository releases.

| Repository     | URL                                                                                  |
| -------------- | ------------------------------------------------------------------------------------ |
| `stable`       | `https://github.com/appsody/stacks/releases/latest/download/stable-index.yaml`       |
| `incubator`    | `https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml`    |
| `experimental` | `https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml` |

By default, Appsody comes with the `incubator` and `experimental` repositories. Other repositories can be added by running the [`appsody repo add`](/docs/using-appsody/cli-commands/#appsody-repo-add) command.

## Contributing a stack
Any contributor can submit a pull request to change a stack. However, typically, the Stack Release Team will wait for the Stack Maintainers' (as listed in the `stack.yaml`) approval, before approving and merging a stack change.

The following outlines the process to contributing a new stack:

1. The Stack Maintainer(s) submits a pull request, deciding the stability level of their stack. 

2. The Stack Release Team reviews the pull request, provides further guidance, and requests changes as necessary. 

3. If the Stack Release Team agrees the stack fulfils the criteria of the chosen stability level, the pull request gets approved and merged.

4. The Stack Release Team then releases the new stack. When the stack is released:
    - A template archive is generated for each stack template
    - A docker image of the stack is pushed to [Appsody’s DockerHub](https://hub.docker.com/u/appsody)
    - The indexes for each repository are updated

To move a stack from incubator to stable, or experimental to incubator, Stack Maintainers need to submit a pull request, changing the stack from the current repository to the new repository directory. The Stack Release Team makes the decision with regards to whether or not the stack fulfils the criteria of the new repository.