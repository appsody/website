---
Title: Packaging stacks using CI scripts
---

# Packaging a stack locally using CI scripts

To package a stack using CI scripts, clone or copy the `appsody/stacks` Git repository. From the base directory

Run the build script and specify the desired stack as a parameter, for example:
```
./ci/build.sh incubator/<stack-id>
```

> If a stack is not specified, all stacks in all repositories are built.

## Using your packaged stack
1. A local repository based on the stacks built is added to the repository list. To see the repository named `<repo>-index-local`, run:
    ```
    appsody repo list
    ```

1. Check the built stack has been added in that repository by running:
    ```
    appsody list <repo>-index-local
    ```
    Here is an example of the output you should get:
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION
    incubator-index-local	<stack-id>	    <version>   *<template>	        <stack-description>
    ```

1. Set an environment variable to configure Appsody to use locally created images:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```
1. Create a directory to initialize your project in, for example:
    ```
    mkdir my-project
    ```

1. Navigate to the directory of your new project, for example:
    ```
    cd my-project
    ```

1. Use the Appsody CLI to create new projects using the packaged stack:
    ```
    appsody init <repo>-index-local/<stack-id>
    ```

---

## Next steps

Learn how to [test a stack](test)
