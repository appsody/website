---
title: Packaging Stacks
---

# Packaging Stacks

After you create or update a stack, use the [CLI command](/docs/stacks/package#building-a-stack-locally-using-the-appsody-cli), ```appsody stack package``` to build stack images and templates, and to generate an Appsody repository index you can use for local testing. Alternatively, this can also be achieved using the [build scripts](/docs/stacks/package/docs/stacks/package#building-a-stack-locally-using-build-scripts) located in the `stacks` repository. To learn more about the process for building, testing and releasing a stack, see [Appsody Stacks Release Process](https://github.com/appsody/stacks/blob/master/RELEASE.md#appsody-stacks-release-process---technical-overview).

## Packaging a stack locally using the Appsody CLI

1. Navigate to the root directory of the stack you want to build e.g. ```cd <stack-id>```

2. Run ```appsody stack package``` to build your stack locally. An index (stored in ```~/.appsody/stacks/dev.local/index-dev-local.yaml```) is generated that contains only the information for that stack.

3. Run ```appsody repo list``` to see the repository named `dev.local`, pointing to the index just generated.

4. Check the built stack has been added in that repository by running `appsody list dev.local`. Here is an example of the output you should get: 
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION                      
    dev.local	            <stack-id>	    0.1.0     	*simple	            <stack-description>
    ```

5. You can now use the generated local repository to create new projects:
```
appsody init dev.local/<stack-id>
```


## Packaging a stack locally using build scripts

The following instructions reference the base directory, which contains the clone or copy of the `appsody/stacks` Git repository.

From the base directory:

1. Run the build script and specify the desired stack as a parameter, for example:
    ```
    ./ci/build.sh . incubator/<stack-id>
    ```

    **Note:** If a stack is not specified, all stacks in all repositories are built.

2. A generated repository based on the stacks built is added to the repository list. Run ```appsody repo list``` to see this repository named `<repo>-index-local`

3. Check the built stack has been added in that repository by running `appsody list <repo>-index-local`. Here is an example of the output you should get:
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION
    incubator-index-local	<stack-id>	    0.1.0    	*simple	            <stack-description>
    ```

4. Set an environment variable to tell Appsody to use locally created images:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```

You can now use the generated local repository to create new projects:
```
appsody init <repo>-index-local/<stack-id>
```

Local Appsody operations are also performed against already pulled or rebuilt stack images.