---
title: Appsody Stacks
---

# Appsody Stacks

Appsody provides pre-configured application stacks that enable rapid development of quality microservice-based applications. Stacks include a base container image and project templates.

Appsody stacks include language runtimes, frameworks and any additional libraries and tools that are required to simplify your local application development. Stacks are an easy way to manage consistency and adopt best practices across many applications.

---

## Stack Image
Appsody uses a containerized environment during local development. The stack image defines this environment and specifies the stack behavior during application development lifecycle.

The stack image contains common capabilities that can be used by all templates. For example, the [`nodejs-express`](https://github.com/appsody/stacks/tree/master/incubator/nodejs-express) stack image provides health endpoints and Prometheus metrics so the developers do not need to implement them.

The `image` directory contains files for the stack image. The `image/Dockerfile-stack` defines the exact steps for building the stack image.

## Project templates
Templates provide an initial application to enable developers to get started with a stack. Developers can expand and adapt the templates to suit the needs of their applications.

The `templates` directory contains one or more starter applications that are created for the user when they initialize their projects. Every template is contained within its own directory, `/templates/<template-name>`.

Capabilities that apply to all templates are better suited for inclusion in the stack image.

## Stack structure

### Stack source

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

>`Dockerfile-stack` builds the initial stack image and the `Dockerfile` builds the final application image.

### Generated files

`.appsody-config.yaml` is not part of the source structure. It is generated as part of the stack building process and will be placed in the user directory by the appsody init command. This file specifies the stack image that is used and can be overridden for testing purposes to point to a locally built stack.

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

<<<<<<< HEAD
---

## Next steps
=======
## Getting started
Follow our [Quick Start Guide](/docs/getting-started/quick-start) to get you up and running with Appsody.

To find a list of existing stacks that are available to you:
- Visit the [Appsody website](https://appsody.dev) or
- Run the `appsody list` command within the Appsody CLI

For information on Appsody local development go [here](/docs/using-appsody/local-development).

## Learn about stack operation and structure
Stacks provide support for all phases of development and deployment. To do this, they need to adhere to a specific structure.

To learn more about this, go to [stack structure](/docs/stacks/stack-structure).

## Modifying existing stacks
You might want to modify an existing stack to suit your development needs, for example you might want to use a different library or runtime version.

To learn how to go about modifying an existing stack go to [modifying a stack](/docs/stacks/modify).

## Creating new stacks
We are actively working to create new stacks so that more people can adopt Appsody. If you find that none of the existing stacks meet your needs please reach out to us on the [Appsody Slack](https://appsody-slack.eu-gb.mybluemix.net/) or create a new GitHub issue to track the discussion.

We always welcome any contributions. If you wanted to create your own stack for a framework or language that we do not currently support, please review the [contributing guidelines](https://github.com/appsody/website/blob/master/CONTRIBUTING.md) and follow the steps outlined in [creating a stack](/docs/stacks/create).
>>>>>>> upstream/master

Learn how to develop a stack.
