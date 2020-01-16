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
These stacks are not production-ready and should be considered proof of concept work that are unstable, and subject to breaking changes. They should:
- Strictly adhere to the Appsody stack structure (i.e. [appsody stack lint](https://appsody.dev/docs/using-appsody/cli-commands#appsody-stack-lint) passes without errors)
- Support the [appsody init](https://appsody.dev/docs/using-appsody/cli-commands#appsody-init), [appsody run](https://appsody.dev/docs/using-appsody/cli-commands#appsody-run) and [appsody build](https://appsody.dev/docs/using-appsody/cli-commands#appsody-build) commands

### Incubator
These stacks are not production-ready and require further development to satisfy the stable criteria. They should encompass the experimental criteria and further:
- Provide documentation with regards to the limitations of the stack in the `README.md`
- Maintainers must remain active in terms of contributions and reviews
- Support the [appsody test](https://appsody.dev/docs/using-appsody/cli-commands#appsody-test) and [appsody deploy](https://appsody.dev/docs/using-appsody/cli-commands#appsody-deploy) commands

### Stable
These stacks are production-ready. They should encompass the incubator criteria and further:
- Support all Appsody CLI commands
- Possess no open, critical issues
- Pass on [appsody stack validate](https://appsody.dev/docs/using-appsody/cli-commands#appsody-stack-validate) and integration tests, on all 3 OS supported by Appsody without errors
- Specify minimum requirements required by the stack, in the `stack.yaml` (i.e. the minimum Appsody/Docker/Buildah version required)
- Support the [appsody build](https://appsody.dev/docs/using-appsody/cli-commands#appsody-build) command with Buildah
- Prevent creation of files on the local system that cannot be removed (i.e. files owned by root or other users)
- Specify explicit versions for all required Docker images
- Tag the stack with a major version (i.e. at least 1.0.0)
- Provide documentation with regards to the migration of existing projects to use the stack
- Exemplify [Docker best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) with particular attention paid to:
    1. An effort has been made to minimise the size of production images 
    2. Use the official base images and ensure security updates are brought into the final production image as necessary
    3. Only create containers that are run by non-root users

Ultimately, you will decide if the runtime is production-ready, and we will decide if the stack is production-ready for Appsody.

### Official Appsody Repositories

Below are the URLs for official Appsody repository releases.

| Repository     | URL                                                                                  |
| -------------- | ------------------------------------------------------------------------------------ |
| `stable`       | `https://github.com/appsody/stacks/releases/latest/download/stable-index.yaml`       |
| `incubator`    | `https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml`    |
| `experimental` | `https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml` |

By default, Appsody comes with the `incubator` and `experimental` repositories. Other repositories can be added by running the [`appsody repo add`](/docs/using-appsody/cli-commands/#appsody-repo-add) command.

## Contributing a stack

If you would like to contribute a stack, you would need to submit a pull request and decide which repository you think is most suitable, corresponding to the stability level of your stack. We will review it, provide further guidance and request changes as necessary. If we agree that the new stack fulfils the criteria of your chosen repository, we will approve, merge and release your stack. When we release your stack, the following will occur:
- A template archive for each stack template will be generated
- A docker image of the stack will be pushed to [Appsody’s DockerHub](https://hub.docker.com/u/appsody)
- The indexes for each repository will be updated

These same steps will occur for subsequent pull requests updating your stack. If you would like to move the stack to a different repository, you will need to submit a pull request, changing the stack from the current repository to the new repository directory. We will make a decision with regards to whether or not your stack fulfils the criteria of the new repository.