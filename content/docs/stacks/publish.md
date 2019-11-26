---
title: Publishing Stacks
---

# Publishing Stacks

You publish a stack when you want to make it available to other users. You can make a stack available by contributing it to the Appsody project, or by publishing it with a web hosting service.

## Contribute a stack to Appsody
You can contribute a new stack, or update an existing stack, by following these steps:

 1. Clone the `appsody/stacks` git repository.
 2. Create your new stack, or update an existing stack.
 3. Build and test the stack.
 4. Modify any relevant documentation.
 5. Push your changes to a branch in your fork of the Appsody git repository.
 6. Create a pull request to the Appsody repository, to get your changes merged.

For more information, see the [Contributing guidelines](https://github.com/appsody/website/blob/master/CONTRIBUTING.md).

## Make a stack available to others
After creating and testing a stack locally, you might want to make the stack available to other users. The following method details how to publish a stack using the Appsody CLI.

Alternatively, you can use [CI scripts](./publish-ci-scripts), if one or more stacks or repositories are to be published.

### Publishing a stack using the Appsody CLI

1. If the stack is not already packaged, package it by running the [`appsody stack package`](/content/docs/using-appsody/cli-commands.md/#appsody-stack-package) command from the root directory of your stack, specifying the namespace for creating the Docker images with. For example, the following command creates Docker images with a namespace of `myproject`:
    ```
    appsody stack package --image-namespace myproject
    ```

    This command builds the stack container image, creates archives for each template, and adds your stack to the `dev.local` repository in your Appsody configuration.

2. Push the stack container image to a Docker registry, such as [docker.io](https://docker.io).

3. Upload the template archives to a suitable web hosting service.

4. To generate the index, run the [`appsody stack add-to-repo`](/content/docs/using-appsody/cli-commands.md/#appsody-stack-addtorepo) command from the root directory of your stack, specifying the repository name and the base URL to use. For example:
    ```
    appsody stack add-to-repo myrepository --release-url https://github.com/myorg/myrepository/releases/latest/download/
    ```

    This command creates (or updates) a repository index file using the specified  `--release-url` as the base URL for referencing the template archives. The index file is determined from the repository name (`myrepository-index.yaml` in this example), and is created in the `.appsody/stacks/dev.local` directory

3. Upload the generated repository index file to the web hosting service.

You can now provide the URL to the hosted repository index file to other Appsody users, who can add it to their Appsody repository list then initialise a project using your stack.
