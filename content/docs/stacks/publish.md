---
title: Publishing Stacks
---

# Publishing Stacks

Publishing a stack prepares the stack to be made available from a remote location so that it can be accessed by other individuals.

In order to publish a stack the stack needs to 
 - be packaged and have the images generated using a suitable image registry namespace
 - have a repository index file generated containing remote URLs

There are several scenarios for publishing which are dependant on the proposed audience for the stack.

 1. Make a new stack or an update to an existing stack available to Appsody. 
 2. Make a stack available to others by using a web hosting service.
  
## Contribute a stack to Appsody
If you are contributing a new stack or an updated stack to Appsody, you would have done the following: 

 1. Clone the appsody/stacks git repository
 2. Created a new stack or updated an existing stack
 3. Built and tested the stack
 4. Modified any relevant documentation
 
At which point you would be ready to contribute this back to Appsody by pushing your changes to a branch in your fork of the Appsody git repository and then creating a Pull Request to the Appsody repository.

For more information about this see the [Contributing](https://github.com/appsody/website/blob/master/CONTRIBUTING.md) guidelines. 

## Make a stack available to others
Once you have created and tested a stack locally you may want the stack to be available to others.

In order to do this the stack needs to be in a published state. This can be performed by using:

 1. the [Appsody CLI](#publishing-a-stack-using-the-appsody-cli).
 2. the [CI scripts](#publishing-a-stack-using-ci-scripts), if one or more stacks or repositories are to be published.

## Publishing a stack using the Appsody CLI

If you have not done so previously you will need to run the [CLI command](/content/docs/using-appsody/cli-commands.md/#appsody-stack-package) `appsody stack package` to package your stack. Run this command from the base directory of your stack specifying the namespace that the docker images should be created with, for example: `appsody stack package --image-namespace myproject` to create the images with a namespace of `myproject`

This builds the stack container image, creates archives for each template, and adds your stack to the dev.local repository in your Appsody configuration. 

For the stack to be available to others the stack container image needs to be pushed to a docker registry, for example docker.io, and the template archives will need to be uploaded to a suitable web hosting service. 

To generate a repository index for the stack that will point to the template archive files that you put onto the web hosting service run the [CLI command](/content/docs/using-appsody/cli-commands.md/#appsody-stack-addtorepo) `appsody stack add-to-repo` from the base directory of your stack specifying the repository name and the base URL to be used. for example: `appsody stack add-to-repo myrepository --release-url https://github.com/myorg/myrepository/releases/latest/download/`

This will create or update a repository index file using the --release-url argument value provided as the base URL required to reference the template archives. The index file will be determined from the the repository name, i.e. myrepository-index.yaml, and will be found in the .appsody/stacks/dev.local directory

The generated repository index file will then need to be uploaded to the web hosting service.

You can then provide the URL to this hosted repository index file to other Appsody uses who can add it to their Appsody repository list and then initialise a project using your stack. 

## Publishing a stack using CI scripts

To publish a stack using CI scripts, clone or copy the `appsody/stacks` Git repository. From the base directory

The build script uses a set of default values for arguments such as the the namespace to use for the docker images, the URL to use to reference the template archive files. 
These can be overridden by setting some environment variables. The main variables need to be overridden are:

 1. `IMAGE_REGISTRY_ORG` this  is the namespace that the docker images will be created with
 2. `RELEASE_URL` this is the base URL to your web hosting service and which will be used to reference the template archive files from within the repository index file.
 
 These can be set by exporting these variables, for example:
```
export IMAGE_REGISTRY_ORG=myproject
export RELEASE_URL=https://github.com/myorg/myrepository/releases/latest/download
```
    
Once the required environment variables have been setup, run the build script and specify the desired stack as a parameter, for example:
```
./ci/build.sh incubator/<stack-id>
```
    
**Note:** If a stack is not specified, all stacks in all repositories are built.

This command will create a repository index file containing remote URLs, the stack container images and the template archive files. All these files can be found in the ./ci/assets directory. 

An index file will be created per repository (incubator-index.yaml, experimental-index.yaml, stable-index.yaml) and contains all the stacks within that repository. These repository index files will be found in the ./ci/assets directory.

**Note:** Even if a single stack is referenced on the `./ci/build.sh` command the repository index file will contain information for all the stacks in that repository.

For the stack to be available to others the stack container image needs to be pushed to a docker registry, the template archives and repository index file will need to be uploaded to a suitable web hosting service. 

You can then provide the URL to this hosted repository index file to other Appsody uses who can add it to their Appsody repository list and then initialise a project using your stack. 
