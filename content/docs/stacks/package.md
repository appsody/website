---
title: Packaging Stacks
---

# Packaging Stacks

After you create or update a stack, use the [CLI command](/docs/stacks/package#building-a-stack-locally-using-the-appsody-cli), ```appsody stack package``` to build stack images and templates, and to generate an Appsody repository index you can use for local testing. Alternatively, this can also be achieved using the [build scripts](/docs/stacks/package/docs/stacks/package#building-a-stack-locally-using-build-scripts) located in the `stacks` repository. To learn more about the process for building, testing and releasing a stack, see [Appsody Stacks Release Process](https://github.com/appsody/stacks/blob/master/RELEASE.md#appsody-stacks-release-process---technical-overview).

## Packaging a stack locally using the Appsody CLI

1. Navigate to the root directory of the stack you want to build e.g. ```cd incubator/<stack-id>```

2. Run ```appsody stack package``` to build your stack locally. An index (stored in ```~/.appsody/stacks/dev.local/index-dev-local.yaml```) will be generated containing information on the stack you have built only.

3. Run ```appsody repo list``` to see the repository named `dev-local`, pointing to the index just generated.

4. Check the built stack has been added in that repository by running `appsody list dev-local`. Here is an example of the output you should get: 
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION                      
    dev-local	            <stack-id>	    0.1.0     	*simple	            <stack-description>
    ```

5. You can now use the generated local repository to create new projects:
```
appsody init dev-local/<stack-id>
```


## Packaging a stack locally using build scripts

The instructions below will reference the "base directory", which will be the directory containing the clone or copy of the appsody/stacks git repository.

From the base directory:

1. Run the build script and specify the desired stack as a parameter, for example:
    ```
    ./ci/build.sh . incubator/<stack-id>
    ```

    **Note:** If a stack is not specified, all stacks in all repositories will be built.

2. A generated repository based on the stacks built will be added to the repository list. Run ```appsody repo list``` to see this repository named `<repo>-index-local`

3. Check the built stack has been added in that repository by running `appsody list <repo>-index-local`. Here is an example of the output you should get:
    ```
    REPO            	    ID            	VERSION  	TEMPLATES        	DESCRIPTION
    incubator-index-local	<stack-id>	    0.1.0    	*simple	            <stack-description>
    ```

4. Set an environment variable to use locally created images:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```

You can now use the generated local repository to create new projects:
```
appsody init <repo>-index-local/<stack-id>
```

Local appsody operations will also be performed against already pulled or rebuilt stack images.

## Packaging a stack image locally using Docker

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