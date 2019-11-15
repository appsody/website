---
title: Publishing Stacks
---

# Publishing Stacks

You publish a stack when you want to make it available to other users. You can make a stack available by contributing it to the Appsody project, or by publishing it with a web hosting service.

The basic, required steps for publishing a stack are:
 1. Package the stack then generate Docker images using a suitable image registry namespace.
 2. Generate a repository index file that contains remote URLs.



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
After creating and testing a stack locally, you might want to make the stack available to other users. You can publish the stack by using:

 1. The [Appsody CLI](#publishing-a-stack-using-the-appsody-cli).
 2. The [CI scripts](#publishing-a-stack-using-ci-scripts), if one or more stacks or repositories are to be published.

## Publishing a stack using the Appsody CLI

1. If the stack is not already packaged, package it by running the [`appsody stack package` command](/content/docs/using-appsody/cli-commands.md/#appsody-stack-package). Run this command from the base directory of your stack, specifying the namespace for creating the Docker images with. For example: `appsody stack package --image-namespace myproject` creates Docker images with a namespace of `myproject`.

    This command builds the stack container image, creates archives for each template, and adds your stack to the `dev.local` repository in your Appsody configuration.

2. Push the stack container image to a Docker registry, for example `docker.io`.

3. Upload the template archives to a suitable web hosting service.

4. Generate a repository index for the stack, which will point to the template archive files that you uploaded to the web hosting service. To generate the index, run the [`appsody stack add-to-repo` command](/content/docs/using-appsody/cli-commands.md/#appsody-stack-addtorepo)  from the base directory of your stack, specifying the repository name and the base URL to use. For example: `appsody stack add-to-repo myrepository --release-url https://github.com/myorg/myrepository/releases/latest/download/`

    This command creates (or updates) a repository index file using the specified  `--release-url` as the base URL for referencing the template archives. The index file is determined from the repository name (`myrepository-index.yaml` in this example), and is created in the `.appsody/stacks/dev.local` directory

3. Upload the generated repository index file to the web hosting service.

You can now provide the URL to the hosted repository index file to other Appsody users, who can add it to their Appsody repository list then initialise a project using your stack.

## Publishing a stack using CI scripts

1. Clone or copy the `appsody/stacks` Git repository to obtain the CI scripts.
2. Create a new repository directory, within the base directory of the Git repository, to contain the stack to be published. For example, `mkdir ./myrepository`
3. Copy or create your stack into this new directory.
4. Use environment variables to override default settings that are used by the build script, for example the namespace to use for the Docker images, and the URL to use to reference the template archive files. The main variables to override are:

   - `IMAGE_REGISTRY_ORG` this is the namespace to create the Docker images with.
   - `RELEASE_URL` this is the base URL to your web hosting service, and is used to reference the template archive files from within the repository index file.
   - `REPO_LIST` this specifies the repositories to build. The default value is `experimental incubator stable`. Change the list so that your new repository is the only entry (otherwise artefacts are built for the other repositories too).

   You can set these environment variables by exporting them. For example:
   
    ```
    export IMAGE_REGISTRY_ORG=myproject
    export RELEASE_URL=https://github.com/myorg/myrepository/releases/latest/download
    export REPO_LIST=myrepository
    ```
5. Run the build script from the base directory of the git repository, specifying your stack as a parameter. For example:
    ```
    ./ci/build.sh myrepository/<stack-id>
    ```

    **Note:** If you do not specify a stack, Appsody builds all the stacks in the  repositories listed in REPO_LIST.

    This command creates the following artefacts in the `./ci/assets` directory: repository index files (containing remote URLs), stack container images, and template archive files.

    An index file is created for each repository that is listed in REPO_LIST, and the template archive files are prefixed with the repository name to make them easier to identify as belonging to a specific repository.

    **Note:** The repository index file contains information for all the stacks in that repository, even if you specified a single stack with the `./ci/build.sh` command.

6. Push the stack container images to a Docker registry, such as `docker.io`.
7. Upload the template archives and repository index file to a suitable web hosting service.

You can now provide the URL to the hosted repository index file to other Appsody users, who can add it to their Appsody repository list then initialise a project using your stack.
