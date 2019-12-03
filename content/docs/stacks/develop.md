---
title: Developing Stacks
---

# Developing Stacks
While there are many Appsody stacks to choose from, you might want to create an entirely new stack or alter some aspects of an existing stack to match your development needs or standards.

---

## Start developing a stack

The following methods detail how you can use the Appsody CLI to create your own stack or modify an existing Appsody stack.

We recommend you use the Appsody CLI, however, you can also use [Git clone](git-clone) to get started with stack development.

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

## Define stack behavior

The `stack.yaml` file in the top level directory defines the different attributes of the stack and which template the stack should use by default.  This should be the first thing you define when developing your stack. See the following example:

```
name: Sample Application Stack        # concise one line name for the stack
version: 0.1.0                        # version of the stack
description: sample stack description # free form text explaining more about the capabilities of this stack and various templates
license: Apache-2.0                   # license for the stack
language: nodejs                      # programming language the stack uses
maintainers:                          # list of maintainer(s) details
  - name: John Smith
    email: example@example.com
    github-id: jsmith
default-template: my-template-1       # name of default template
```

## Define your stack image

The stack image contains common capabilities that can be used by all templates. For example, the [`nodejs-express`](https://github.com/appsody/stacks/tree/master/incubator/nodejs-express) stack image provides health endpoints and Prometheus metrics so the developers do not need to implement them.

### Stack environment variables

Stack creators configure [environment variables](./environment-variables) in `Dockerfile-stack` to specify the commands for running, debugging and testing the application. The `Appsody controller` inspects these environment variables and then drive the expected behavior for the developer during local development.

* **Handling File mounts** - During local development, the application code is held on the local file system and is mounted in the running container for the stack. Stack creators configure the [`APPSODY_MOUNTS`](./environment-variables) enivronment variable to specify a list of mount paths to achieve this behavior.

* **Monitoring file changes** - Stack creators configure the many [`APPSODY_WATCH`](./environment-variables) environment variables in `Dockerfile-stack` to specify which files are monitored for changes and how to reflect those changes in the running application.

* **Managing dependencies** - Appsody enables the caching of any installed dependencies across runs to accelerate local development. This is achieved by creating a volume independent of a specific container instance and then mounting it every time the appsody container is started. Stack creators configure the [`APPSODY_DEPS`](./environment-variables) environment variable to specify the directory to be cached.

### File permissions

Within your stack, if you want to restrict users from editing some of the files in your stack, such as if a vital dependency is needed, you should set the file permissions across your stack to reflect that accordingly.

### IDE Considerations

A user project might need dependencies or other assets that come from the stack image itself, when an IDE opens the app, they cant find those and show a multitude of errors. To avoid this, during the init command, anything that needs to be on the user’s host system to keep IDEs from displaying unwanted errors will be copied and installed.

### License

You must provide a valid license when developing a stack, such as [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Create your project templates

A stack can have multiple templates, perhaps representing different classes of starter applications using the stack technology components.  It is recommended to include a very simple template, such as a 'Hello, world!' application when creating your stack.  You set the default template of your stack in the `stack.yaml`, this is the template that is initialized when no stack is specified with the `appsody init` command.

Capabilities that apply to all templates are better suited for inclusion in the stack image.

## Application build and deployment
Stack creators must provide a `Dockerfile` that defines how to build the container image for the Appsody application, including both capabilities from the stack, and the developer's application.

The Appsody CLI uses the `Dockerfile` to create the application container image when [`appsody build`](/content/docs/using-appsody/cli-commands.md/#appsody-build) command is run.

Stack creators also provide a template deployment manifest `image/config/app-deploy.yaml` that the Appsody CLI uses to support deployments to Kubernetes or Knative platforms using the Appsody Operator.

---

## Next steps

Packaging allows a stack developer to build all the components of a stack and enables the stack to be used via Appsody CLI commands. The packaging process typically involves: building the stack container image, creating archive files for each template and configuring a local Appsody repository. Learn how to package a stack [here](package).

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

---

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
