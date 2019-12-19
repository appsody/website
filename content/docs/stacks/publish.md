---
title: Publishing Stacks
---

# Publishing Stacks

After you develop, package, and test a stack, you can make it available so that other developers can use your stack's functionalities to accelerate development of their cloud native applications. You can make a stack available by contributing it to the Appsody project, or by publishing it with a web hosting service.

## Contribute a stack to Appsody
You can now contribute your stack by following these steps:

 1. Modify any relevant documentation.
 2. Push your changes to a branch in your fork of the Appsody git repository.
 3. Create a pull request to the Appsody repository, to get your changes merged.

For more information, see the [Contributing guidelines](https://github.com/appsody/website/blob/master/CONTRIBUTING.md).

## Publishing a stack using the Appsody CLI

The easiest way to publish a stack is to use the Appsody CLI, however, you can use [CI scripts](/docs/stacks/publish-ci-scripts) if you want to publish multiple stacks.

1. If the stack is not already packaged, package it by running the [`appsody stack package`](/content/docs/using-appsody/cli-commands/#appsody-stack-package) command from the root directory of your stack, specifying the namespace for creating the Docker images with. For example, the following command creates Docker images with a namespace of `myproject`:
    ```
    appsody stack package --image-namespace myproject
    ```

    This command builds the stack container image, creates archives for each template, and adds your stack to the `dev.local` repository in your Appsody configuration.

2. Push the stack container image to a Docker registry, such as [docker.io](https://docker.io).

3. Upload the template archives to a suitable web hosting service, such as the [Releases](https://help.github.com/en/github/administering-a-repository/creating-releases) section of a GitHub repo.

4. To add your stack to a repository, run the [`appsody stack add-to-repo`](/content/docs/using-appsody/cli-commands.md/#appsody-stack-addtorepo) command from the root directory of your stack, specifying the repository name and the base URL to use. For example:
    ```
    appsody stack add-to-repo myrepository --release-url https://github.com/myorg/myrepository/releases/latest/download/
    ```

    This command creates (or updates) a repository index file, that represents the repository, using the specified  `--release-url` as the base URL for referencing the template archives. The repository index file name is determined from the repository name (`myrepository-index.yaml` in this example), and is created in the `.appsody/stacks/dev.local` directory

3. Upload the generated repository index file to the web hosting service.

You can now provide the URL to the hosted repository index file to other Appsody users, who can add it to their Appsody repository list then initialise a project using your stack.

---

## Next steps

Congratulations!  You have now developed, tested and published a stack for use in Appsody!

Why not learn more about stacks and familiarize yourself with the [lifecycle](/docs/stacks/lifecycle) of a stack?