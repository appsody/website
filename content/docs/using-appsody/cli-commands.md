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

* [appsody build](#appsody-build)	 - Locally build a docker image of your appsody project
* [appsody completion](#appsody-completion)	 - Generates bash tab completions
* [appsody debug](#appsody-debug)	 - Run the local Appsody environment in debug mode
* [appsody deploy](#appsody-deploy)	 - Build and deploy your Appsody project to your Kubernetes cluster
* [appsody extract](#appsody-extract)	 - Extract the stack and your Appsody project to a local directory
* [appsody init](#appsody-init)	 - Initialize an Appsody project with a stack and template app
* [appsody list](#appsody-list)	 - List the Appsody stacks available to init
* [appsody operator](#appsody-operator)	 - Install or uninstall the Appsody operator from your Kubernetes cluster.
* [appsody ps](#appsody-ps)	 - List the appsody containers running in the local docker environment
* [appsody repo](#appsody-repo)	 - Manage your Appsody repositories
* [appsody run](#appsody-run)	 - Run the local Appsody environment for your project
* [appsody stack](#appsody-stack)	 - Tools to help create and test Appsody stacks
* [appsody stop](#appsody-stop)	 - Stops the local Appsody docker container for your project
* [appsody test](#appsody-test)	 - Test your project in the local Appsody environment
* [appsody version](#appsody-version)	 - Show Appsody CLI version

## appsody build

Locally build a docker image of your appsody project

### Synopsis

This allows you to build a local Docker image from your Appsody project. Extract is run before the docker build.

```
appsody build [flags]
```

### Options

```
      --docker-options string   Specify the docker build options to use.  Value must be in "".
  -h, --help                    help for build
      --push                    Push the Docker image to the image repository.
      --push-url string         The remote registry to push the image to.
  -t, --tag string              Docker image name and optionally a tag in the 'name:tag' format
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

Run the local Appsody environment in debug mode

### Synopsis

This starts a docker based continuous build environment for your project with debugging enabled.

```
appsody debug [flags]
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
  -f, --file string        The file name to use for the deployment configuration. (default "app-deploy.yaml")
      --force              Force the reuse of the deployment configuration file if one exists.
      --generate-only      Only generate the deployment configuration file. Do not deploy the project.
  -h, --help               help for deploy
      --knative            Deploy as a Knative Service
  -n, --namespace string   Target namespace in your Kubernetes cluster (default "default")
      --pull-url string    Remote repository to pull image from.
      --push               Push this image to an external Docker registry. Assumes that you have previously successfully done docker login
      --push-url string    Remote repository to push image to.
  -t, --tag string         Docker image name and optionally a tag in the 'name:tag' format
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
      --config string      config file (default is $HOME/.appsody/.appsody.yaml)
      --dryrun             Turns on dry run mode
  -f, --file string        The file name to use for the deployment configuration. (default "app-deploy.yaml")
      --force              Force the reuse of the deployment configuration file if one exists.
      --generate-only      Only generate the deployment configuration file. Do not deploy the project.
      --knative            Deploy as a Knative Service
  -n, --namespace string   Target namespace in your Kubernetes cluster (default "default")
      --pull-url string    Remote repository to pull image from.
      --push               Push this image to an external Docker registry. Assumes that you have previously successfully done docker login
      --push-url string    Remote repository to push image to.
  -t, --tag string         Docker image name and optionally a tag in the 'name:tag' format
  -v, --verbose            Turns on debug output and logging to a file in $HOME/.appsody/logs
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

Initialize an Appsody project with a stack and template app

### Synopsis

This creates a new Appsody project in a local directory or sets up the local dev environment of an existing Appsody project.

If the [repository] is not specified the default repository will be used. If no [template] is specified, the default template will be used.
With the [stack], [repository]/[stack], [stack] [template] or [repository]/[stack] [template] arguments, this command will setup a new Appsody project. It will create an Appsody stack config file, unzip a template app, and run the stack init script to setup the local dev environment. It is typically run on an empty directory and may fail
if files already exist. See the --overwrite and --no-template options for more details.
Use 'appsody list' to see the available stack options.

If keyword "none" is specified instead of a [template], the project will be initialized to use Appsody, and no template will be provided.

Without the [stack] argument, this command must be run on an existing Appsody project and will only run the stack init script to
setup the local dev environment.

```
appsody init [stack] or [repository]/[stack] [template] [flags]
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

List the Appsody stacks available to init

### Synopsis

This command lists all the stacks available in your repositories. If you omit the  optional [repository] parameter, the stacks for all the repositories are listed. If you specify the repository name [repository], only the stacks in that repository will be listed.

```
appsody list [repository] [flags]
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
* [appsody repo add](#appsody-repo-add)	 - Add an Appsody repository
* [appsody repo list](#appsody-repo-list)	 - List configured Appsody repositories
* [appsody repo remove](#appsody-repo-remove)	 - Remove a configured Appsody repository
* [appsody repo set-default](#appsody-repo-set-default)	 - Set desired default repository

## appsody repo add

Add an Appsody repository

### Synopsis

Add an Appsody repository

```
appsody repo add <name> <url> [flags]
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

List configured Appsody repositories

### Synopsis

List configured Appsody repositories. An asterisk denotes the default repository.

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

Remove a configured Appsody repository

### Synopsis

Remove a configured Appsody repository

```
appsody repo remove <name> [flags]
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

Set desired default repository

### Synopsis

Set desired default repository

```
appsody repo set-default <name> [flags]
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
* [appsody stack create](#appsody-stack-create)	 - Create a new Appsody stack.
* [appsody stack lint](#appsody-stack-lint)	 - Lint your stack to verify that it conforms to the structure of an Appsody stack
* [appsody stack package](#appsody-stack-package)	 - Package a stack in the local Appsody environment
* [appsody stack validate](#appsody-stack-validate)	 - Run validation tests against a stack in the local Appsody environment

## appsody stack create

Create a new Appsody stack.

### Synopsis

Create a new Appsody stack, called <name>, in the current directory. You can use this stack as a starting point for developing your own Appsody stack.

By default, the new stack is based on the example stack: samples/sample-stack. If you want to use a different stack as the basis for your new stack, use the copy flag to specify the stack you want to use as the starting point. You can use 'appsody list' to see the available stacks.

Examples:
  appsody stack create my-stack
  Creates a stack called my-stack, based on the example stack “samples/sample-stack”.

  appsody stack create my-stack --copy incubator/nodejs-express
  Creates a stack called my-stack, based on the Node.js Express stack.

The stack name must start with a lowercase letter, and can contain only lowercase letters, numbers, or dashes, and cannot end with a dash. The stack name cannot exceed 128 characters.

```
appsody stack create <name> [flags]
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

Lint your stack to verify that it conforms to the structure of an Appsody stack

### Synopsis

This command will validate that your stack has the structure of an Appsody stack. It will inform you of files/directories
missing and warn you if your stack could be enhanced.

This command can be run from the base directory of your stack or you can supply a path to the stack as an argument.

```
appsody stack lint [flags]
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

Package a stack in the local Appsody environment

### Synopsis

This command is a tool for stack developers to package a stack from their local Appsody development environment. Once the stack is packaged it can then be tested via Appsody commands. The package command performs the following:
- Creates/updates an index file named "dev.local-index.yaml" and stores it in .appsody/stacks/dev.local
- Creates a tar.gz for each stack template and stores it in .appsody/stacks/dev.local
- Builds a Docker image named "dev.local/[stack name]:SNAPSHOT"
- Creates an Appsody repository named "dev.local"
- Adds/updates the "dev.local" repository of your Appsody configuration

```
appsody stack package [flags]
```

### Options

```
  -h, --help   help for package
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

Run validation tests against a stack in the local Appsody environment

### Synopsis

This command is a tool for stack developers to validate a stack from their local Appsody development environment. It performs the following against the stack:
- Runs the stack lint test. This can be turned off with the --no-lint flag
- Runs the stack package command. This can be turned off with the --no-package flag
- Runs the appsody init command
- Runs the appsody run command
- Runs the appsody test command
- Runs the appsody build command
- Provides a Passed/Failed status and summary of the above operations

```
appsody stack validate [flags]
```

### Options

```
  -h, --help         help for validate
      --no-lint      Skips running appsody stack lint
      --no-package   Skips running appsody stack package
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

