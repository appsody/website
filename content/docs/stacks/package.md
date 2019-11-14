---
title: Packaging Stacks
---

# Packaging Stacks

Packaging allows a stack developer to build all the components of a stack and enables the stack to be used via Appsody CLI commands. The packaging process typically involves: building the stack container image, creating archive files for each template and configuring a local Appsody repository.

You can use the [CLI command](/content/docs/using-appsody/cli-commands.md/#appsody-stack-package) `appsody stack package` to package a single stack that you have created or modified and want to test locally.

Alternatively, you can also use the [CI scripts](#packaging-a-stack-locally-using-ci-scripts), if you want to package multiple stacks or repositories.

## Packaging a stack locally using the Appsody CLI

Run `appsody stack package` to package your stack locally. Run this command from the base directory of your stack, or specify the path to your stack (e.g. `appsody stack package [path/to/stack]`).

This builds the stack container image, creates archives for each template, and adds your stack to the `dev.local` repository in your Appsody configuration.


### Using your packaged stack
1. Run `appsody repo list` to see the repository named `dev.local`, that points to the generated index.
    ```
    NAME            URL
    *incubator  	https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml                    
    dev.local   	file:///$HOME/.appsody/stacks/dev.local/dev.local-index.yaml                  
    experimental	https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml
    ```

1. Run `appsody list dev.local` to check the built stack is visible in the `dev.local` repository. Here is an example of the output you should get:
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION                      
    dev.local	            <stack-id>	    <version>   *<template>	        <stack-description>
    ```
1. Create a directory to initialize your project in (e.g. `mkdir my-project`).

1. Navigate to the directory of your new project (e.g. `cd my-project`).

1. Use the Appsody CLI to create new projects using the packaged stack:
    ```
    appsody init dev.local/<stack-id>
    ```

To test your new stack, see [Testing Stacks](/content/docs/stacks/test.md).

## Packaging a stack locally using CI scripts

To package a stack using CI scripts, clone or copy the `appsody/stacks` Git repository. From the base directory

Run the build script and specify the desired stack as a parameter, for example:
    ```
     ./ci/build.sh incubator/<stack-id>
    ```

**Note:** If a stack is not specified, all stacks in all repositories are built.

### Using your packaged stack
1. A local repository based on the stacks built is added to the repository list. Run ```appsody repo list``` to see this repository named `<repo>-index-local`

1. Check the built stack has been added in that repository by running `appsody list <repo>-index-local`. Here is an example of the output you should get:
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION
    incubator-index-local	<stack-id>	    <version>   *<template>	        <stack-description>
    ```

1. Set an environment variable to configure Appsody to use locally created images:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```
1. Create a directory to initialize your project in (e.g. `mkdir my-project`).

1. Navigate to the directory of your new project (e.g. `cd my-project`).

1. Use the Appsody CLI to create new projects using the packaged stack:
    ```
    appsody init <repo>-index-local/<stack-id>
    ```

To test your new stack, see [Testing Stacks](/content/docs/stacks/test.md).