---
title: Appsody Stacks
---

# Appsody Stacks

Appsody provides pre-configured application stacks that enable rapid development of quality microservice-based applications. Stacks include a base container image and project templates which act as a starting point for your application development.

Appsody stacks include language runtimes, frameworks and any additional libraries and tools that are required to simplify your local application development. Stacks are an easy way to manage consistency and adopt best practices across many applications.

**Template:** A template utilizes the base image and provides a starter application that is ready to use. It leverages existing capabilities provided by that image and can extend functionality to meet your application requirements.

---
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

By default, Appsody comes with the `incubator` and `experimental` repositories. Other repositories can be added by running the [`appsody repo add`](/content/docs/using-appsody/cli-commands.md/#appsody-repo-add) command.

## The role of a stack in the development process

The fundamental goal of stacks is to simplify the life of the developer trying to build an application using a specific set of technologies or development pattern. As such, a stack is designed to support two ways of working:

1. **Local Development**  
During local development, the stack provides everything to enable the development of a new application on the local machine, with the application *always* being run in a (local) containerized Docker environment. The fact that application development uses containerization from the start (as opposed to development solely in the user space of the local machine) minimizes the chances of introducing subtle issues in the containerization process, and removes the need for a developer to install the core technology components that will underpin their application. Therefore, the requirements on the stack are to have all the dependencies for the particular technologies involved pre-built into the Docker image, and also to dynamically compliment these with whatever dependencies are added explicitly by the developer for their code.
Local development consists of the Appsody CLI (hooked into a local IDE if required), communicating with a local Docker container that is running the application under development. Furthermore, local development is accelerated by enabling application code to be held on the local file system, whilst being mounted in the Docker container, so that a local change can automatically trigger a restart of the application.

2. **Build and Deploy**  
During build and deploy, the stack enables the Appsody CLI to build a self-contained Docker image that includes both the core technologies in the stack plus the application code that has been developed, along with the combined dependencies of both. The resulting image can then be deployed manually or programmatically to any platform that supports Docker images (such as a local or public Kubernetes cluster).



## Next steps

Learn how to develop your own or existing stack.
