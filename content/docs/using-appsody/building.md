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
- Generates a deployment manifest file named `app-deploy.yaml` in the project directory, if one doesn’t exist already. If a deployment manifest file exists, this command updates the following entries within it: application image, labels, and annotations.

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

To tag the built application image, use the `-t <tag>` flag along with the `build` command. The tag can be specified in the format `mynamespace/myrepository[:tag]`.

For example:
```
appsody build -t <mynamespace/myrepository[:tag]>
```
The application image built by `appsody build` will be tagged with the name `mynamespace/myrepository[:tag]`.

> If the `-t` flag is not specified, the image is tagged with the project name.


## Pushing your application image to an image registry

### Pushing to Docker Hub

To push the built application image to the Docker Hub registry, use the `--push` flag along with the `build` command.

For example:
```
appsody build -t <mynamespace/myrepository[:tag]> --push 
```
The application image built by `appsody build` will be tagged with the name `mynamespace/myrepository[:tag]`, and pushed to the Docker Hub registry.

> If the `--push` flag is not specified, the image is available only on your local Docker registry.

### Pushing to a custom registry
To push the built application image to a custom registry, use the `--push-url <push-url>` flag along with the `build` command.

> A push is triggered when using the `--push-url` flag even if the `--push` flag is not specified.

For example:
```
appsody build -t <mynamespace/myrepository[:tag]> --push-url <registry-url:PORT>
```
The application image built by `appsody build` will be tagged with the name `mynamespace/myrepository[:tag]`, and pushed to the registry at the URL that you specify with `<registry-url:PORT>`.

> If the `--push-url` flag is not specified, the image is pushed to DockerHub. 