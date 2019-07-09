---
title: "Building and Deploying"
section: Using Appsody
path: /docs/using-appsody/building-and-deploying
---

# Getting ready to deploy your Appsody project
Once you have completed the development work for your Appsody project, you may want to deploy your containerized application on a suitable runtime infrastructure - most likely, a cloud platform that hosts a Kubernetes cluster.

The appsody CLI provides various options to help you with the transition from the development phase to the deployment phase:
1) You can use the `appsody build` command to generate a Docker image on your local Docker registry, and then manually deploy that image to your runtime platform of choice.
2) You can use the `appsody deploy` command to deploy that same Docker image directly to a Kubernetes cluster that you are using for testing or staging.
3) You can delegate the build and deployment steps to an external pipeline, such as a Tekton pipeline that consumes the source code of your Appsody project after you push it to a GitHub repository. In this case, `appsody deploy` can be used preliminarily to generate a deployment manifest, which you can then push to your repo.

Next we'll describe in more detail the three paths to deployment. It must be noted that - at this stage - options 2 and 3 are implemented as examples of possible paths to deployment.

## Building your runtime Docker image with appsody
When you use the appsody CLI to develop your applications, a "development" Docker image of the target runtime is downloaded and run for you. This image differs slightly from the image that is used at deployment time, in that it configures tools that are only useful during the development phase.

If you want to generate a Docker image that matches what will be deployed on the target runtime platform, you can use the `appsody build` command.

The `appsody build` command requires no parameters. It performs the following steps:
1) Extracts your code and other artifacts that are necessary to build the deployment image from the development image, and saves all that in a directory located under `~/.appsody/extract`.
2) Runs a `docker build` against a Dockerfile that was extracted on the previous step. This step produces an image in your local Docker registry, with a name that matches the name of your project.

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
The `appsody deploy` command is provided as an example of how an application created with appsody can be deployed directly to a Kubernetes cluster. The deployment occurs in the form of a Knative Serving service.

The **pre-requisites** to successfully run `appsody deploy` are:
1) You must have access to a Kubernetes cluster, with Knative Serving (and its pre-requisites) installed and running (you can find what it takes to configure Knative [here](https://knative.dev/docs/install/))
2) You must have configured your `kubectl` CLI to point to that cluster. The appsody CLI calls `kubectl` under the covers for you.
3)  If you intend to push the Docker image containing your application to Docker Hub, your target cluster must be configured to be able to pull images from Docker Hub.

### Deploying your application to a locally installed Kubernetes cluster
If you have installed a Kubernetes cluster on your development workstation, and want to use your local Docker image cache - rather than pushing the image to Docker Hub - you should make sure you have set up your Kubernetes cluster to consume images from the local Docker cache.

You can then deploy your Appsody project locally by running:
```
appsody deploy
```
This command does the following:
1) It calls `appsody build` and creates a deployment image, as described in the previous section.
2) It tags the image with the special prefix `local.dev`, making it accessible to your Kubernetes cluster.
3) It creates a Knative Serving manifest file named `appsody-service-nnnnnn.yaml`, where <nnnnnn> is a random numerical value. This yaml file is then used to issue a `kubectl apply -f` command against the target Kubernetes cluster. This yaml file is then used to issue a `kubectl apply -f` command against the target Kubernetes cluster.

### Deploying your application by pushing your image to Docker Hub
If your cluster is configured to pull images from Docker Hub, here is how you would deploy your application:
```
appsody deploy -t <myaccount/appsody-project> --push --namespace mynamespace
```
The command shown above does the following:
1) It calls `appsody build` and creates a deployment image, as described in the previous section.
2) Since we specified the `-t myaccount/appsody-project` option, the image is also tagged accordingly.
3) The `--push` flag tells the appsody CLI to push the image to Docker Hub.
4) The appsody CLI creates a Knative Serving manifest file named `appsody-service-nnnnnn.yaml`, where <nnnnnn> is a random numerical value. This yaml file is then used to issue a `kubectl apply -f` command against the target Kubernetes cluster.
5) Since `--namespace mynamespace` is specified, the Knative service is provisioned under the `mynamespace` namespace.

Note that, if `--push` is not specified, the image is available on your local Docker registry only. In that case, the target Kubernetes cluster must be configured to have access to your local Docker registry.


## Deploying your app through a Tekton pipeline
Most likely, the deployment of apps created with the appsody CLI is going to occur through the invocation of a CI/CD build pipeline.

As a developer, you develop your app using the appsody CLI, and - once you are ready to deploy - push your code to a repo or create a pull request on GitHub.

We have provided an example of how you could take advantage of Tekton pipelines to deploy your app as a Knative Serving service to a Kubernetes cluster. The example is captured in [this repo](https://github.com/appsody/tekton-example).

In order to run the example pipeline, you need to ensure that the following pre-requisites are fulfilled:
1) You must have developed a project with the appsody CLI, and you must have checked your project into a GitHub repository.
2) Your Kubernetes cluster must be configured to run Knative (instructions [here](https://knative.dev/docs/install/) and the Tekton pipelines, as documented [here](https://github.com/tektoncd/pipeline/blob/master/docs/install.md).
3) Your project must include a Knative Serving deployment manifest called `appsody-service.yaml`. This is a pre-requisite now if you want to run the pipeline with minimal changes. A quick way to obtain such a manifest is to run the `appsody deploy` command described in the previous section. You need to rename the `appsody-service-nnnnnn.yaml` to `appsody-service.yaml`.

More details on running the Tekton pipeline example for Appsody can be found in the [repo readme](https://github.com/appsody/tekton-example).
