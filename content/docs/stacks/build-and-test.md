---
title: Building and Testing Stacks
path: /docs/stacks/build-and-test
---

# Building and Testing Stacks

The instructions below will reference the "base directory", which will be the directory containing the clone or copy of the appsody/stacks git repository.

Once you have created or updated a stack, use scripts in the `ci/` directory to build stack images and templates, and to generate an appsody repository index you can use for local testing. From the base directory:

* `./ci/build.sh` combines several operations (lint, package, test) for the specified stack
* `./ci/env.sh` used for environment setup and holds environment variables that users can override (e.g. docker credentials for publishing images)
* `./ci/list.sh` generates list of stacks to build if not stack is not specified
* `./ci/lint.sh` will verify your stack, linting the stack.yaml and verifying directory contents
* `./ci/prefetch.sh` downloads the most recently released templates
* `./ci/package.sh` builds the docker image for the specified stack, along with packaging templates and generating repository indexes.
* `./ci/test.sh` will run tests to verify stack behavior

## Building a stack locally using build scripts

From the base directory:

1. Run build script and specify the desired stack as a parameter, for example:
    ```
    ./ci/build.sh . incubator/nodejs-express
    ```

    **Note:** If a stack is not specified, all stacks in all repositories will be built.

2. Add the generated appsody repository to the repository list:
    ```
    appsody repo add <local-repo-name> file://$PWD/ci/assets/<local-stack-repo>
    ```

    The value of `<local-stack-repo>` can be `incubator-index-local.yaml` or `experimental-index-local.yaml` or `stable-index-local.yaml`. For example:
    ```
    appsody repo add my-repo file://$PWD/ci/assets/incubator-index-local.yaml
    ```

3. Check the built stack has been added in that repository by running `appsody list my-repo`. Here is an example of the output you should get: 
    ```
    REPO   	ID            	VERSION  	TEMPLATES        	DESCRIPTION                      
    my-repo	nodejs-express	0.2.5    	*simple, skaffold	Express web framework for Node.js
    ```

4. Set an environment variable to use locally created images:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```

You can now use the generated local repository to create new projects:
```
appsody init my-repo/nodejs-express
```

Local appsody operations will also be performed against already pulled or rebuilt stack images.


## Building a stack image locally without build scripts

To build your stack image locally follow the below steps:

1. Navigate to the `<repository>/<stack-id>/image` directory

2. Build stack image:
    ```
    docker build -t <org-name>/<stack-id> -t <org-name>/<stack-id>:<tag> -f Dockerfile-stack .
    ```
    You now have access to the stack image to use and test locally. 
    **Note:** The local image should be tagged with the desired release. The tag value is usually the the major and minor version of the stack, e.g. `appsody/nodejs-express:0.2`. If you do not specify the tag value, it will tag it as the latest version, e.g. `appsody/nodejs-express:latest`.

3. Set an environment variable to use locally created image:
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

2. Initialize a project with the new stack image, and run appsody commands as usual:
    ```
    mkdir -p /tmp/nodejs-express
    cd /tmp/nodejs-express
    appsody init incubator/nodejs-express <optional template>
    appsody test
    ```
    
For a project that has already been initialized:

1. Update the contents of `.appsody-config.yaml`

    ```
    stack: <org-name>/<stack-id>:<tag>
    ```

2. Use `appsody` commands as usual:
    ```
    appsody run
    appsody test
    appsody build
    ```


