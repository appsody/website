---
title: Modifying a Stack
---

# Modifying a Stack

You may decide to modify an existing stack instead of creating one from scratch. This is an option if you are looking to contribute to the current Appsody stacks or maintain a separate modified version. When deciding to change the behaviour of a stack or the way the stack image is built, you will want modify the stack [image](/docs/stacks/modify#modifying-the-stack-image). Alternatively, you may want to alter the starter application provided to the user in which case you will want to modify a [template](/docs/stacks/modify#modifying-a-template).

To modify an existing stack, you must first use the `appsody stack create` [command](/docs/stacks/create#using-the-appsody-cli) to generate a stack for you or [clone](/docs/stacks/create#using-git-clone) the `stacks` repo.

## Modifying the stack image

Within the [image](/docs/stacks/create#creating-the-stack-image) directory are files providing the core technology components of the stack. These files also govern the way your stack behaves when using the different Appsody commands.

**Note:** You should test all other Appsody commands that the stack supports.

When stack image changes are made, make sure to update `stack-name/README.md`.
You should include:
   * Dependency versions that would be useful to the developer
   * Any endpoints that are enforced or provided by the stack
   * Any restrictions/limitations of the stack

## Modifying a template
Each stack has their own [template](/docs/stacks/create#creating-a-template) containing a starter application given to the user when they initialise their project. Modifying a template is simple and allows the developer to get started with their applications more quickly. Whilst modifying templates, consider if the functionality may be better placed in the stack image itself to affect all templates.

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
