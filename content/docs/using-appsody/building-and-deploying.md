---
title: Getting ready to deploy your Appsody project
---

# Getting ready to deploy your Appsody project
When you've finished the development work for your Appsody project, you will have a containerized application that's ready to deploy to a suitable runtime infrastructure
such as a cloud platform that hosts a Kubernetes cluster.

The Appsody CLI provides various options to help you with the transition from the development phase to the deployment phase:

- You can use the `appsody build` command to generate a *deployment* Docker image on your local Docker registry, and then manually deploy that image to your runtime platform of choice.
- You can use the `appsody deploy` command to build and deploy a Docker image directly to a Kubernetes cluster that you are using for testing or staging.
- You can delegate the build and deployment steps to an external pipeline, such as a Tekton pipeline that consumes the source code of your Appsody project after you push it to a GitHub repository. Within the pipeline, you can run `appsody build`, which builds the application image and generates a deployment manifest. You can use the manifest to deploy your application to a Kubernetes environment where the Appsody operator is installed.

These deployment options are covered in more detail in the following sections.

## Building your runtime Docker image with Appsody

When you use the Appsody CLI to develop your applications, a *development* Docker image of the target runtime is downloaded and run for you. This image differs slightly from the image that is used at deployment time, because it configures tools that are useful only during the development phase.

If you want to generate a *deployment* Docker image , use the `appsody build` command.

The `appsody build` command completes the following actions:

- Extracts your code and other artifacts, including a new Dockerfile, which are required to build the *deployment* image from the *development* image. These files are saved to the `~/.appsody/extract` directory.
- Runs a `docker build` against the Dockerfile that was extracted on the previous step to produce a *deployment* image in your local Docker registry. If you want to give the image a name, specify the `-t <tag>` parameter. If you run `appsody build` with no parameters, the image is given a name that matches the name of your project.
- Generates a manifest called `app-deploy.yaml` that can be used to deploy your Appsody application.

> If your project includes uppercase characters these are converted to lowercase characters in the image name because Docker does not accept uppercase characters in image tags. Also, if your project directory includes underscore characters, those will be converted to dashes (-), because certain areas of Kubernetes are not tolerant of underscore characters.

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

## Deploying your app directly to a Kubernetes cluster
There are many options to deploy your Appsody applications to a Kubernetes cluster. The best approach depends on the specific scenario:
- If you are testing your app on a locally installed cluster, using `appsody deploy` is your best bet
- If you intend to have your app deployed on a shared cluster for integration testing or production, you are probably going to rely on CI/CD pipelines, and have the app built and deployed from its source.

The `appsody deploy` command provides a way for you to deploy your application directly to a Kubernetes cluster. The stack contains a deployment manifest that can be consumed by the [Appsody operator](https://operatorhub.io/operator/appsody-operator). `appsody deploy` will install the operator, if necessary, and deploy your application to the cluster using that deployment manifest.

If you want to deploy your application without rebuilding the application image, or modifying the deployment manifest, you can run
```
appsody deploy --no-build
```

### Deployment via the Appsody Operator - Overview
Kubernetes operators offer a powerful way to provide full lifecycle maintenance of a wide range of resources on Kubernetes clusters. In particular, they can install, upgrade, remove, and monitor application deployments. The recently published [Appsody operator](https://operatorhub.io/operator/appsody-operator) automates the installation and maintenance of a special type of Custom Resource Definitions (CRDs), called **AppsodyApplication**.

The Appsody stacks that are currently available include a template of such a CRD manifest. When you run `appsody deploy` on a project created from one of the stacks enabled with those manifests, the CLI customizes the manifest with information that is specific to the deployment (such as namespace and project name), and submits the manifest to the Appsody operator on the Kubernetes cluster.

In fact, if your cluster does not already provide an operator, `appsody deploy` will install one for you. You can also use the Appsody CLI to install an instance of the Appsody operator, without installing any applications. This can be achieved by running the `appsody operator install` command.
Let's discuss some of the details behind the `appsody deploy` and `appsody operator` commands.

#### How the Appsody operator works
Before we delve into the details of `appsody deploy` and `appsody operator`, we need to spend a few words on how the Appsody operator works.

An operator monitors certain resources - it can detect when resource definition instances are added, removed, or changed, and take the appropriate action.

The Appsody operator monitors instances of the **AppsodyApplication** resource. It does so by "watching" a certain namespace, which is defined when the Appsody operator is installed. The operator can watch a single namespace, or all the namespaces in the cluster.

The operator itself, however, can be installed in its own namespace, which not necessarily coincides with the namespace it is watching. You can have an Appsody operator in namespace "abc" watching namespace "xyz".

You can also have multiple Appsody operators in a cluster, but only one operator can watch a certain namespace. Also, only one operator can be installed in any given namespace.

Lastly, if you have an Appsody operator that watches the entire cluster, that can be the only Appsody operator in the cluster.

#### Using `appsody deploy` with the Appsody operator
When you run `appsody deploy` on a project that is based on a stack that is enabled for the Appsody operator, this command will do the following:
- It will check whether there is an Appsody operator in the target namespace that watches that same namespace
- If there isn't one, it attempts to install it. If there's already an operator, the command will move to the next step.
- The command will then proceed to install the AppsodyApplication (your app)

The command can be run with or without a `--namespace` or `-n` flag. If that flag is omitted, you are targeting the `default` namespace.

The command also accepts an optional `--knative` flag, which instructs Appsody to deploy your application as a Knative service. More on this option [in this section](#deployment-as-a-knative-service)

When you want to remove your application, you can run:

```
appsody deploy delete
```
This command must be run from your Appsody project directory. It will attempt to remove the application you installed, but it will not touch the Appsody operator.

#### Using the `appsody operator` commands
In certain cases, you may want to deploy one or more Appsody operators on your cluster ahead of time, and let developers deploy their applications to the cluster without them having to meddle with operator deployments.

The `appsody operator` commands can be used to install or uninstall those operators. They take this form:
```
appsody operator install --namespace <operator namespace> --watchspace <watched namespace>
appsody operator uninstall --namespace <operator namespace>
```
The first command attempts to install an Appsody operator in `operator namespace`, watching the `watched namespace`. If the `--watchspace` flag is omitted, the watched namespace will default to the operator namespace. If both flags are omitted, both namespaces will be assumed to be the `default` namespace.

The second command attempts to remove the Appsody operator installed in the `operator namespace`, if there is one. When you run that command, the Appsody CLI will check whether there are Appsody applications that are present in the watched namespace associated with that operator. If there are any, the command will take no action and produce a message that suggests using the `--force` flag to force the removal of the apps, as shown below:
```
appsody operator uninstall --namespace <operator namespace> --force
```

You can also install an Appsody operator that watches the entire cluster, using the following command:
```
appsody operator install --namespace <operator namespace> --watch-all
```

#### RBAC considerations for the use of `appsody deploy` and `appsody operator` commands

The `appsody deploy` and `appsody operator` commands involve the lookup and creation of a number of different resources, both in specific namespaces and at the cluster level.

In a typical local testing scenario, developers have full administrative rights on the entire cluster. In that case, no specific provisions need to be made in terms of granting permissions.

However, if a single cluster is shared across many development groups, it is common practice to restrict full access to resources by limiting it to a single namespace. An individual developer or a group of developers would have the ability to create, modify, and delete resources only in a certain namespace.

The use of `appsody deploy` and `appsody operator` commands, however, requires granting the following permissions:
1) Querying Appsody operator instances across namespaces
2) Creating the `AppsodyApplication` CRDs
3) Querying `RoleBindings` across namespaces
4) Creating instances of the Appsody operator in a namespace
5) Full access to resources in the watched namespace of the operator, if different from the namespace where the operator is installed

In a shared cluster scenario, with developers limited to access their own namespace, we expect the most common pattern of usage will be the following:

1) Developers can use `appsody deploy -n <namespace>` to target their own namespace. The first time `appsody deploy` is used, the operator is installed and it watches the namespace of choice.

2) Only cluster administrators can use `appsody operator install -n <namespace> --watchspace <another namespace>` to enable operators to watch across namespaces.

Under these assumptions, developers need to be granted the following permissions:
1) First, through a Role:
```
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: $NAMESPACE-user-full-access
  namespace: $NAMESPACE
rules:
- apiGroups: ["", "extensions", "apps", "autoscaling", "appsody.dev", "rbac.authorization.k8s.io"]
  resources: ["*"]
  verbs: ["*"]
- apiGroups: ["batch"]
  resources:
  - jobs
  - cronjobs
  verbs: ["*"]
```
This role grants full access to resources in a certain namespace (substitute the `$NAMESPACE` placeholder with the namespace name), including the Appsody operator resources.

2) Second, through a ClusterRole:
```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: $NAMESPACE-user-node-readonly-access
rules:
- apiGroups: ["", "apps", "autoscaling", "extensions"]
  resources: ["*"]
  verbs: ["get", "watch", "list"]
- apiGroups: ["apiextensions.k8s.io"]
  resources: ["customresourcedefinitions"]
  verbs: ["*"]
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["rolebindings"]
  verbs: ["get", "watch", "list"]  
  ```
  This ClusterRole allows users to lookup the necessary resources across namespaces, and to create CRDs anywhere in the cluster (which is required by the installation of the operator, in certain cases).

  Once you have these roles in place, you need to create the appropriate RoleBinding and ClusterRoleBinding to bind your users or groups to them.


#### Considerations on Appsody operators not installed via the Appsody CLI
Appsody operators can be installed through different means - the Appsody CLI is one of the ways to get them installed.
- The Appsody CLI assumes you have at most one Appsody operator per namespace. If you install the operator with the Appsody CLI, this constraint is enforced by the CLI itself. If you use different techniques to install the operator, make sure you do not install multiple operators in the same namespace.

- The Appsody operators created by `appsody operator install` or `appsody deploy` watch only one namespace.  However, the Appsody CLI operations `appsody operator install` and `appsody deploy` can tolerate an Appsody operator created by a different mechanism which watches multiple namespaces.

### Deployment as a Knative Service

You can deploy your application as a Knative service on your target Kubernetes cluster by using the `--knative` flag with the `appsody build` or `appsody deploy` commands. This action sets the flag `createKnativeService` in the deployment manifest to `true`.

For your app to work as a Knative service, the following **pre-requisites** apply:

- You must have access to a Kubernetes cluster, with Knative Serving installed and running. To install Knative locally, use the Kubernetes feature in Docker for Desktop, see [Installing Knative Locally](/docs/using-appsody/installing-knative-locally). To install Knative on other Kubernetes clusters, see the [Knative Install Documentation](https://knative.dev/docs/install/).
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

Most likely, the deployment of apps created with the appsody CLI is going to occur through the invocation of a CI/CD build pipeline.

As a developer, you develop your app using the appsody CLI, and when you are ready to deploy, you push your code to a repo or create a pull request on GitHub.

This [example](https://github.com/appsody/tekton-example) shows you how to use Tekton pipelines to deploy your app to a Kubernetes cluster. More details on running the Tekton pipeline example for Appsody can be found in the repo [readme file] (https://github.com/appsody/tekton-example/blob/master/README.md).
