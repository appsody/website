---
title: Developing Stacks
---

# Developing Stacks
While there are many Appsody stacks to choose from, you might want to create an entirely new stack or alter some aspects of an existing stack to match your development needs or standards; even modifications to a pre-existing stack can impact how users develop, build, and deploy applications.

---

## Start developing a stack

The following method details how you can use the Apposdy CLI `stack create` command to create a stack.

Alternatively, you can use [Git clone](git-clone) to get started with stack development.

### Create your own stack using the Appsody CLI

The quickest way to create a new stack is to use the `appsody stack create` command, which creates a new stack by copying an existing stack. By default, the new stack is based on the sample stack. For example, to create a new stack named my-stack, in a new directory, use this command:

```
appsody stack create my-stack
```

### Modify an existing stack using the Appsody CLI

If you want to use a different stack as the basis for your new stack, use the copy flag to specify the stack you want to use as the starting point. You can use appsody list to see the available stacks. For example, to create a new stack, called my-stack, based on the Node.js Express stack use this command:

```
appsody stack create my-stack --copy incubator/nodejs-express
```

---

## Create your stack.yaml

The `stack.yaml` file in the top level directory defines the different attributes of the stack and which template the stack should use by default.  This should be the first thing you define when developing your stack. See the following example:

```
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

## Create your project templates

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

### File permissions

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### IDE Considerations

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### License

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Application build and deployment
Stack creators must provide a `Dockerfile` that defines how to build the container image for the Appsody application, including both capabilities from the stack, and the developer's application.

Appsody CLI uses the `Dockerfile` to create the application container image when [`appsody build`](/content/docs/using-appsody/cli-commands.md/#appsody-build) command is run.

Stack creators also provide a template deployment manifest `image/config/app-deploy.yaml` that Appsody CLI uses to support deployments to Kubernetes or Knative platforms using the Appsody Operator.

---

## Next steps

Learn how to [package a stack](package)

---

## Advanced Topics

### Templating

Often in a stack, there are common values that are used across the image and template. It can be laborious to manually go through a stack and make changes to the values in every place they occur, especially if they change frequently, such as the version number. [Go templating](https://golang.org/pkg/text/template/) allows stack creators to declare values in their `stack.yaml` file and use templating constructs to refer to them throughout the stack; values can be changed in one place and always remain in sync.

Templates are converted into their values before a stack is packaged. To use templating in your stack, wrap your templating variables with `{{ }}`.  All variables are prepended with `.stack`.

**Example usage:**

```
This is {{.stack.name}}, running version: {{.stack.version}}.
```

> Do not use templating for a readme file.

#### Built-in templating variables

The variables that stack creators can use to access stack values are:

| Variable                  | Value                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `.stack.id`               | The stack name from the stack path.                                                   |
| `.stack.name`             | The `name` value from `stack.yaml`.                                                   |
| `.stack.description`      | The `description` value from `stack.yaml`.                                            |
| `.stack.created`          | The `timestamp` of when the stack was packaged.                                       |
| `.stack.tag`              | The `tag` value from Docker image.                                                    |
| `.stack.maintainers`      | The `maintainers` list from `stack.yaml`.                                             |
| `.stack.version`          | The `version` value from `stack.yaml`.                                                |
| `.stack.semver.major`     | The `version` major value from `stack.yaml`.                                          |
| `.stack.semver.minor`     | The `version` minor value from `stack.yaml`.                                          |
| `.stack.semver.patch`     | The `version` patch value from `stack.yaml`.                                          |
| `.stack.semver.majorminor`| The `version` major and minor values from `stack.yaml`.                               |
| `.stack.image.namespace`  | The `image-namespace` from user defined image-namespace flag, default is `dev.local`. |

#### Custom templating variables

If you want to use your own custom variables, you can declare a `templating-data` map in your `stack.yaml`. This map can contain only `key`: `value` pairs.

```
templating-data:
  variable1: value1
  variable2: value2
  variable3: value3
```

**Example usage:**

```
This is {{.stack.variable1}}, this is {{.stack.variable2}} and this is {{.stack.variable3}}.
```

> Custom variables must begin with an alphanumeric character.

If you want to use other templating libraries that have the same `{{ }}` delimiters, wrap your variables with `{{"{{ }}"}}`. This leaves your templating variable intact without causing an error during the `stack package` command.

### Setting stack requirements

You might modify a stack such that it requires the user to have a specific version, or range of versions, for a given technology. With the Appsody CLI, you can enforce version restrictions only when using Docker, [Buildah](https://buildah.io/), and the Appsody CLI.

To set a requirement, use the following format in the `stack.yaml`:
```
name: <stack-name>
version: 0.1.0
.
.
.
requirements:
   docker-version: ">= 17.09.0"
   appsody-version: "0.2.7 - 0.4.10"
   buildah-version: "<= 1.10.0"
```

You can see the full list of version comparisons that the CLI supports [here](https://github.com/Masterminds/semver#basic-comparisons).

When a project that uses the stack is initialized, the CLI checks whether the user meets the stack requirements. If the requirements are not met, the user cannot use the stack.
