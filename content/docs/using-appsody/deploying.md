---
title: Getting ready to deploy your Appsody project
---

# Getting ready to deploy your Appsody project
When you've finished the development work for your Appsody project, you will have a containerized application that's ready to deploy to a suitable runtime infrastructure such as a cloud platform that hosts a Kubernetes cluster.

The Appsody CLI provides the [appsody deploy](/docs/cli-commands/#appsody-deploy) command to build and deploy a Docker image directly to a Kubernetes cluster that you are using for testing or staging.

You can delegate the build and deployment steps to an external pipeline, such as a Tekton pipeline that consumes the source code of your Appsody project after you push it to a GitHub repository. Within the pipeline, you can run [appsody build](/docs/using-appsody/building), which builds the application image and generates a deployment manifest. You can use the manifest to deploy your application to a Kubernetes environment where the Appsody operator is installed.

These deployment options are covered in more detail in the following sections.

## Deploying your app directly to a Kubernetes cluster
There are many options to deploy your Appsody applications to a Kubernetes cluster. The best approach depends on the specific scenario:
- If you are testing your app on a locally installed cluster, using `appsody deploy` is your best bet
- If you intend to have your app deployed on a shared cluster for integration testing or production, you are probably going to rely on CI/CD pipelines, and have the app built and deployed from its source.

The `appsody deploy` command provides a way for you to deploy your application directly to a Kubernetes cluster. The stack contains a deployment manifest that can be consumed by the [Appsody operator](https://operatorhub.io/operator/appsody-operator). `appsody deploy` will install the operator, if necessary, and deploy your application to the cluster using that deployment manifest.

If you want to deploy your application without rebuilding the application image, or modifying the deployment manifest, you can run
```
appsody deploy --no-build
```

### Deployment via the Appsody Operator
Kubernetes operators offer a powerful way to provide full lifecycle maintenance of a wide range of resources on Kubernetes clusters. In particular, they can install, upgrade, remove, and monitor application deployments. The recently published [Appsody operator](https://operatorhub.io/operator/appsody-operator) automates the installation and maintenance of a special type of Custom Resource Definitions (CRDs), called **AppsodyApplication**.

The Appsody stacks that are currently available include a template of such a CRD manifest. When you run `appsody deploy` on a project created from one of the stacks enabled with those manifests, the CLI customizes the manifest with information that is specific to the deployment (such as namespace and project name), and submits the manifest to the Appsody operator on the Kubernetes cluster.

In fact, if your cluster does not already provide an operator, `appsody deploy` will install one for you. You can also use the Appsody CLI to install an instance of the Appsody operator, without installing any applications. This can be achieved by running the `appsody operator install` command.

To find out more about the Appsody operator, see [here](/docs/reference/appsody-operator).

### Deployment as a Knative Service

You can deploy your application as a Knative service on your target Kubernetes cluster by using the `--knative` flag with the `appsody build` or `appsody deploy` commands. This action sets the flag `createKnativeService` in the deployment manifest to `true`.

For your app to work as a Knative service, the following **pre-requisites** apply:

- You must have access to a Kubernetes cluster, with Knative Serving installed and running. To install Knative locally, use the Kubernetes feature in Docker for Desktop, see [Installing Knative Locally](/docs/faq#10-how-do-i-set-up-knative-serving-for-local-kubernetes-development). To install Knative on other Kubernetes clusters, see the [Knative Install Documentation](https://knative.dev/docs/install/).
- You must configure your `kubectl` CLI to point to your Kubernetes cluster.
- If you intend to push the Docker image containing your application to Docker Hub, your target cluster must be configured to pull images from Docker Hub.

Once the `appsody deploy --knative` command completes successfully, the Knative Service is operable at the URL specified in the command output.

### Deploying your application to a local Kubernetes cluster

If you have installed a Kubernetes cluster on your development workstation and want to use your local Docker image cache instead of pushing the image to Docker Hub, make sure you set up your Kubernetes cluster to consume images from the local Docker cache.

To deploy your Appsody project locally, run:
```
appsody deploy
```
This command completes the following actions:

- Calls `appsody build` and creates a *deployment* Docker image and a manifest file named `app-deploy.yaml`, as described in the previous section.
- If you specified the `--knative` flag, or if Knative is the only deployment option for your stack, the command tags the image with the special prefix `dev.local`, making it accessible to your Kubernetes cluster (assuming you followed [these directions](/docs/using-appsody/installing-knative-locally))
- The deployment manifest, `app-deploy.yaml`, is used to issue a `kubectl apply -f` command against the target Kubernetes cluster so that the application can be deployed by the Appsody Operator.

### Deploying to a private registry

If you are pulling your image from a registry within your cluster, the registry may only be accessed by using a different name from outside your cluster, and a different name from within your cluster. For example, you might want to push to an external registry and pull from an internal registry.

To specify different push and pull registries, use the following command:
```
appsody deploy -t <mynamespace/myrepository[:tag]> --push-url <external-registry-url:PORT> --pull-url <internal-registry-url:PORT>
```

This command completes the following actions:

- Calls `appsody build` and creates a deployment image.
- The `-t mynamespace/myrepository[:tag]` flag tags the image.
- The `--push-url` pushes the image to `<external-registry-url:PORT>`.
- Generates a deployment manifest file, "app-deploy.yaml", if one is not present, then applies it to your Kubernetes cluster.
- The `--pull-url` injects `<internal-registry-url:PORT>` into the deployment manifest for Kubernetes to pull the correct image.
- Deploys your image to your Kubernetes cluster via the [Appsody operator](/docs/reference/appsody-operator), or as a Knative service if you specify the "--knative" flag. 

> If an [Appsody operator](/docs/reference/appsody-operator) cannot be found, one will be installed on your cluster.


### Deploying multiple projects
If you are running multiple Appsody projects on your workstation, you can use `appsody deploy` and `appsody operator` commands to get them deployed to a Kubernetes cluster. However, make sure that you run these commands one at a time, because those commands create temporary files that might lead to conflicts if created concurrently.

### Ensuring the latest application code changes get deployed
Some users have noticed that their code changes do not seem to be published to the target Kubernetes cluster after an initial deployment of the Appsody project through `appsody deploy`.
The sequence of actions that leads to this behavior is as follows:
1. You create an initial version of your app, and then use `appsody deploy` to publish it to your test Kubernetes cluster.
1. You test your app, and make code changes. The code changes appear as you re-test your app using `appsody run`.
1. You decide to re-publish your app to your target cluster, and run `appsody deploy` again.
1. The command succeeds, yet nothing seems to change on the Kubernetes cluster: you still observe the older version of your app.

This behavior can be explained by the fact that - if you simply issue `appsody deploy` without explicitly tagging the image - you end up with a deployment manifest (the `app-deploy.yaml` file) that is identical to the one that was used to deploy the application the first time. Therefore, Kubernetes will detect no differences in the deployment yaml, and will do nothing to update your app.

To ensure that the latest version of your app is pushed to the cluster, use the -t flag to add a unique tag every time you redeploy your app. Kubernetes then detects a change in the deployment manifest, and pushes your app to the cluster again. For example: appsody deploy -t dev.local/my-image:0.x, where x is a number that you increment every time you redeploy.
## Deploying your app through a Tekton pipeline

> This deployment option is under development

Most likely, the deployment of apps created with the Appsody CLI is going to occur through the invocation of a CI/CD build pipeline.

As a developer, you develop your app using the Appsody CLI, and when you are ready to deploy, you push your code to a repo or create a pull request on GitHub.

This [example](https://github.com/appsody/tekton-example) shows you how to use Tekton pipelines to deploy your app to a Kubernetes cluster. More details on running the Tekton pipeline example for Appsody can be found in the repo [readme file] (https://github.com/appsody/tekton-example/blob/master/README.md). The example uses a [customized Buildah image with the Appsody CLI installed](https://github.com/appsody/appsody-buildah). For more information on using Appsody with Buildah, see the [FAQ](/docs/faq#9-can-i-use-appsody-without-docker).
