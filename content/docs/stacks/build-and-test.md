---
title: Building and Testing Stacks
path: /content/docs/stacks/build-and-test
---

# Building and Testing Stacks

The instructions below will reference the "base directory", which will be the directory containing the clone or copy of the appsody/stacks git repository.

Once you have created or updated a stack, use scripts in the `ci/` directory to build stack images and templates, and to generate an appsody repository index you can use for local testing. The script `./ci/build.sh` combines several operations (lint, prefetch, package, test) for the specified stack. If you would like to learn more about the process for building, testing and releasing a stack, please see [Appsody Stacks Release Process](https://github.com/appsody/stacks/blob/master/RELEASE.md#appsody-stacks-release-process---technical-overview).

## Building a stack locally using build scripts

From the base directory:

1. Run the build script and specify the desired stack as a parameter, for example:
    ```
    ./ci/build.sh . incubator/nodejs-express
    ```

    **Note:** If a stack is not specified, all stacks in all repositories will be built.

1. Add the generated appsody repository to the repository list:
    ```
    appsody repo add <local-repo-name> file://$PWD/ci/assets/<local-stack-repo>
    ```

    The value of `<local-stack-repo>` can be `incubator-index-local.yaml` or `experimental-index-local.yaml` or `stable-index-local.yaml`. For example:
    ```
    appsody repo add my-repo-incubator file://$PWD/ci/assets/incubator-index-local.yaml
    ```

1. Check the built stack has been added in that repository by running `appsody list my-repo-incubator`. Here is an example of the output you should get: 
    ```
    REPO            	ID            	VERSION  	TEMPLATES        	DESCRIPTION                      
    my-repo-incubator	nodejs-express	0.2.5    	*simple, skaffold	Express web framework for Node.js
    ```

1. Set an environment variable to use locally created images:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```

You can now use the generated local repository to create new projects:
```
appsody init my-repo-incubator/nodejs-express
```

Local appsody operations will also be performed against already pulled or rebuilt stack images.


## Building a stack image locally without build scripts

To build your stack image locally follow the below steps:

1. Navigate to the `<repository>/<stack-id>/image` directory

1. Build stack image:
    ```
    docker build -t <org-name>/<stack-id>:<tag> -f Dockerfile-stack .
    ```

    You now have access to the stack image to use and test locally. 
    
    **Note:** The local image should be tagged with the desired release. The tag value is usually the major and minor version of the stack, e.g. `appsody/nodejs-express:0.2`. If you do not specify the tag value, it will tag it as the latest version, e.g. `appsody/nodejs-express:latest`.

1. Set an environment variable to use locally created image:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```

Local appsody operations will also be performed against already pulled or rebuilt stack images.

## Associating a template with a specific stack image

To initialize a new project:

1. Repackage the templates for the stack, from the base directory:
    ```
    ./ci/build.sh . <repository>/<stack-id>
    ```

    For example, `./ci/build.sh . incubator/nodejs-express`

1. Initialize a project with the new stack image, and run appsody commands as usual:
    ```
    mkdir -p /tmp/nodejs-express
    cd /tmp/nodejs-express
    appsody init my-repo-incubator/nodejs-express <optional template>
    appsody test
    ```

For a project that has already been initialized:

1. Update the contents of `.appsody-config.yaml`

    ```
    stack: <org-name>/<stack-id>:<tag>
    ```

1. Use `appsody` commands as usual:
    ```
    appsody run
    appsody test
    appsody build
    ```


