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

## Stack categories

Stacks are categorized as `stable`, `incubator` or `experimental` depending on the content of the stack.

- `stable`: Stable stacks meet this set of [technical requirements](https://github.com/appsody/stacks/blob/master/TECHNICAL_REQUIREMENTS.md).

- `incubator`: The stacks in the incubator folder are actively being worked on to satisfy the stable criteria.

- `experimental`: Experimental stacks are not being actively worked on and might not fulfill the requirements of an Appsody stack. These can be used for trying out specific capabilities or proof of concept work.

### Official Appsody Repositories

Below are the URLs for official Appsody repository releases.

| Repository     | URL                                                                                  |
| -------------- | ------------------------------------------------------------------------------------ |
| `stable`       | `https://github.com/appsody/stacks/releases/latest/download/stable-index.yaml`       |
| `incubator`    | `https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml`    |
| `experimental` | `https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml` |

By default, Appsody comes with the `incubator` and `experimental` repositories. Other repositories can be added by running the [`appsody repo add`](/docs/using-appsody/cli-commands/#appsody-repo-add) command.
