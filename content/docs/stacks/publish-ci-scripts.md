---
title: Publish a stack using CI scripts
---

# Publish a stack using CI scripts

The easiest way to publish a stack is to use the [Appsody CLI](/docs/stacks/publish), however, you can use CI scripts if you want to publish multiple stacks.

1. Clone or copy the `appsody/stacks` [Git repository](https://github.com/appsody/stacks) to obtain the CI scripts.
2. Create a new repository directory, within the base directory of the Git repository, to contain the stack to be published. For example:
    ```
    mkdir ./myrepository
    ```
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

    > If you do not specify a stack, Appsody builds all the stacks in the  repositories listed in REPO_LIST.

    This command creates the following artefacts in the `./ci/assets` directory: repository index files (containing remote URLs), stack container images, and template archive files.

    An index file is created for each repository that is listed in REPO_LIST, and the template archive files are prefixed with the repository name to make them easier to identify as belonging to a specific repository.

    The repository index file contains information for all the stacks in that repository, even if you specified a single stack with the `./ci/build.sh` command.

6. Push the stack container images to a Docker registry, such as [docker.io](https://docker.io).
7. Upload the template archives and repository index file to a suitable web hosting service, such as the [Releases](https://help.github.com/en/github/administering-a-repository/creating-releases) section of a GitHub repo.

You can now provide the URL to the hosted repository index file to other Appsody users, who can add it to their Appsody repository list then initialise a project using your stack.

---

## Next steps

Congratulations!  You have now developed, tested and published a stack for use in Appsody!

Why not learn more about stacks and familiarize yourself with the [lifecycle](/docs/stacks/lifecycle) of a stack?