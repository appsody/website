---
title: Getting ready to deploy your Appsody project
---

# Getting ready to deploy your Appsody project
When you've finished the development work for your Appsody project, you will have a containerized application that's ready to deploy to a suitable runtime infrastructure such as a cloud platform that hosts a Kubernetes cluster.

The Appsody CLI provides the [appsody deploy](/docs/cli-commands/#appsody-deploy) command to build and deploy a Docker image directly to a Kubernetes cluster that you are using for testing or staging.

The deployment manifest for your project (`app-deploy.yaml`) is created or updated when you run `appsody build` or `appsody deploy`. The Appsody CLI uses deployment information from the stack and adds various [traceability metadata](/docs/reference/metadata) while generating this manifest.  You can edit this file to suit your application and store it under source control. If you want to quickly obtain the deployment manifest without having to build or deploy your application, run the `appsody deploy --generate-only` command.

You can delegate the build and deployment steps to an external pipeline, such as a Tekton pipeline that consumes the source code of your Appsody project after you push it to a GitHub repository. Within the pipeline, you can run [appsody build](/docs/using-appsody/building), which builds the application image and generates a deployment manifest. You can use the manifest to deploy your application to a Kubernetes environment where the Appsody operator is installed.

These deployment options are covered in more detail in the following sections.
> Options available to the `build` command, such as tagging and pushing images, are also available to the `deploy` command. For more details, see [here](/docs/using-appsody/building/#tagging-your-application-image).

## Deploying your application to a Kubernetes cluster
There are many options to deploy your Appsody applications to a Kubernetes cluster. The best approach depends on the specific scenario:
- If you intend to deploy your application on a shared cluster for integration testing or production, you are probably going to rely on CI/CD pipelines. In this case, the application is built and deployed from its source.
- If you are testing your application on a locally installed cluster, you would want to use [appsody deploy](/docs/cli-commands/#appsody-deploy).

If your development workstation has a Kubernetes cluster installed, you can use your local Docker image cache instead of pushing the image to Docker Hub. To do this, you need to configure your Kubernetes cluster to use images from the local Docker [cache](https://kubernetes.io/docs/concepts/containers/images/#pre-pulled-images).

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

> If you are running multiple Appsody projects on your workstation, you can use the [appsody deploy](/docs/cli-commands/#appsody-deploy) and [appsody operator](/docs/cli-commands/#appsody-operator) commands to deploy them to a Kubernetes cluster. However, do not run these commands concurrently as they create temporary files that might lead to conflicts.

### Deployment via the Appsody Operator
Kubernetes operators offer a powerful way to provide full lifecycle maintenance of a wide range of resources on Kubernetes clusters. In particular, they can install, upgrade, remove, and monitor application deployments. The recently published [Appsody operator](https://operatorhub.io/operator/appsody-operator) automates the installation and maintenance of a special type of Custom Resource Definitions (CRDs), called **AppsodyApplication**.

The currently available Appsody stacks include a template of such a CRD manifest. When you run `appsody deploy` on a project created from one of the stacks enabled with those manifests, the CLI customizes the manifest with information that is specific to the deployment (e.g. namespace and project name), and submits the manifest to the Appsody operator on the Kubernetes cluster. If you would like to generate the deployment manifest without having to deploy your Appsody project, use the `--generate-only` flag.

In fact, if your cluster does not already provide an operator, `appsody deploy` will install one for you. You can also use the Appsody CLI to install an instance of the Appsody operator, without installing any applications. This can be achieved by running the `appsody operator install` command.

To find out more about the Appsody operator, see [here](/docs/reference/appsody-operator).

### Deployment as a Knative Service

You can deploy your application as a Knative service on your target Kubernetes cluster by using the `--knative` flag. This flag is available to the `appsody build` or `appsody deploy` commands. This action sets the `createKnativeService` value in the deployment manifest to `true`.

To deploy your application as a Knative service, the following **pre-requisites** apply:

- You must have access to a Kubernetes cluster, with Knative Serving installed and running. To install Knative locally, use the Kubernetes feature in Docker for Desktop, see [Installing Knative Locally](/docs/faq#10-how-do-i-set-up-knative-serving-for-local-kubernetes-development). To install Knative on other Kubernetes clusters, see the [Knative Install Documentation](https://knative.dev/docs/install/).
- You must configure your `kubectl` CLI to point to your Kubernetes cluster.
- If you intend to push the Docker image containing your application to Docker Hub, your target cluster must be configured to pull images from Docker Hub.

Once the `appsody deploy --knative` command completes successfully, the Knative Service is operable at the URL specified in the command output.

### Deploying to a private registry

If you are pulling your image from a registry within your cluster, the registry may only be accessed by using a different name from outside your cluster, and a different name from within your cluster. To specify different push and pull registries, use the `--push-url <push-url>` and `--pull-url <pull-url>` flags along with the `build` command.

For example:
```
appsody deploy -t <mynamespace/myrepository[:tag]> --push-url <external-registry-url:PORT> --pull-url <internal-registry-url:PORT>
```

This command completes the following actions:
- The application image built by `appsody build` will be tagged with the name `mynamespace/myrepository[:tag]`, and pushed to the registry at the URL that you specify with `<external-registry-url:PORT>`. 
- The `--pull-url` flag injects `<internal-registry-url:PORT>` into the deployment manifest for Kubernetes to pull the correct image and your image is deployed to your Kubernetes cluster via the [Appsody operator](/docs/reference/appsody-operator)

> If an [Appsody operator](/docs/reference/appsody-operator) cannot be found, one will be installed on your cluster.

## Deploying your application through a Tekton pipeline

> This deployment option is under development

Most likely, the deployment of applications that are created with the Appsody CLI is going to occur through the invocation of a CI/CD build pipeline.

As a developer, you develop your application using the Appsody CLI, and when you are ready to deploy, you push your code to a repository or create a pull request on GitHub.

This [example](https://github.com/appsody/tekton-example) shows you how to use Tekton pipelines to deploy your application to a Kubernetes cluster. More details on running the Tekton pipeline example for Appsody can be found in the repository [README](https://github.com/appsody/tekton-example/blob/master/README.md). The example uses a [customized Buildah image](https://github.com/appsody/appsody-buildah) with the Appsody CLI installed. For more information on using Appsody with Buildah, see the [FAQ](/docs/faq#9-can-i-use-appsody-without-docker).
