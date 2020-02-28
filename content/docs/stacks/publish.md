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

1. If the stack is not already packaged, package it by running the [`appsody stack package`](/content/docs/cli-commands/#appsody-stack-package) command from the root directory of your stack, specifying the namespace for creating the Docker images with. For example, the following command creates Docker images with a namespace of `myproject`:
    ```
    appsody stack package --image-namespace myproject
    ```

    This command builds the stack container image, creates archives for your source code and each template, and adds your stack to the `dev.local` repository in your Appsody configuration.

    If you want to publish your Docker images to a non-default image registry, such as `myregistry.io`, you can specify the registry to use with the `--image-registry` flag:
    ```
    appsody stack package --image-namespace myproject --image-registry myregistry.io
    ```

2. Push the stack container image to the appropriate Docker registry, such as [docker.io](https://docker.io) or `myregistry.io`.

3. Upload the source code and template archives to a suitable web hosting service, such as the [Releases](https://help.github.com/en/github/administering-a-repository/creating-releases) section of a GitHub repo.

4. To add your stack to a repository, run the [`appsody stack add-to-repo`](/content/docs/cli-commands.md/#appsody-stack-addtorepo) command from the root directory of your stack, specifying the repository name and the base URL to use. For example:
    ```
    appsody stack add-to-repo myrepository --release-url https://github.com/myorg/myrepository/releases/latest/download/
    ```

    This command creates (or updates) a repository index file, that represents the repository, using the specified  `--release-url` as the base URL for referencing the source code and template archives. The repository index file name is determined from the repository name (`myrepository-index.yaml` in this example), and is created in the `.appsody/stacks/dev.local` directory

5. To generate a `.json` formatted file of the created repository index (`myrepository-index.yaml`):
    1. Install [python 3](https://www.python.org/downloads/) on your machine
    2. Download the `.json` generation script from the [Appsody Stacks](https://github.com/appsody/stacks) git repository
        ```
        wget https://raw.githubusercontent.com/appsody/stacks/master/ci/create_codewind_index.py
        ```
    3. Change the script's permissions to be executable
        ```
        chmod +x ./create_codewind_index.py
        ```
    4. Run the script (`./create_codewind_index.py -h` to see optional arguments). For example, to generate `.json` files for every yaml file in the `/assets` directory:
        ```
        ./create_codewind_index.py -f /assets
        ```

6. Upload the generated repository index files (`yaml` and `json`) to the web hosting service.

You can now provide the URL to the hosted repository index file to other Appsody users, who can add it to their Appsody repository list then initialise a project using your stack.

---

## Next steps

Congratulations!  You have now developed, tested and published a stack for use in Appsody!

Why not learn more about stacks and familiarize yourself with the [lifecycle](/docs/stacks/lifecycle) of a stack?
