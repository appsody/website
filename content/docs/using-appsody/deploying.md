---
title: Getting ready to deploy your Appsody project
---

# Getting ready to deploy your Appsody project
When you've finished the development work for your Appsody project, you will have a containerized application that's ready to deploy to a suitable runtime infrastructure such as a cloud platform that hosts a Kubernetes cluster.

The Appsody CLI provides the [appsody deploy](/docs/cli-commands/#appsody-deploy) command to build and deploy a Docker image directly to a Kubernetes cluster that you are using for testing or staging.

You can delegate the build and deployment steps to an external pipeline, such as a Tekton pipeline that consumes the source code of your Appsody project after you push it to a GitHub repository. Within the pipeline, you can run [appsody build](/docs/using-appsody/building), which builds the application image and generates a deployment manifest. You can use the manifest to deploy your application to a Kubernetes environment where the Appsody operator is installed.

> Currently we only support a local Docker daemon. To workaround this, see the [FAQ](/docs/faq/#12-how-do-i-deploy-my-application-to-a-local-minikube-cluster).

These deployment options are covered in more detail in the following sections.

## Deploying your application to a Kubernetes cluster
There are many options to deploy your Appsody applications to a Kubernetes cluster. The best approach depends on the specific scenario:
- If you intend to have your application deployed on a shared cluster for integration testing or production, you are probably going to rely on CI/CD pipelines, and have the application built and deployed from its source.
- If you are testing your application on a locally installed cluster, you would want to use [appsody deploy](/docs/cli-commands/#appsody-deploy).

If you have installed a Kubernetes cluster on your development workstation and want to use your local Docker image cache instead of pushing the image to Docker Hub, make sure you set up your Kubernetes cluster to consume images from the local Docker cache.

To deploy your Appsody project locally, run:
```
appsody deploy
```
This command completes the following actions:

- Calls `appsody build` and creates a *deployment* Docker image and a deployment manifest file named `app-deploy.yaml`.
- If you specified the `--knative` flag, or if Knative is the only deployment option for your stack, the command tags the image with the prefix `dev.local`, making it accessible to your Kubernetes cluster (assuming you followed [these directions](/docs/using-appsody/installing-knative-locally)).
- The deployment manifest issues a `kubectl apply -f` command against the target Kubernetes cluster so that the application can be deployed by the [Appsody operator](https://operatorhub.io/operator/appsody-operator).

> To deploy your application without rebuilding the application image, or modifying the deployment manifest, run `appsody deploy --no-build`.

### Ensuring the latest application code changes get deployed
Some users have noticed that their code changes do not seem to be published to the target Kubernetes cluster after an initial deployment of the Appsody project through `appsody deploy`.

If you issue `appsody deploy` without explicitly tagging the image, you end up with an identical deployment manifest (`app-deploy.yaml` file) to the one that was initially used to deploy the application. Therefore, Kubernetes will detect no differences in the deployment manifest, and will not update your application.

To ensure the latest version of your application is pushed to the cluster, use the `-t` flag to add a unique tag every time you redeploy your application. Kubernetes then detects a change in the deployment manifest, and pushes your application to the cluster again. For example: `appsody deploy -t dev.local/my-image:0.x`, where x is a number that you increment every time you redeploy.

> If you are running multiple Appsody projects on your workstation, you can use the `appsody deploy` and `appsody operator` commands to get them deployed to a Kubernetes cluster. However, do not run these commands concurrently as they create temporary files that may lead to conflicts.

### Deployment via the Appsody Operator
Kubernetes operators offer a powerful way to provide full lifecycle maintenance of a wide range of resources on Kubernetes clusters. In particular, they can install, upgrade, remove, and monitor application deployments. The recently published [Appsody operator](https://operatorhub.io/operator/appsody-operator) automates the installation and maintenance of a special type of Custom Resource Definitions (CRDs), called **AppsodyApplication**.

The currently available Appsody stacks include a template of such a CRD manifest. When you run `appsody deploy` on a project created from one of the stacks enabled with those manifests, the CLI customizes the manifest with information that is specific to the deployment (e.g. namespace and project name), and submits the manifest to the Appsody operator on the Kubernetes cluster.

In fact, if your cluster does not already provide an operator, `appsody deploy` will install one for you. You can also use the Appsody CLI to install an instance of the Appsody operator, without installing any applications. This can be achieved by running the `appsody operator install` command.

To find out more about the Appsody operator, see [here](/docs/reference/appsody-operator).

### Deployment as a Knative Service

You can deploy your application as a Knative service on your target Kubernetes cluster by using the `--knative` flag. This flag is available to the `appsody build` or `appsody deploy` commands. This action sets the `createKnativeService` value in the deployment manifest to `true`.

To deploy your application as a Knative service, the following **pre-requisites** apply:

- You must have access to a Kubernetes cluster, with Knative Serving installed and running. To install Knative locally, use the Kubernetes feature in Docker for Desktop, see [Installing Knative Locally](/docs/faq#10-how-do-i-set-up-knative-serving-for-local-kubernetes-development). To install Knative on other Kubernetes clusters, see the [Knative Install Documentation](https://knative.dev/docs/install/).
- You must configure your `kubectl` CLI to point to your Kubernetes cluster.
- If you intend to push the Docker image containing your application to Docker Hub, your target cluster must be configured to pull images from Docker Hub.

Once the `appsody deploy --knative` command completes successfully, the Knative Service is operable at the URL specified in the command output.

### Deploying your application through Docker Hub

If your cluster is configured to pull images from Docker Hub, use the following command to deploy your application:
```
appsody deploy -t <mynamespace/myrepository[:tag]> --push --namespace mynamespace [--knative]
```
The command completes the following actions:

- Calls `appsody build` and creates a deployment image, as described in the previous section.
- The `-t mynamespace/myrepository[:tag]` flag tags the image.
- The `--push` flag tells the Appsody CLI to push the image to Docker Hub.
- Creates a deployment manifest file named `app-deploy.yaml` in the project directory, if one doesn’t exist already. If a deployment manifest file exists, this command updates the following entries within it: application image, labels, and annotations. In addition, the `createKnativeService` entry is set to true if you specified the `--knative` flag.
- The Yaml file is used to issue a `kubectl apply -f` command against the target Kubernetes cluster. The Yaml file is set to use the Appsody operator.
- The `--namespace mynamespace` option provisions the deployment under the specified Kubernetes namespace within your cluster.

> If you don't specify `--push`, the image is available only on your local Docker registry and the target Kubernetes cluster must be configured to have access to your local Docker registry.

### Deploying your application to a custom registry
If your cluster is configured to pull images from a custom registry, use the following command to deploy your application:
```
appsody deploy -t <mynamespace/myrepository[:tag]> --push-url <registry-url:PORT>
```

If you are specifying different push and pull registries, for example, you might want to push to an external registry and pull from an internal registry, use the following command:
```
appsody deploy -t <mynamespace/myrepository[:tag]> --push-url <external-registry-url:PORT> --pull-url <internal-registry-url:PORT>
```
> Note: The pull registry url gets injected into the deployment manifest for Kubernetes to pull the correct image.

## Deploying your application through a Tekton pipeline

> This deployment option is under development

Most likely, the deployment of applications created with the Appsody CLI is going to occur through the invocation of a CI/CD build pipeline.

As a developer, you develop your application using the Appsody CLI, and when you are ready to deploy, you push your code to a repository or create a pull request on GitHub.

This [example](https://github.com/appsody/tekton-example) shows you how to use Tekton pipelines to deploy your application to a Kubernetes cluster. More details on running the Tekton pipeline example for Appsody can be found in the repository [README](https://github.com/appsody/tekton-example/blob/master/README.md). The example uses a [customized Buildah image](https://github.com/appsody/appsody-buildah) with the Appsody CLI installed. For more information on using Appsody with Buildah, see the [FAQ](/docs/faq#9-can-i-use-appsody-without-docker).
