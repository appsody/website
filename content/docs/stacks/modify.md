---
title: Modifying a Stack
path: /docs/stacks/modify
---

# Modifying a Stack

You may decide to modify an existing stack instead of creating one from scratch. This is an option if you are looking to contribute to the current Appsody stacks or maintain a separate modified version.

To modify an existing stack:

1. Clone the stacks repostory:
```
git clone https://github.com/appsody/stacks.git
cd stacks
```

2. Modify the stack or templates making sure that you follow the [stack structure](/docs/stacks/stack-structure).

## Modifying the stack image

If you have modified files within `/image` you will need to build and test to make sure the stack and its templates are working as intended.

Please see the steps to build stacks locally [here](/docs/stacks/run-locally).

**Note:** You should test all other Appsody commands that the stack supports also.

When stack image changes are made, make sure to update `stack-name/README.md`.
You should include:
   * Dependency versions that would be useful to the developer
   * Any endpoints that are enforced or provided by the stack
   * Any restrictions/limitations of the stack

## Modifying a template
Modifying a template is simple and allows the developer to get started with their applications, quicker. Whilst modifying templates consider if the functionality may be better placed in the stack image itself to affect all templates.

1. Navigate to modified template
```
cd templates/<template-name>
```

2. Run template:
```
appsody run
```
