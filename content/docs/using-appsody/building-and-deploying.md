---
path: /docs/using-appsody/building-and-deploying
---

# Getting ready to deploy your Appsody project
When you've finished the development work for your Appsody project, you will have a containerized application that's ready to deploy to a suitable runtime infrastructure
such as a cloud platform that hosts a Kubernetes cluster.

The Appsody CLI provides various options to help you with the transition from the development phase to the deployment phase:

- You can use the `appsody build` command to generate a *deployment* Docker image on your local Docker registry, and then manually deploy that image to your runtime platform of choice.
- You can use the `appsody deploy` command to deploy the same *deployment* Docker image directly to a Kubernetes cluster that you are using for testing or staging.
- You can delegate the build and deployment steps to an external pipeline, such as a Tekton pipeline that consumes the source code of your Appsody project after you push it to a GitHub repository. In this case, you can use `appsody deploy` to generate a deployment manifest, which you can then push to your repo.

These deployment options are covered in more detail in the following sections.

## Building your runtime Docker image with Appsody

When you use the Appsody CLI to develop your applications, a *development* Docker image of the target runtime is downloaded and run for you. This image differs slightly from the image that is used at deployment time, because it configures tools that are useful only during the development phase.

If you want to generate a *deployment* Docker image , use the `appsody build` command.

The `appsody build` command completes the following actions:

- Extracts your code and other artifacts, including a new Dockerfile, which are required to build the *deployment* image from the *development* image. These files are saved to the `~/.appsody/extract` directory.
- Runs a `docker build` against the Dockerfile that was extracted on the previous step to produce a *deployment* image in your local Docker registry. If you want to give the image a name, specify the `-t <tag>` parameter. If you run `appsody build` with no parameters, the image is given a name that matches the name of your project.

Note: If your project includes uppercase characters these are converted to lowercase characters in the image name because Docker does not accept uppercase characters in image tags.

Here is an example of the output produced by the `appsody build` command on a project named `appsody-project`:
```
micheles-mbp:appsody-project mchilant$ appsody build
Extracting project from development environment
Running command: docker[pull appsody/nodejs:0.2]
Running command: docker[run --rm --name appsody-project-extract --entrypoint /bin/bash appsody/nodejs:0.2 -c if [ -f /project/Dockerfile ]; then echo "/project/Dockerfile"; else find / -type f -name Dockerfile; fi]
Running command: docker[create --name appsody-project-extract -v /Users/mchilant/appsody-project/:/project/user-app appsody/nodejs:0.2]
Running command: docker[cp appsody-project-extract:/project /Users/mchilant/.appsody/extract/appsody-project]
Running command: docker[rm appsody-project-extract -f]
Project extracted to /Users/mchilant/.appsody/extract/appsody-project
Running command: docker[build -t appsody-project -f /Users/mchilant/.appsody/extract/appsody-project/Dockerfile /Users/mchilant/.appsody/extract/appsody-project]
Built docker image appsody-project
```

## Deploying your app directly to a Kubernetes cluster

Note: This deployment option is under development

The `appsody deploy` command provides an example of how an application that you create with Appsody can be deployed directly to a Kubernetes cluster. The deployment occurs in the form of a Knative Serving service.

To successfully run `appsody deploy` the following **pre-requisites** apply:

- You must have access to a Kubernetes cluster, with Knative Serving installed and running. To install Knative locally, use the Kubernetes feature in Docker for Desktop, see [Installing Knative Locally](/docs/using-appsody/installing-knative-locally.md). To install Knative on other Kubernetes clusters, see the [Knative Install Documentation](https://knative.dev/docs/install/).
- You must configure your `kubectl` CLI to point to your Kubernetes cluster.
- If you intend to push the Docker image containing your application to Docker Hub, your target cluster must be configured to pull images from Docker Hub.

### Deploying your application to a local Kubernetes cluster

If you've installed a Kubernetes cluster on your development workstation and want to use your local Docker image cache instead of pushing the image to Docker Hub, make sure you set up your Kubernetes cluster to consume images from the local Docker cache.

To deploy your Appsody project locally, run:
```
appsody deploy
```
This command completes the following actions:

- Calls `appsody build` and creates a *deployment* Docker image, as described in the previous section.
- Tags the image with the special prefix `local.dev`, making it accessible to your Kubernetes cluster.
- Creates a Knative Serving manifest file named `appsody-service-<nnnnnn>.yaml`, where `<nnnnnn>` is a random numerical value. This yaml file is used to issue a `kubectl apply -f` command against the target Kubernetes cluster.

### Deploying your application to Docker Hub

If your cluster is configured to pull images from Docker Hub, use the following command to deploy your application:
```
appsody deploy -t <myaccount/appsody-project> --push --namespace mynamespace
```
The command completes the following actions:

- Calls `appsody build` and creates a deployment image, as described in the previous section.
- The `-t myaccount/appsody-project` option tags the image.
- The `--push` flag tells the appsody CLI to push the image to Docker Hub.
- The Appsody CLI creates a Knative Serving manifest file named `appsody-service-<nnnnnn>.yaml`, where `<nnnnnn>` is a random numerical value. This yaml file is used to issue a `kubectl apply -f` command against the target Kubernetes cluster.
- The `--namespace mynamespace` option provisions the Knative service under the `mynamespace` namespace.

Note: If you don't specify `--push`, the image is available only on your local Docker registry and the target Kubernetes cluster must be configured to have access to your local Docker registry. Additionally, your image will be tagged as  `local.dev/<project-name>` and referenced in the Knative service manifest.


## Deploying your app through a Tekton pipeline

Note: This deployment option is under development

Most likely, the deployment of apps created with the appsody CLI is going to occur through the invocation of a CI/CD build pipeline.

As a developer, you develop your app using the appsody CLI, and when you are ready to deploy, you push your code to a repo or create a pull request on GitHub.

This [example](https://github.com/appsody/tekton-example) shows you how to use Tekton pipelines to deploy your app as a Knative Serving service to a Kubernetes cluster.

The following pre-requisites are required to run the example pipeline:

- You must have developed a project with the appsody CLI, and you must have checked your project into a GitHub repository.
- Your Kubernetes cluster must be configured to run Knative and Tekton pipelines (see [Installing Knative](https://knative.dev/docs/install/) and [Installing Tekton Pipelines](https://github.com/tektoncd/pipeline/blob/master/docs/install.md)).
- Your project must include a Knative Serving deployment manifest called `appsody-service.yaml`, which is a current pre-requisite if you want to run the pipeline with minimal changes. A quick way to obtain such a manifest is to run the `appsody deploy` command described in the previous section. You need to rename the `appsody-service-<nnnnnn>.yaml` to `appsody-service.yaml`.

More details on running the Tekton pipeline example for Appsody can be found in the repo [readme file] (https://github.com/appsody/tekton-example/blob/master/README.md)
