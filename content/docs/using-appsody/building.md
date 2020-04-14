---
title: Building your Appsody project
---

# Building your Appsody project

The Appsody CLI provides the [appsody build](/docs/cli-commands/#appsody-build) command to build a *deployment* Docker image on your local Docker registry. You can then manually deploy that image to your runtime platform of choice.

If you want to build *and* deploy a Docker image directly to a locally installed Kubernetes cluster that you are using for testing or staging, you might prefer to use the [appsody deploy](/docs/using-appsody/deploying) command.

> During local development, the Appsody CLI downloads and runs a *development* Docker image of the target runtime. This image differs slightly from the image that is used at deployment time, because it configures tools that are useful only during the development phase.

The [appsody build](/docs/cli-commands/#appsody-build) command completes the following actions:

- Extracts your code and other artifacts, including a new Dockerfile, which are required to build the *deployment* image from the *development* image. These files are saved to the `~/.appsody/extract` directory.
- Runs a `docker build` against the Dockerfile that was extracted on the previous step to produce a *deployment* image in your local Docker registry. 
- Generates a manifest called `app-deploy.yaml` that can be used to deploy your Appsody application.

> If your project includes uppercase characters, these are converted to lowercase characters in the image name because Docker does not accept uppercase characters in image tags. Also, if your project directory includes underscore characters, those will be converted to dashes (-), because certain areas of Kubernetes are not tolerant of underscore characters.

Here is an example of the output produced by the `appsody build` command on a project named `appsody-project`:
```
appsody-project$ appsody build
Extracting project from development environment
Running command: docker[pull appsody/nodejs:0.2]
Running command: docker[run --rm --name appsody-project-extract --entrypoint /bin/bash appsody/nodejs:0.2 -c if [ -f /project/Dockerfile ]; then echo "/project/Dockerfile"; else find / -type f -name Dockerfile; fi]
Running command: docker[create --name appsody-project-extract -v /Users/mchilant/appsody-project/:/project/user-app appsody/nodejs:0.2]
Running command: docker[cp appsody-project-extract:/project /Users/mchilant/.appsody/extract/appsody-project]
Running command: docker[rm appsody-project-extract -f]
Project extracted to /Users/mchilant/.appsody/extract/appsody-project
Running command: docker[build -t appsody-project -f /Users/mchilant/.appsody/extract/appsody-project/Dockerfile /Users/mchilant/.appsody/extract/appsody-project]
Built docker image appsody-project
Created deployment manifest: /Users/mchilant/appsody-project/app-deploy.yaml
```

## Tagging your application image

If you would like to tag your application image with a name, use the following command:
```
appsody build -t <mynamespace/myrepository[:tag]>
```
This command completes the following actions:

- Calls `appsody build` and creates a deployment image.
- The `-t` flag tags the image with the name `mynamespace/myrepository[:tag]`.

> If you don't specify the `-t` flag, the image is tagged with a name that matches the name of your project.


## Pushing your application image to an image registry

### Pushing to Docker Hub

If you would like to share your images to the Docker Hub registry, use the following command to push your application:
```
appsody build -t <mynamespace/myrepository[:tag]> --push 
```
This command completes the following actions:

- Calls `appsody build` and creates a deployment image.
- The `-t` flag tags the image with the name `mynamespace/myrepository[:tag]`.
- The `--push` flag pushes the image to Docker Hub.
- Generates a deployment manifest file named `app-deploy.yaml` in the project directory, if one doesn’t exist already. If a deployment manifest file exists, this command updates the following entries within it: application image, labels, and annotations. 

> If you don't specify the `--push` flag, the image is available only on your local Docker registry. The `--push` flag is also available to the [appsody deploy](/docs/using-appsody/deploying) command.

## Pushing to a custom registry
By default, the `--push` flag shares your images to the Docker Hub registry. If you would like to share your images to a custom registry, use the following command to push your application:
```
appsody build -t <mynamespace/myrepository[:tag]> --push-url <registry-url:PORT>
```
The `--push-url` flag pushes the image to a registry URL at a port that you specify with `<registry-url:PORT>`.

> A push is triggered when using the `--push-url` flag even if the `--push` flag is not specified. The `--push` and `--push-url` flags are also available to the [appsody deploy](/docs/using-appsody/deploying) command.