---
title: Stack lifecycle
---

# Stack lifecycle

## Stack requirements during initialization

Initialization occurs when a user issues an `appsody init` command in a new empty directory, in order to configure a new project. It might seem odd that there are any requirements on the stack for initialization, but since the goal is for the stack image to encapsulate *all* aspects of the stack, the configuration steps required (which are likely to be technology specific) are indeed contained within it. The following is a summary of what happens during initialization:

* Appsody CLI finds the yaml entry for the stack in the respective repo
* Appsody CLI downloads the referenced tar file for the specified template to be used as a basis for the user application, and extracts the contents. This creates the directory structure within the current directory, including the `.appsody-config.yaml` file that specifies the stack image itself (which is usually stored in a Docker repository)
* Appsody CLI downloads this stack image
* Appsody CLI inspects the stack image to see if it has an initialization file within it called `appsody-init.sh` (or `appsody-init.bat` if running on Windows). If this file exists, it is executed to set up any further configuration. Note that it not recommended that this initialization installs new packages or modules in user space of the local machine. Any dependencies should be handled by ensuring this happens during run and build, listed below.

## Stack operation during local development

During local development, when the stack image is run, it must build the appropriate local container runtime configuration. This will include:

* Mounting into the image, the directories from the user space of the local machine that contains the user application, as well as the Appsody controller and any dependencies
* Enabling the software dependencies defined by the image
* Setting up any environment variables required
* Passing control to the Appsody controller with a command to execute (e.g. `run`), which the controller will action, and then wait for further commands to be sent to it from the Appsody CLI

You will note that during local development, Docker does not run the user application on startup - it is the Appsody controller that is in charge (and will execute the user application when required). This is achieved with settings in the Dockerfile for the stack itself (`Dockerfile-stack`), which are described next.

### Mounting the correct directories into the image

There are three types of volume/mounts used by Appsody:

1. Volume mounts specified in the `APPSODY_MOUNTS` Docker variable  
These will be processed by the Appsody CLI. The primary use of this is to mount the directory holding the user application into the container, so that the appsody-controller can have access to your application (and run it inside the container). For example:

   ```bash
   ENV APPSODY_MOUNTS=/:/project/userapp
   ```

   would map the current directory (where the init was performed), into `/project/userapp` in the container file system.

2. Dependency directory volume  
This creates a volume used to cache, for efficiency, the combined dependencies of the stack components and the user application between sequential runs of the application during local development. It is not mounted into the user directory, since access to this is not required outside of the Docker environment. This is specified via the Docker variable `APPSODY_DEPS`. For example:

   ```bash
   ENV APPSODY_DEPS=/project/deps
   ```

   would cause the creation of a volume to be created and mounted into the container file systems at `/project/deps`.

3. Appsody controller mount  
The Appsody CLI automatically creates the Appsody controller mount, as it knows which version of the controller needs to be used.  When you run the `appsody run`, `appsody debug`, or `appsody test` commands, the Appsody CLI creates a Docker volume, if it doesn't exist, named `appsody-controller-<version>`, and installs appropriate Appsody controller, as indicated by `<version>`. The volume is then mounted at `/.appsody` in the container file system.

As the Appsody CLI is responsible for installing the appropriate version of the Appsody controller, the stack developer doesn't need to be aware of the Appsody controller version.

### Enabling the software dependencies

There are two types of dependencies that need to be handled by the stack.

1. Dependencies required for the technology components included in the stack  
For efficiency, these only need to be installed when the image is launched. Hence, these are typically encoded as regular Docker commands. For example, in the python-flask stack, these dependencies are defined in a `Pipfile` in the `image/project` directory, and are processed by the following Docker commands:

   ```bash
   RUN pipenv lock -r > requirements.txt
   RUN python -m pip install -r requirements.txt -t /project/deps
   ```

2. Dependencies added by the developer for their application  
Since the developer might add these at any stage, these are generated each time an Appsody command is executed by the controller. This is achieved by setting the `ENV APPSODY_PREP` Docker variable, which the Appsody controller will execute. For example, again in the python-flask stack, these dependencies are defined in the user directory (created by the template) and are referenced by:

   ```bash
   ENV APPSODY_PREP="cd /project/userapp; pipenv lock -r > requirements.txt; python -m pip install -r requirements.txt -t /project/deps"
   ```

   [Note that in older stacks this variable was called `APPSODY_INSTALL`, which has since been deprecated]

### Setting up any environment variables required

Any environment variables required by the technology in the stack itself are typically set in the `Dockerfile-stack` file, using the regular Docker `ENV` command.

### Passing control to the Appsody controller to run the user application

When an `appsody run` command is issued, the stack image is launched in the local Docker environment of the user machine and the appsody-controller is set as the entrypoint. The controller is also passed the Appsody command being executed (`run` in this case). The Appsody controller processes the Appsody specific Docker variables, which determine how the user application is run and managed. These Appsody specific variables are described in more detail in [Appsody Environment Variables](/content/docs/stacks/environment-variables.md), although the most important ones for the run case are as follows (with examples from the python-flask stack):

```bash
ENV APPSODY_RUN="python -m flask run --host=0.0.0.0 --port=8080"
```

which specifies the command to be run by the Appsody controller to start the user application, and:

```bash
ENV APPSODY_WATCH_DIR=/project/userapp
```

which specifies the directory that the Appsody controller watches for changes, so that the user application can be automatically relaunched during local development. Since relaunching may require addition steps, the variable `APPSODY_RUN_ON_CHANGE` specifies the command that will be run to relaunch the application.

The Appsody controller remains running during local development, and is terminated with the `appsody stop` command (or by simply killing the running Appsody CLI process).

## Stack operation during build and deploy

Build and deploy is designed to package up both the new user application and the technology components of the stack into a single Docker image that can be deployed and run in any Docker environment (often a local or public Kubernetes cluster). From a stack point of view, the key requirement is to include a Dockerfile which can build this combined image. This is the `Dockerfile` in the `project` directory in the stack source (as opposed to the `Dockerfile-stack` file in the `image` directory, which is used when you are creating the original stack image).

The steps undertaken when the `appsody build` command is run are:

* Appsody CLI extracts the contents of the stack into a local directory (by default `~/.appsody/extract`) along with the user application.
* Appsody CLI then runs, effectively, a Docker build using the `Dockerfile` in the `project` directory of this extracted structure, resulting in a Docker image for the combined application.

The `Dockerfile` needs to build the dependencies for both the stack technology components as well as the user application, and set the entrypoint (or `CMD`) to an appropriate entrypoint for the user application. The Appsody controller is not involved in the final application image.


## Maintaining a separate repository
In addition to the main Appsody stacks repository, you can maintain your own set of stacks. This is useful for developing stacks and separating sets of stacks for different uses.

By default you have access to the `incubator` repository:
```
$ appsody repo list
NAME      	    URL
*incubator	    https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml
experimental    https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml
```
A repository is defined by an `index.yaml` file. This file lists all the stacks and templates that are available within a repository. You can modify the index files within your own repositories, to say which stacks and templates you want to be available. See the `incubator` [index](https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml) file for an example.

Each template section must include a link to its `.tar.gz` file. This file is used by `appsody init` to initialize an Appsody project.

You can add your repository by running:
```
appsody repo add <name> <index-url>
```
For example:
```
appsody repo add my-repo file:///Users/foo/index.yaml

appsody repo list
NAME      	   URL
*incubator	   https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml
experimental   https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml
my-repo        file:///Users/foo/index.yaml
```

Now you can access the stacks in your repo by specifying the repository name when you initialize your project:
```
appsody init my-repo/<stack-name>
```
