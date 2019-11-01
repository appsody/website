---
title: Packaging Stacks
---

# Packaging Stacks

After you create or update a stack, use the [CLI command](/docs/using-appsody/cli-commands#appsody-stack-package), ```appsody stack package``` to build stack images and templates, and to generate an Appsody repository index you can use for local testing. You may want to follow this path if you are a standalone stack developer and only plan on creating or modifying one stack at a time. Alternatively, if you are an architect looking to build an entire repository containing multiple stacks you may want to use the [build scripts](/docs/stacks/package#packaging-a-stack-locally-using-build-scripts) which allow you to package multiple stacks at once.

## Packaging a stack locally using the Appsody CLI

1. Navigate to the root directory of the stack you want to build e.g. ```cd <stack-id>```

2. Run ```appsody stack package``` to package your stack locally. This builds the stack image for you and generates an index that contains only the information for that stack. Both the index and the `tar.gz` for each template are stored in ```~/.appsody/stacks/dev.local```.

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