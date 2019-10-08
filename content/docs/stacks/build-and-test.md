---
title: Building and Testing Stacks
---

# Building and Testing Stacks

The instructions below will reference the "base directory", which will be the directory containing the clone or copy of the appsody/stacks git repository.

Once you have created or updated a stack, use scripts in the `ci/` directory or use ```appsody stack package``` to build stack images and templates, and to generate an Appsody repository index you can use for local testing. The script `./ci/build.sh` combines several operations (lint, prefetch, package, test) for the specified stack. If you would like to learn more about the process for building, testing and releasing a stack, please see [Appsody Stacks Release Process](https://github.com/appsody/stacks/blob/master/RELEASE.md#appsody-stacks-release-process---technical-overview).

## Building a stack locally using the Appsody CLI

1. Navigate to the root directory of the stack you want to build e.g. ```cd incubator/nodejs-express```

2. Run ```appsody stack package``` to build your stack locally. An index (stored in ```~/.appsody/stacks/dev.local/index-dev-local.yaml```) will be generated containing information on the stack you have built only.

3. Run ```appsody repo list``` to see the repository named `dev-local`, pointing to the index just generated.

4. Check the built stack has been added in that repository by running `appsody list dev-local`. Here is an example of the output you should get: 
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION                      
    dev-local	            nodejs-express	0.2.5    	*simple, scaffold	Express web framework for Node.js
    ```

5. You can validate your stack conforms to the standard of an Appsody stack by running ```appsody stack validate```. This command runs a set of predefined tests against the stack, including the commands: ```init```, ```run```, ```test```, ```build```, ```stack package```, and ```stack lint```

You can now use the generated local repository to create new projects:
```
appsody init dev-local/nodejs-express
```


## Building a stack image locally without build scripts

To build your stack image locally follow the below steps:

1. Navigate to the `<repository>/<stack-id>/image` directory

2. Build stack image:
    ```
    docker build -t <org-name>/<stack-id>:<tag> -f Dockerfile-stack .
    ```

    You now have access to the stack image to use and test locally.

    **Note:** The local image should be tagged with the desired release. The tag value is usually the major and minor version of the stack, e.g. `appsody/nodejs-express:0.2`. If you do not specify the tag value, it will tag it as the latest version, e.g. `appsody/nodejs-express:latest`.

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
    appsody init my-repo-incubator/nodejs-express <optional template>
    appsody test
    ```

For a project that has already been initialized:

3. Update the contents of `.appsody-config.yaml`

    ```
    stack: <org-name>/<stack-id>:<tag>
    ```

4. Use `appsody` commands as usual:
    ```
    appsody run
    appsody test
    appsody build
    ```
