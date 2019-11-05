---
title: Modifying a Stack
---

# Modifying a Stack

You may decide to modify an existing stack instead of creating one from scratch. This is an option if you are looking to contribute to the current Appsody stacks or maintain a separate modified version.

To modify an existing stack, you must first use the `appsody stack create` [command](/docs/stacks/modify#using-the-appsody-cli) to generate a stack for you or [clone](/docs/stacks/modify#using-git-clone) the `stacks` repo:

### Using the Appsody CLI

Use the `appsody stack create` [command](/docs/using-appsody/cli-commands#appsody-stack-create), which creates a new stack by copying an existing stack. By default, the new stack is based on the [sample stack](https://github.com/appsody/stacks/tree/master/samples/sample-stack). For example, to create a new stack named `my-stack`, in a new directory, use this command:

`appsody stack create my-stack`

### Using Git Clone

1. Clone the stacks repostory:
```
git clone https://github.com/appsody/stacks.git
cd stacks
```

2. Modify the stack or templates making sure that you follow the [stack structure](/docs/stacks/stack-structure.md).

## Modifying the stack image

Within the image directory are files providing the core technology components of the stack. These files also govern the way your stack behaves when using the different Appsody commands. See [Stack Structure](/docs/stacks/stack-structure#summary-of-files-within-the-stack-source-and-user-directory-structure) for a more thorough breakdown.

**Note:** You should test all other Appsody commands that the stack supports.

When stack image changes are made, make sure to update `stack-name/README.md`.
You should include:
   * Dependency versions that would be useful to the developer
   * Any endpoints that are enforced or provided by the stack
   * Any restrictions/limitations of the stack

## Modifying a template
Modifying a template is simple and allows the developer to get started with their applications more quickly. Whilst modifying templates, consider if the functionality may be better placed in the stack image itself to affect all templates.

1. Navigate to the modified template
```
cd templates/<template-name>
```

2. Run template:
```
appsody run
```

## Packaging a Stack

Now that you have modified a stack, you will need to [package](/content/docs/stacks/package.md) it to ensure it is working as intended.
