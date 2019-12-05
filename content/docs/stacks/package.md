---
title: Packaging Stacks
---

# Packaging Stacks

Packaging allows a stack developer to build all the components of a stack and enables the stack to be used via Appsody CLI commands. The packaging process typically involves: building the stack container image, creating archive files for each template and configuring a local Appsody repository.

The following method details how you can use the Appsody CLI to package a stack that you have created or modified and want to test locally.

We recommend you use the Appsody CLI for packaging a single stack, however, you can also use the [CI scripts](./ci-scripts), if you want to package multiple stacks or repositories.

---

## Packaging a stack locally using the Appsody CLI

To package your stack locally, run:
```
appsody stack package
```
Run this command from the base directory of your stack, or specify the path to your stack: `appsody stack package <path/to/stack>`.

This builds the stack container image, creates archives for each template, and adds your stack to the `dev.local` repository in your Appsody configuration.


### Using your packaged stack
1. To see the repository named `dev.local`, that points to the generated index, run:
    ```
    appsody repo list
    ```
    The output should look something like this:
    ```
    NAME            URL
    *incubator  	https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml                    
    dev.local   	file:///$HOME/.appsody/stacks/dev.local/dev.local-index.yaml                  
    experimental	https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml
    ```

1. To check the built stack is visible in the `dev.local` repository, run:
    ```
    appsody list dev.local
    ```
    The output should look something like this:
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION                      
    dev.local	            <stack-id>	    <version>   *<template>	        <stack-description>
    ```
1. Create a directory to initialize your project in, for example:
    ```
    mkdir my-project
    ```
1. Navigate to the directory of your new project, for example:
    ```
    cd my-project
    ```
1. Use `appsody init` to create new projects using the packaged stack:
    ```
    appsody init dev.local/<stack-id>
    ```

---

## Next steps

After you create, or update a stack, the next consideration is to test the stack to check that it meets your needs. For more information, see [Testing Stacks](test).
