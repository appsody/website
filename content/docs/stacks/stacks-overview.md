---
title: Appsody Stacks
---

# Appsody Stacks

Appsody provides pre-configured application stacks that enable rapid development of quality microservice-based applications. Stacks include a base container image and project templates.

Appsody stacks include language runtimes, frameworks and any additional libraries and tools that are required to simplify your local application development. Stacks are an easy way to manage consistency and adopt best practices across many applications.

---

## What makes up a stack?

### Stack Image

Appsody uses a containerized environment during local development. The stack image defines this environment and specifies the stack behavior during application development lifecycle.  

The `image` directory contains files for the stack image. The `image/Dockerfile-stack` defines the exact steps for building the stack image.

### Project templates
Project templates provide a starting point, typically a 'Hello World' application, for application development. Like other components within an Appsody stack, you can customize project templates and share them across teams.  

The templates directory contains one or more starter applications that are created for the user when they initialize their projects. Every template is contained within its own directory, `/templates/<template-name>`.

### Stack structure

```bash
my-stack
├── README.md               // describes the contents of the stack and how it should be used
├── stack.yaml              // defines the different attributes of the stack and which template the stack should use by default
├── image/
|   ├── config/
|   |   └── app-deploy.yaml // configuration file for deploying an Appsody project using the Appsody Operator
|   ├── project/
|   |   ├── [files that provide the technology components of the stack]
|   |   └── Dockerfile      // defines the final image that will created by the appsody build command
│   ├── Dockerfile-stack    // defines the foundation stack image, and a set of environment variables for the local development cycle
|   └── LICENSE
└── templates/
    ├── my-template-1/
    |       └── [example files as a starter for the application, e.g. "hello world"]
    └── my-template-2/
            └── [example files as a starter for a more complex application]

```

>`Dockerfile-stack` builds the initial stack image for local development and the `Dockerfile` builds the final application image.

### Generated files

`.appsody-config.yaml` is not part of the source structure. It is generated as part of the stack building process and will be placed in the user directory by the appsody init command. This file specifies the stack image that is used and can be overridden for testing purposes to point to a locally built stack.

---

## The role of a stack in the development process

The fundamental goal of stacks is to simplify the life of the developer trying to build an application using a specific set of technologies or development pattern. As such, a stack is designed to support two ways of working:

1. **Local Development**  
 Local development consists of the Appsody CLI (hooked into a local IDE if required), communicating with a local Docker container that is running the application under development. Furthermore, local development is accelerated by enabling application code to be held on the local file system, whilst being mounted in the Docker container, so that a local change can automatically trigger a restart of the application.

2. **Build and Deploy**  
During build and deploy, the stack enables the Appsody CLI to build a self-contained Docker image that includes both the core technologies in the stack plus the application code that has been developed, along with the combined dependencies of both. The resulting image can then be deployed manually or programmatically to any platform that supports Docker images (such as a local or public Kubernetes cluster).

---

## Stack stability

Stacks are categorized as either `stable`, `incubator` or `experimental` depending on the content of the stack.

- `stable/`: Stable stacks meet this set of [technical requirements](https://github.com/appsody/stacks/blob/master/TECHNICAL_REQUIREMENTS.md).

- `incubator/`: The stacks in the incubator folder are actively being worked on to satisfy the stable criteria.

- `experimental/`: Experimental stacks are not being actively worked on and may not fulfill the requirements of an Appsody stack. These can be used for trying out specific capabilities or proof of concept work.

### Official Appsody Repositories

Below are the URLs for official Appsody repository releases.

| Repository     | URL                                                                                  |
| -------------- | ------------------------------------------------------------------------------------ |
| `stable`       | `https://github.com/appsody/stacks/releases/latest/download/stable-index.yaml`       |
| `incubator`    | `https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml`    |
| `experimental` | `https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml` |

By default, Appsody comes with the `incubator` and `experimental` repositories. Other repositories can be added by running the [`appsody repo add`](/docs/using-appsody/cli-commands/#appsody-repo-add) command.

---

## Next steps

Learn how to [develop a stack](develop)
