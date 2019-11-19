---
title: Appsody Stacks
---

# Appsody Stacks

Appsody provides pre-configured application stacks that enable rapid development of quality microservice-based applications. Stacks include a base container image and project templates which act as a starting point for your application development.

Appsody stacks include language runtimes, frameworks and any additional libraries and tools that are required to simplify your local application development. Stacks are an easy way to manage consistency and adopt best practices across many applications.

>**Template:** A template utilizes the base image and provides a starter application that is ready to use. It leverages existing capabilities provided by that image and can extend functionality to meet your application requirements.

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

---

## Stack structure

A stack is designed to support both ways of working; local development, and build and deploy. Therefore, all stacks follow the same structure, which is shown here:

```bash
my-stack
├── README.md // describes the contents of the stack and how it should be used
├── stack.yaml // defines the different attributes of the stack and which template the stack should use by default
├── image/
|   ├── config/
|   |   └── app-deploy.yaml // configuration file for deploying an Appsody project using the Appsody Operator
|   ├── project/
|   |   ├── [files that provide the technology components of the stack]
|   |   └── Dockerfile // defines the final image that will created by the appsody build command
│   ├── Dockerfile-stack // defines the foundation stack image, and a set of environment variables for the local development cycle
|   └── LICENSE
└── templates/
    ├── my-template-1/
    |       └── [example files as a starter for the application, e.g. "hello world"]
    └── my-template-2/
            └── [example files as a starter for a more complex application]

```

>`.appsody-config.yaml` is not part of the source structure. It is generated as part of the stack building process and will be placed in the user directory by the appsody init command. This file specifies the stack image that is used and can be overridden for testing purposes to point to a locally built stack.

---

## Next steps

Learn how to develop a stack.
