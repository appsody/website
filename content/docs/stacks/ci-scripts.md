---
Title: Packaging stacks using CI scripts
---

# Packaging a stack locally using CI scripts

The easiest way to package a single stack is to use the [Appsody CLI](/docs/stacks/package), however, you can use CI scripts if you want to package multiple stacks.

To package a stack using CI scripts, clone or copy the `appsody/stacks` Git repository.   Then, from the base directory, run the build script and specify the desired stack as a parameter, for example:
```
./ci/build.sh incubator/<stack-id>
```

> If a stack is not specified, all stacks in all repositories are built.

## Using your packaged stack
1. A local repository based on the stack, or stacks, built is added to the repository list. To see this repository, which is named `<repo>-index-local`, run:
    ```
    appsody repo list
    ```

2. Check the built stack has been added in that repository by running:
    ```
    appsody list <repo>-index-local
    ```
    Here is an example of the output you should get:
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION
    incubator-index-local	<stack-id>	    <version>   *<template>	        <stack-description>
    ```

3. Set an environment variable to configure Appsody to use locally created images:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```
4. Create a directory to initialize your project in, for example:
    ```
    mkdir my-project
    ```

5. Navigate to the directory of your new project, for example:
    ```
    cd my-project
    ```

6. Use the Appsody CLI to create new projects using the packaged stack:
    ```
    appsody init <repo>-index-local/<stack-id>
    ```

---

## Next steps

After you create, or update a stack, the next consideration is to test the stack to check that it meets your needs. For more information, see [Testing Stacks](/docs/stacks/test).
