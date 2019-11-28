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
* [appsody deploy](#appsody-deploy)	 - Build and deploy your Appsody project to your Kubernetes cluster
* [appsody extract](#appsody-extract)	 - Extract the stack and your Appsody project to a local directory
* [appsody init](#appsody-init)	 - Initialize an Appsody project.
* [appsody list](#appsody-list)	 - List the available Appsody stacks.
* [appsody operator](#appsody-operator)	 - Install or uninstall the Appsody operator from your Kubernetes cluster.
* [appsody ps](#appsody-ps)	 - List the appsody containers running in the local docker environment
* [appsody repo](#appsody-repo)	 - Manage your Appsody repositories
* [appsody run](#appsody-run)	 - Run the local Appsody environment for your project
* [appsody stack](#appsody-stack)	 - Tools to help create and test Appsody stacks
* [appsody stop](#appsody-stop)	 - Stops the local Appsody docker container for your project
* [appsody test](#appsody-test)	 - Test your project in the local Appsody environment
* [appsody version](#appsody-version)	 - Show Appsody CLI version

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
      --docker-options string    Specify the Docker build options to use. Value must be in "".
  -f, --file string              The file name to use for the deployment configuration. (default "app-deploy.yaml")
  -h, --help                     help for build
      --knative                  Deploy as a Knative Service
      --pull-url string          Remote repository to pull image from.
      --push                     Push the container image to the image repository.
      --push-url string          The remote registry to push the image to. This will also trigger a push if the --push flag is not specified.
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
      --docker-options string   Specify the docker run options to use.  Value must be in "".
  -h, --help                    help for debug
  -i, --interactive             Attach STDIN to the container for interactive TTY mode
      --name string             Assign a name to your development container. (default "my-project-dev")
      --network string          Specify the network for docker to use.
      --no-watcher              Disable file watching, regardless of container environment variable settings.
  -p, --publish stringArray     Publish the container's ports to the host. The stack's exposed ports will always be published, but you can publish addition ports or override the host ports with this option.
  -P, --publish-all             Publish all exposed ports to random ports
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

Build and deploy your Appsody project to your Kubernetes cluster

### Synopsis

This command extracts the code from your project, builds a local Docker image for deployment,
generates a deployment manifest (yaml) file if one is not present, and uses it to deploy your image to a Kubernetes cluster, either via the Appsody operator or as a Knative service.

```
appsody deploy [flags]
```

### Options

```
      --buildah                  Build project using buildah primitives instead of docker.
      --buildah-options string   Specify the buildah build options to use. Value must be in "".
      --docker-options string    Specify the docker build options to use. Value must be in "".
  -f, --file string              The file name to use for the deployment configuration. (default "app-deploy.yaml")
      --force                    DEPRECATED - Force the reuse of the deployment configuration file if one exists.
      --generate-only            DEPRECATED - Only generate the deployment configuration file. Do not deploy the project.
  -h, --help                     help for deploy
      --knative                  Deploy as a Knative Service
  -n, --namespace string         Target namespace in your Kubernetes cluster (default "default")
      --pull-url string          Remote repository to pull image from.
      --push                     Push this image to an external Docker registry. Assumes that you have previously successfully done docker login
      --push-url string          Remote repository to push image to.  This will also trigger a push if the --push flag is not specified.
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
* [appsody deploy delete](#appsody-deploy-delete)	 - Delete your deployed Appsody project from a Kubernetes cluster

## appsody deploy delete

Delete your deployed Appsody project from a Kubernetes cluster

### Synopsis

This command deletes your deployed Appsody project from the configured Kubernetes cluster using your existing deployment manifest.

```
appsody deploy delete [flags]
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
      --docker-options string    Specify the docker build options to use. Value must be in "".
      --dryrun                   Turns on dry run mode
  -f, --file string              The file name to use for the deployment configuration. (default "app-deploy.yaml")
      --force                    DEPRECATED - Force the reuse of the deployment configuration file if one exists.
      --generate-only            DEPRECATED - Only generate the deployment configuration file. Do not deploy the project.
      --knative                  Deploy as a Knative Service
  -n, --namespace string         Target namespace in your Kubernetes cluster (default "default")
      --pull-url string          Remote repository to pull image from.
      --push                     Push this image to an external Docker registry. Assumes that you have previously successfully done docker login
      --push-url string          Remote repository to push image to.  This will also trigger a push if the --push flag is not specified.
  -t, --tag string               Docker image name and optionally a tag in the 'name:tag' format
  -v, --verbose                  Turns on debug output and logging to a file in $HOME/.appsody/logs
```

### SEE ALSO

* [appsody deploy](#appsody-deploy)	 - Build and deploy your Appsody project to your Kubernetes cluster

## appsody extract

Extract the stack and your Appsody project to a local directory

### Synopsis

This copies the full project, stack plus app, into a local directory
in preparation to build the final container image.

```
appsody extract [flags]
```

### Options

```
      --buildah             Extract project using buildah primitives instead of docker.
  -h, --help                help for extract
      --name string         Assign a name to your development container. (default "my-project-extract")
      --target-dir string   Directory path to place the extracted files. This dir must not exist, it will be created.
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
* [appsody operator install](#appsody-operator-install)	 - Install the Appsody Operator into the configured Kubernetes cluster
* [appsody operator uninstall](#appsody-operator-uninstall)	 - Uninstall the Appsody Operator from the configured Kubernetes cluster

## appsody operator install

Install the Appsody Operator into the configured Kubernetes cluster

### Synopsis

Install the Appsody Operator into the configured Kubernetes cluster

```
appsody operator install [flags]
```

### Options

```
  -h, --help                help for install
      --watch-all           The operator will watch all namespaces.
  -w, --watchspace string   The namespace which the operator will watch.
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

Uninstall the Appsody Operator from the configured Kubernetes cluster

### Synopsis

Uninstall the Appsody Operator from the configured Kubernetes cluster

```
appsody operator uninstall [flags]
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

List the appsody containers running in the local docker environment

### Synopsis

This command lists all stack-based containers, that are currently running in the local docker envionment.

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
  appsody repo add my-local-repo file://path/to/my-local-repo.yaml
  Adds the "my-local-repo" repository, specified by the "file://path/to/my-local-repo.yaml" file to your list of repositories.
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

Run the local Appsody environment for your project

### Synopsis

This starts a docker based continuous build environment for your project.

```
appsody run [flags]
```

### Options

```
      --deps-volume string      Docker volume to use for dependencies. Mounts to APPSODY_DEPS dir. (default "my-project-deps")
      --docker-options string   Specify the docker run options to use.  Value must be in "".
  -h, --help                    help for run
  -i, --interactive             Attach STDIN to the container for interactive TTY mode
      --name string             Assign a name to your development container. (default "my-project-dev")
      --network string          Specify the network for docker to use.
      --no-watcher              Disable file watching, regardless of container environment variable settings.
  -p, --publish stringArray     Publish the container's ports to the host. The stack's exposed ports will always be published, but you can publish addition ports or override the host ports with this option.
  -P, --publish-all             Publish all exposed ports to random ports
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
* [appsody stack validate](#appsody-stack-validate)	 - Run validation tests against your stack.

## appsody stack add-to-repo

Add stack information into a production Appsody repository

### Synopsis

Adds stack information into an Appsody repository. 
		
Adds stack information to a new or existing Appsody repository, specified by the <repo-name/> argument. This enables you to share your stack with others.

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

Create a new Appsody stack, called <name/>, in the current directory. You can use this stack as a starting point for developing your own Appsody stack.

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

		Run this command from the base directory of your stack, or specify the path to your stack.

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

Run validation tests against your stack.

### Synopsis

Run validation tests against your stack, in your local Appsody development environment. 
		
Runs the following validation tests against the stack:
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
      --image-namespace string   Namespace that the images will be created using (default is dev.local) (default "dev.local")
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

Stops the local Appsody docker container for your project

### Synopsis

Stop the local Appsody docker container for your project.

Stops the docker container specified by the --name flag. 
If --name is not specified, the container name is determined from the current working directory (see default below).
To see a list of all your running docker containers, run the command "docker ps". The name is in the last column.

```
appsody stop [flags]
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

Test your project in the local Appsody environment

### Synopsis

This starts a docker container for your project and runs your test in it.

```
appsody test [flags]
```

### Options

```
      --deps-volume string      Docker volume to use for dependencies. Mounts to APPSODY_DEPS dir. (default "my-project-deps")
      --docker-options string   Specify the docker run options to use.  Value must be in "".
  -h, --help                    help for test
  -i, --interactive             Attach STDIN to the container for interactive TTY mode
      --name string             Assign a name to your development container. (default "my-project-dev")
      --network string          Specify the network for docker to use.
      --no-watcher              Disable file watching, regardless of container environment variable settings.
  -p, --publish stringArray     Publish the container's ports to the host. The stack's exposed ports will always be published, but you can publish addition ports or override the host ports with this option.
  -P, --publish-all             Publish all exposed ports to random ports
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

Show Appsody CLI version

### Synopsis

Show Appsody CLI version

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

