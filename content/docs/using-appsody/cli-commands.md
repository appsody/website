---
title: CLI Reference
---

# Appsody CLI
## appsody

Appsody CLI

### Synopsis

The Appsody command-line tool (CLI) enables the rapid development of cloud native applications.

Complete documentation is available at https://appsody.dev

### Options

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -h, --help            help for appsody
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody build](#appsody-build)	 - Build a local container image of your Appsody project.
* [appsody completion](#appsody-completion)	 - Generates bash tab completions
* [appsody debug](#appsody-debug)	 - Debug your Appsody project.
* [appsody deploy](#appsody-deploy)	 - Build and deploy your Appsody project to Kubernetes.
* [appsody extract](#appsody-extract)	 - Extract your Appsody project to a local directory.
* [appsody init](#appsody-init)	 - Initialize an Appsody project.
* [appsody list](#appsody-list)	 - List the available Appsody stacks.
* [appsody operator](#appsody-operator)	 - Install or uninstall the Appsody operator from your Kubernetes cluster.
* [appsody ps](#appsody-ps)	 - List the Appsody containers running in the local Docker environment.
* [appsody repo](#appsody-repo)	 - Manage your Appsody repositories
* [appsody run](#appsody-run)	 - Run your Appsody project in a containerized development environment.
* [appsody stack](#appsody-stack)	 - Tools to help create and test Appsody stacks
* [appsody stop](#appsody-stop)	 - Stop the local, running Appsody container.
* [appsody test](#appsody-test)	 - Test your project in the local Appsody environment.
* [appsody version](#appsody-version)	 - Show the version of the Appsody CLI.

## appsody build

Build a local container image of your Appsody project.

### Synopsis

Build a local container image of your Appsody project. The stack, along with your Appsody project, is extracted to a local directory before the container build is run.

By default, the built image is tagged with the project name that you specified when you initialised your Appsody project. If you did not specify a name, the image is tagged with the name of the root directory of your Appsody project.

If you want to push the built image to an image repository using the [--push] options, you must specify the relevant image tag.

```
appsody build [flags]
```

### Examples

```
  appsody build -t my-repo/nodejs-express --push
  Builds the container image, tags it with my-repo/nodejs-express, and pushes it to the container registry the Docker CLI is currently logged into.

  appsody build -t my-repo/nodejs-express:0.1 --push-url my-registry-url
  Builds the container image, tags it with my-repo/nodejs-express, and pushes it to my-registry-url/my-repo/nodejs-express:0.1.
```

### Options

```
      --buildah                  Build project using buildah primitives instead of Docker.
      --buildah-options string   Specify the buildah build options to use. Value must be in "".
      --docker-options string    Specify the Docker build options to use. Value must be in "". The following Docker options are not supported: '--help','-t','--tag','-f','--file'.
  -f, --file string              The file name to use for the deployment configuration. (default "app-deploy.yaml")
  -h, --help                     help for build
      --knative                  Deploy as a Knative Service
      --pull-url string          Remote repository to pull image from.
      --push                     Push the container image to the image repository.
      --push-url string          The remote registry to push the image to. This will also trigger a push if the --push flag is not specified.
      --stack-registry string    Specify the URL of the registry that hosts your stack images. (default "docker.io")
  -t, --tag string               Container image name and optionally, a tag in the 'name:tag' format.
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody completion

Generates bash tab completions

### Synopsis

Outputs a bash completion script for appsody to stdout.  Bash completion is optionally available for your convenience. It helps you fill out appsody commands when you type the [TAB] key.

	To install on macOS
	1. brew install bash-completion
	2. Make sure to update your ~/.bash_profile as instructed
	3. appsody completion > /usr/local/etc/bash_completion.d/appsody

	To install on Linux
	1. On a current Linux OS (in a non-minimal installation), bash completion should be available.
	2. For Debian see the following link for more information:  https://debian-administration.org/article/316/An_introduction_to_bash_completion_part_1
	3. Make sure to copy the appsody completion file generated above into the appropriate directory for your Linux distribution e.g.
	appsody completion >  /etc/bash_completion.d/appsody

```
appsody completion [flags]
```

### Options

```
  -h, --help   help for completion
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody debug

Debug your Appsody project.

### Synopsis

Start a container-based continuous build environment for your Appsody project, with debugging enabled.

```
appsody debug [flags]
```

### Examples

```
  appsody debug --docker-options "--privileged"
  Starts the debugging environment, passing the "--privileged" option to the "docker run" command as a flag.
  
  appsody debug --name my-project-dev2 -p 3001:3000
  Starts the debugging environment, names the development container "my-project-dev2", and binds the container port 3000 to the host port 3001.
```

### Options

```
      --deps-volume string      Docker volume to use for dependencies. Mounts to APPSODY_DEPS dir. (default "my-project-deps")
      --docker-options string   Specify the docker run options to use.  Value must be in "". The following Docker options are not supported:  '--help','-p','--publish-all','-P','-u','-—user','-—name','-—network','-t','-—tty,'—rm','—entrypoint','-v','—volume'.
  -h, --help                    help for debug
  -i, --interactive             Attach STDIN to the container for interactive TTY mode
      --name string             Assign a name to your development container. (default "my-project-dev")
      --network string          Specify the network for docker to use.
      --no-watcher              Disable file watching, regardless of container environment variable settings.
  -p, --publish stringArray     Publish the container's ports to the host. The stack's exposed ports will always be published, but you can publish addition ports or override the host ports with this option.
  -P, --publish-all             Publish all exposed ports to random ports
      --stack-registry string   Specify the URL of the registry that hosts your stack images. (default "docker.io")
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody deploy

Build and deploy your Appsody project to Kubernetes.

### Synopsis

Build and deploy a local container image of your Appsody project to your Kubernetes cluster. 
		
The command performs the following steps:

1. Runs the appsody build command to build the container image for deployment.
2. Generates a deployment manifest file, "app-deploy.yaml", if one is not present, then applies it to your Kubernetes cluster.
3. Deploys your image to your Kubernetes cluster via the Appsody operator, or as a Knative service if you specify the "--knative" flag. If an Appsody operator cannot be found, one will be installed on your cluster.

```
appsody deploy [flags]
```

### Examples

```
  appsody deploy --namespace my-namespace
  Builds and deploys your project to the "my-namespace" namespace in your local Kubernetes cluster.
  
  appsody deploy -t my-repo/nodejs-express --push-url external-registry-url --pull-url internal-registry-url
  Builds and tags the image as "my-repo/nodejs-express", pushes the image to "external-registry-url/my-repo/nodejs-express", and creates a deployment manifest that tells the Kubernetes cluster to pull the image from "internal-registry-url/my-repo/nodejs-express".
```

### Options

```
      --buildah                  Build project using buildah primitives instead of docker.
      --buildah-options string   Specify the buildah build options to use. Value must be in "".
      --docker-options string    Specify the docker build options to use. Value must be in "". The following Docker options are not supported: '--help','-t','--tag','-f','--file'.
  -f, --file string              The file name to use for the deployment manifest. (default "app-deploy.yaml")
      --force                    DEPRECATED - Force the reuse of the deployment manifest file if one exists.
      --generate-only            DEPRECATED - Only generate the deployment manifest file. Do not deploy the project.
  -h, --help                     help for deploy
      --knative                  Deploy as a Knative Service
  -n, --namespace string         Target namespace in your Kubernetes cluster (default "default")
      --no-build                 Deploys the application without building a new image or modifying the deployment manifest file.
      --pull-url string          Remote repository to pull image from.
      --push                     Push this image to an external Docker registry. Assumes that you have previously successfully done docker login
      --push-url string          Remote repository to push image to.  This will also trigger a push if the --push flag is not specified.
      --stack-registry string    Specify the URL of the registry that hosts your stack images. (default "docker.io")
  -t, --tag string               Docker image name and optionally a tag in the 'name:tag' format
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI
* [appsody deploy delete](#appsody-deploy-delete)	 - Delete your deployed Appsody project from a Kubernetes cluster.

## appsody deploy delete

Delete your deployed Appsody project from a Kubernetes cluster.

### Synopsis

Delete your deployed Appsody project from the configured Kubernetes cluster, using your existing deployment manifest.

By default, the command looks for the deployed project in the "default" namespace and uses the generated "app-deploy.yaml" deployment manifest, unless you specify otherwise.

Run this command from the root directory of your Appsody project.

```
appsody deploy delete [flags]
```

### Examples

```
  appsody deploy delete -f my-deploy.yaml
  Deletes the AppsodyApplication from the "default" namespace, using the name and type specified in the "my-deploy.yaml" deployment manifest.
  
  appsody deploy delete --namespace my-namespace
  Deletes the AppsodyApplication from the "my-namespace" namespace, using the name and type specified in the "app-deploy.yaml" deployment manifest.
```

### Options

```
  -h, --help   help for delete
```

### Options inherited from parent commands

```
      --buildah                  Build project using buildah primitives instead of docker.
      --buildah-options string   Specify the buildah build options to use. Value must be in "".
      --config string            config file (default is $HOME/.appsody/.appsody.yaml)
      --docker-options string    Specify the docker build options to use. Value must be in "". The following Docker options are not supported: '--help','-t','--tag','-f','--file'.
      --dryrun                   Turns on dry run mode
  -f, --file string              The file name to use for the deployment manifest. (default "app-deploy.yaml")
      --force                    DEPRECATED - Force the reuse of the deployment manifest file if one exists.
      --generate-only            DEPRECATED - Only generate the deployment manifest file. Do not deploy the project.
      --knative                  Deploy as a Knative Service
  -n, --namespace string         Target namespace in your Kubernetes cluster (default "default")
      --no-build                 Deploys the application without building a new image or modifying the deployment manifest file.
      --pull-url string          Remote repository to pull image from.
      --push                     Push this image to an external Docker registry. Assumes that you have previously successfully done docker login
      --push-url string          Remote repository to push image to.  This will also trigger a push if the --push flag is not specified.
      --stack-registry string    Specify the URL of the registry that hosts your stack images. (default "docker.io")
  -t, --tag string               Docker image name and optionally a tag in the 'name:tag' format
  -v, --verbose                  Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody deploy](#appsody-deploy)	 - Build and deploy your Appsody project to Kubernetes.

## appsody extract

Extract your Appsody project to a local directory.

### Synopsis

Extract the full application (the stack and your Appsody project) into a local directory.
		
Your project is extracted into your local '$HOME/.appsody/extract' directory, unless you use the --target-dir flag to specify a different location

```
appsody extract [flags]
```

### Examples

```
  appsody extract --target-dir $HOME/my-extract/directory
  Extracts your project from the container to the local '$HOME/my-extract/directory' on your system.
```

### Options

```
      --buildah             Extract project using buildah primitives instead of Docker.
  -h, --help                help for extract
      --name string         Assign a name to your development container. (default "my-project-extract")
      --target-dir string   The absolute directory path to extract the files into. This directory must not exist, as it will be created.
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody init

Initialize an Appsody project.

### Synopsis

Set up the local Appsody development environment. You can do this for an existing project or use the template application provided by the stack. 

By default, the command creates an Appsody stack configuration file and provides a simple default application. You can also initialize a project with a different template application, or no template. 

To initialize a project with a template application, in a directory that is not empty, you need to specify the "overwrite" option [--overwrite].
Use 'appsody list' to see the available stacks and templates.

```
appsody init [stack] or [repository]/[stack] [template] [flags]
```

### Examples

```
  appsody init nodejs-express
  Initializes a project with the default template from the "nodejs-express" stack in the default repository.
  
  appsody init experimental/nodejs-functions
  Initializes a project with the default template from the "nodejs-functions" stack in the "experimental" repository.
  
  appsody init nodejs-express scaffold
  Initializes a project with the "scaffold" template from "nodejs-express" stack in the default repository.

  appsody init nodejs none
  Initializes a project without a template for the "nodejs" stack in the default repository.

  appsody init
  Runs the stack init script to set up the local development environment on an existing Appsody project.
```

### Options

```
  -h, --help                  help for init
      --no-template           Only create the .appsody-config.yaml file. Do not unzip the template project. [Deprecated]
      --overwrite             Download and extract the template project, overwriting existing files.  This option is not intended to be used in Appsody project directories.
      --project-name string   Project Name for Kubernetes Service (default "my-project")
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody list

List the available Appsody stacks.

### Synopsis

List all the Appsody stacks available in your repositories. 

An asterisk in the repository column denotes the default repository. An asterisk in the template column denotes the default template that is used when you initialise an Appsody project.

```
appsody list [repository] [flags]
```

### Examples

```
  appsody list
  Lists all available stacks for each of your repositories.
  
  appsody list my-repo
  Lists available stacks only in your "my-repo" repository.
```

### Options

```
  -h, --help            help for list
  -o, --output string   Output list in yaml or json format
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody operator

Install or uninstall the Appsody operator from your Kubernetes cluster.

### Synopsis

This command allows you to "install" or "uninstall" the Appsody operator from the configured Kubernetes cluster. An installed Appsody operator is required to deploy your Appsody projects.

### Options

```
  -h, --help               help for operator
  -n, --namespace string   The namespace in which the operator will run. (default "default")
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI
* [appsody operator install](#appsody-operator-install)	 - Install the Appsody Operator.
* [appsody operator uninstall](#appsody-operator-uninstall)	 - Uninstall the Appsody Operator.

## appsody operator install

Install the Appsody Operator.

### Synopsis

Install the Appsody Operator into your configured Kubernetes cluster.
		
The Appsody Operator listens for incoming AppsodyApplication resources on your cluster. For more information, see https://operatorhub.io/operator/appsody-operator. 

By default, the operator watches a single namespace. You can specify the ‘--watch-all’ flag to tell the operator to watch all namespaces in the cluster. If you want to watch multiple, but not all, namespaces within your cluster, install an additional operator to watch each additional namespace.

```
appsody operator install [flags]
```

### Examples

```
  appsody operator install --namespace my-namespace --watchspace my-watchspace
  Installs the Appsody Operator into your Kubernetes cluster in the "my-namespace" namespace, and sets it to watch for AppsodyApplication resources in the "my-watchspace" namespace.
```

### Options

```
  -h, --help                help for install
      --watch-all           Specifies that the operator watches all namespaces.
  -w, --watchspace string   The namespace that the operator watches.
```

### Options inherited from parent commands

```
      --config string      config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun             Turns on dry run mode
  -n, --namespace string   The namespace in which the operator will run. (default "default")
  -v, --verbose            Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody operator](#appsody-operator)	 - Install or uninstall the Appsody operator from your Kubernetes cluster.

## appsody operator uninstall

Uninstall the Appsody Operator.

### Synopsis

Uninstall the Appsody Operator from your configured Kubernetes cluster.

```
appsody operator uninstall [flags]
```

### Examples

```
  appsody operator uninstall --namespace my-namespace
  Uninstalls the Appsody Operator in the "my-namespace" namespace from your Kubernetes cluster.
```

### Options

```
      --force   Force removal of appsody apps if present
  -h, --help    help for uninstall
```

### Options inherited from parent commands

```
      --config string      config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun             Turns on dry run mode
  -n, --namespace string   The namespace in which the operator will run. (default "default")
  -v, --verbose            Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody operator](#appsody-operator)	 - Install or uninstall the Appsody operator from your Kubernetes cluster.

## appsody ps

List the Appsody containers running in the local Docker environment.

### Synopsis

List all stack-based containers that are currently running in the local Docker environment. 
		
Shows the following information about the Appsody containers that are currently running: container ID, container name, image and status.

```
appsody ps [flags]
```

### Options

```
  -h, --help   help for ps
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody repo

Manage your Appsody repositories

### Synopsis

Manage your Appsody repositories

### Options

```
  -h, --help   help for repo
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI
* [appsody repo add](#appsody-repo-add)	 - Add an Appsody repository.
* [appsody repo list](#appsody-repo-list)	 - List your Appsody repositories.
* [appsody repo remove](#appsody-repo-remove)	 - Remove an Appsody repository.
* [appsody repo set-default](#appsody-repo-set-default)	 - Set a default repository.

## appsody repo add

Add an Appsody repository.

### Synopsis

Add an Appsody repository to your list of configured Appsody repositories.

```
appsody repo add <name> <url> [flags]
```

### Examples

```
  appsody repo add my-local-repo file:///absolute/path/to/my-local-repo.yaml
  Adds the "my-local-repo" repository, specified by the "file:///absolute/path/to/my-local-repo.yaml" file to your list of repositories.
```

### Options

```
  -h, --help   help for add
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody repo](#appsody-repo)	 - Manage your Appsody repositories

## appsody repo list

List your Appsody repositories.

### Synopsis

List all your configured Appsody repositories. The "incubator" repository is the initial default repository for Appsody.

```
appsody repo list [flags]
```

### Options

```
  -h, --help            help for list
  -o, --output string   Output repo list in yaml or json format
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody repo](#appsody-repo)	 - Manage your Appsody repositories

## appsody repo remove

Remove an Appsody repository.

### Synopsis

Remove an Appsody repository from your list of configured Appsody repositories.
		
You cannot remove the default repository, but you can make a different repository the default (see appsody repo set-default).

```
appsody repo remove <name> [flags]
```

### Examples

```
  appsody repo remove my-local-repo
  Removes the "my-local-repo" repository from your list of configured repositories.
```

### Options

```
  -h, --help   help for remove
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody repo](#appsody-repo)	 - Manage your Appsody repositories

## appsody repo set-default

Set a default repository.

### Synopsis

Set your specified repository to be the default repository.

The default repository is used when you run the "appsody init" command without specifying a repository name. Use "appsody repo list" or "appsody list" to see which repository is currently the default (denoted by an asterisk).

```
appsody repo set-default <name> [flags]
```

### Examples

```
  appsody repo set-default my-local-repo
  Sets your default repository to "my-local-repo".
```

### Options

```
  -h, --help   help for set-default
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody repo](#appsody-repo)	 - Manage your Appsody repositories

## appsody run

Run your Appsody project in a containerized development environment.

### Synopsis

Run the local Appsody environment, starting a container-based, continuous build environment for your project.
		
Run this command from the root directory of your Appsody project

```
appsody run [flags]
```

### Examples

```
  appsody run
  Runs your project in a containerized development environment.

  appsody run --interactive
  Runs your project in a containerized development environment, and attaches the standard input stream to the container. You can use the standard input stream to interact with processes inside the container.

  appsody run -p 3001:3000 --docker-options "--privileged" 
  Runs your project in a containerized development environment, binds the container port 3000 to the host port 3001, and passes the "--privileged" option to the "docker run" command as a flag.
```

### Options

```
      --deps-volume string      Docker volume to use for dependencies. Mounts to APPSODY_DEPS dir. (default "my-project-deps")
      --docker-options string   Specify the docker run options to use.  Value must be in "". The following Docker options are not supported:  '--help','-p','--publish-all','-P','-u','-—user','-—name','-—network','-t','-—tty,'—rm','—entrypoint','-v','—volume'.
  -h, --help                    help for run
  -i, --interactive             Attach STDIN to the container for interactive TTY mode
      --name string             Assign a name to your development container. (default "my-project-dev")
      --network string          Specify the network for docker to use.
      --no-watcher              Disable file watching, regardless of container environment variable settings.
  -p, --publish stringArray     Publish the container's ports to the host. The stack's exposed ports will always be published, but you can publish addition ports or override the host ports with this option.
  -P, --publish-all             Publish all exposed ports to random ports
      --stack-registry string   Specify the URL of the registry that hosts your stack images. (default "docker.io")
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody stack

Tools to help create and test Appsody stacks

### Synopsis

Tools to help create and test Appsody stacks

### Options

```
  -h, --help   help for stack
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI
* [appsody stack add-to-repo](#appsody-stack-add-to-repo)	 - Add stack information into a production Appsody repository
* [appsody stack create](#appsody-stack-create)	 - Create a new Appsody stack.
* [appsody stack lint](#appsody-stack-lint)	 - Check your stack structure.
* [appsody stack package](#appsody-stack-package)	 - Package your stack.
* [appsody stack validate](#appsody-stack-validate)	 - Run validation tests against your stack and its templates.

## appsody stack add-to-repo

Add stack information into a production Appsody repository

### Synopsis

Adds stack information into an Appsody repository. 
		
Adds stack information to a new or existing Appsody repository, specified by the <repo-name> argument. This enables you to share your stack with others.

The updated repository index file is created in  ~/.appsody/stacks/dev.local directory.

```
appsody stack add-to-repo <repo-name> [flags]
```

### Examples

```
  appsody stack add-to-repo incubator
  Creates a new repository index file for the incubator repository, setting the template URLs to begin with a default URL of https://github.com/appsody/stacks/releases/latest/download/

  appsody stack add-to-repo myrepository --release-url https://github.com/mygitorg/myrepository/releases/latest/download/
  Create a new index file for the myrepository repository, setting the template URLs to begin with https://github.com/mygitorg/myrepository/releases/latest/download/

  appsody stack add-to-repo myrepository --release-url https://github.com/appsody/stacks/releases/latest/download/ --use-local-cache
  Use an existing index for the myrepository repository or create it if it doesnt exist, setting the template URLs to begin with https://github.com/mygitorg/myrepository/releases/latest/download/
```

### Options

```
  -h, --help                 help for add-to-repo
      --release-url string   URL to use within the repository to access the stack assets (default "https://github.com/appsody/stacks/releases/download/")
      --use-local-cache      Whether to use a local file if exists or create a new file
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody stack](#appsody-stack)	 - Tools to help create and test Appsody stacks

## appsody stack create

Create a new Appsody stack.

### Synopsis

Create a new Appsody stack, called <name>, in the current directory. You can use this stack as a starting point for developing your own Appsody stack.

By default, the new stack is based on the example stack: samples/sample-stack. If you want to use a different stack as the basis for your new stack, use the copy flag to specify the stack you want to use as the starting point. You can use 'appsody list' to see the available stacks.

The stack name must start with a lowercase letter, and can contain only lowercase letters, numbers, or dashes, and cannot end with a dash. The stack name cannot exceed 128 characters.

```
appsody stack create <name> [flags]
```

### Examples

```
  appsody stack create my-stack  
  Creates a stack called my-stack, based on the example stack “samples/sample-stack”.

  appsody stack create my-stack --copy incubator/nodejs-express  
  Creates a stack called my-stack, based on the Node.js Express stack.
```

### Options

```
      --copy string   Copy the specified stack. The format is <repository>/<stack> (default "samples/sample-stack")
  -h, --help          help for create
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody stack](#appsody-stack)	 - Tools to help create and test Appsody stacks

## appsody stack lint

Check your stack structure.

### Synopsis

Check that the structure of your stack is valid. Error messages indicate critical issues in your stack structure, such as missing files, directories, or stack variables. Warning messages suggest optional stack enhancements.

Run this command from the root directory of your stack, or specify the path to your stack.

```
appsody stack lint [flags]
```

### Examples

```
  appsody stack lint
  Checks the structure of the stack in the current directory"
		
  appsody stack lint path/to/my-stack
  Checks the structure of the stack "my-stack" in the path "path/to/my-stack"
```

### Options

```
  -h, --help   help for lint
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody stack](#appsody-stack)	 - Tools to help create and test Appsody stacks

## appsody stack package

Package your stack.

### Synopsis

Package your stack in a local Appsody development environment. You must run this command from the root directory of your stack.

The packaging process builds the stack image, generates the "tar.gz" archive files for each template, and adds your stack to the "dev.local" repository in your Appsody configuration. You can see the list of your packaged stacks by running 'appsody list dev.local'.

```
appsody stack package [flags]
```

### Examples

```
  appsody stack package
  Packages the stack in the current directory, tags the built image with the "dev.local" namespace, and adds the stack to the "dev.local" repository.
  
  appsody stack package --image-namespace my-namespace
  Packages the stack in the current directory, tags the built image with the "my-namespace" namespace, and adds the stack to the "dev.local" repository.
```

### Options

```
  -h, --help                     help for package
      --image-namespace string   Namespace that the images will be created using (default is dev.local) (default "dev.local")
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody stack](#appsody-stack)	 - Tools to help create and test Appsody stacks

## appsody stack validate

Run validation tests against your stack and its templates.

### Synopsis

Run validation tests against your stack and its templates, in your local Appsody development environment. 
		
Runs the following validation tests against the stack and its templates:
  * appsody stack lint
  * appsody stack package
  * appsody init 
  * appsody run 
  * appsody test 
  * appsody build

```
appsody stack validate [flags]
```

### Options

```
  -h, --help                     help for validate
      --image-namespace string   Namespace used for creating the images (default "dev.local")
      --no-lint                  Skips running appsody stack lint
      --no-package               Skips running appsody stack package
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody stack](#appsody-stack)	 - Tools to help create and test Appsody stacks

## appsody stop

Stop the local, running Appsody container.

### Synopsis

Stop the local, running Appsody container for your project.

By default, the command stops the Appsody container that was launched from the project in your current working directory. 
To see a list of all your running Appsody containers, run the command 'appsody ps'.

```
appsody stop [flags]
```

### Examples

```
  appsody stop
  Stops the running Appsody container launched by the project in your current working directory.
  
  appsody stop --name nodejs-express-dev
  Stops the running Appsody container with the name "nodejs-express-dev".
```

### Options

```
  -h, --help          help for stop
      --name string   Assign a name to your development container. (default "my-project-dev")
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody test

Test your project in the local Appsody environment.

### Synopsis

Run the local Appsody environment, starting a container-based, continuous build environment for your project, and running the test suite each time a file changes.
		
Run this command from the root directory of your Appsody project.

```
appsody test [flags]
```

### Examples

```
  appsody test
  Runs the tests for your Appsody project.
		
  appsody test --no-watcher
  Runs the tests for your Appsody project without monitoring your project files for changes. The command completes after the tests are run once.
```

### Options

```
      --deps-volume string      Docker volume to use for dependencies. Mounts to APPSODY_DEPS dir. (default "my-project-deps")
      --docker-options string   Specify the docker run options to use.  Value must be in "". The following Docker options are not supported:  '--help','-p','--publish-all','-P','-u','-—user','-—name','-—network','-t','-—tty,'—rm','—entrypoint','-v','—volume'.
  -h, --help                    help for test
  -i, --interactive             Attach STDIN to the container for interactive TTY mode
      --name string             Assign a name to your development container. (default "my-project-dev")
      --network string          Specify the network for docker to use.
      --no-watcher              Disable file watching, regardless of container environment variable settings.
  -p, --publish stringArray     Publish the container's ports to the host. The stack's exposed ports will always be published, but you can publish addition ports or override the host ports with this option.
  -P, --publish-all             Publish all exposed ports to random ports
      --stack-registry string   Specify the URL of the registry that hosts your stack images. (default "docker.io")
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

## appsody version

Show the version of the Appsody CLI.

### Synopsis

Show the version of the Appsody CLI that is currently in use.

```
appsody version [flags]
```

### Options

```
  -h, --help   help for version
```

### Options inherited from parent commands

```
      --config string   config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun          Turns on dry run mode
  -v, --verbose         Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody](#appsody)	 - Appsody CLI

