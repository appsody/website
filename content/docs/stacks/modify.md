---
title: Modifying a Stack
---

# Modifying a Stack

While there are many Appsody stacks to choose from, you may want to alter some aspects of an existing stack to match your development needs or standards. The modifications can impact how users will develop, build and deploy applications using the stack.

Once you have made the necessary modifications, you can [package](/content/docs/stacks/package.md) the modified stack and test it locally using Appsody CLI.

When you have ensured the stack is working as intended, you can contribute the modifications to the existing Appsody stack or maintain a separate version with your modifications.


## Modifying the stack image
The `image` directory contains files for building the stack image. This image controls how the stack behaves throughout the application lifecycle.


## Modifying stack templates
The `templates` directory contains one or more starter applications that are given to the user when they initialize their projects.

Whilst modifying templates, consider if the functionality may be better placed in the stack image itself to affect all templates.

## Templating

Often in a stack, there are common values that are used across the image and template.  It can be laborious to manually go through a stack and make changes to the values in every place they occur, especially if they change frequently, such as the version number.  [Go templating](https://golang.org/pkg/text/template/) allows stack creators to declare values in their `stack.yaml` file and use templating constructs to refer to them throughout the stack; values can be changed in one place and always remain in sync.

Templates are translated into their values before a stack is packaged.  To use templating in your stack, wrap your templating variables with `{{ }}`.

**Example usage:**

`This is {{.stack.name}}, running version: {{.stack.version}}.`

**Note:** Do not use templating for a `README`. As templating only takes place during the `stack package` command, the `README` on the GitHub page for your stack would have the templating variables as opposed to the values associated with them.

### Built-in templating variables

The currently supported built-in variables that stack creators can use to access stack values are:

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

### Custom templating variables

If you want to use your own custom variables you can declare a `templating-data` map in your `stack.yaml`.  This map can only contain `key`: `value` pairs.

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

**Note:** Custom variables must begin with an alphanumeric character.

If you wish to use other templating libraries that have the same `{{ }}` delimiters, wrap your variables with `{{"{{ }}"}}`.  This leaves your templating variable intact without causing an error during the `stack package` command.
