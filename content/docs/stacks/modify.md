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
The `templates` directory contains one or more starter applications that are given to the user when they initialise their projects. 

Whilst modifying templates, consider if the functionality may be better placed in the stack image itself to affect all templates.
