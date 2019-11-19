---
title: Stack structure and requirements
---

## The role of a stack in the development process

The fundamental goal of stacks is to simplify the life of the developer trying to build an application using a specific set of technologies or development pattern. As such, a stack is designed to support two ways of working:

1. **Local Development**  
During local development, the stack provides everything to enable the development of a new application on the local machine, with the application *always* being run in a (local) containerized Docker environment. The fact that application development uses containerization from the start (as opposed to development solely in the user space of the local machine) minimizes the chances of introducing subtle issues in the containerization process, and removes the need for a developer to install the core technology components that will underpin their application. Therefore, the requirements on the stack are to have all the dependencies for the particular technologies involved pre-built into the Docker image, and also to dynamically compliment these with whatever dependencies are added explicitly by the developer for their code. Local development consists of the Appsody CLI (hooked into a local IDE if required), communicating with a local Docker container that is running the application under development. Furthermore, local development is accelerated by enabling application code to be held on the local file system, whilst being mounted in the Docker container, so that a local change can automatically trigger a restart of the application.

2. **Build and Deploy**  
During build and deploy, the stack enables the Appsody CLI to build a self-contained Docker image that includes both the core technologies in the stack plus the application code that has been developed, along with the combined dependencies of both. The resulting image can then be deployed manually or programmatically to any platform that supports Docker images (such as a local or public Kubernetes cluster).

## Stack structure

A stack is designed to support both ways of working; local development, and build and deploy. Therefore, all stacks follow the same structure, which is shown here:

```bash
my-stack
├── README.md
├── stack.yaml
├── image/
|   ├── config/
|   |   └── app-deploy.yaml
|   ├── project/
|   |   ├── [files that provide the technology components of the stack]
|   |   └── Dockerfile
│   ├── Dockerfile-stack
|   └── LICENSE
└── templates/
    ├── my-template-1/
    |       └── [example files as a starter for the application, e.g. "hello world"]
    └── my-template-2/
            └── [example files as a starter for a more complex application]

```

The stack structure is processed when you build a stack, to generate a Docker image for the stack, along with tar files of each of the templates, which can then all be stored/referenced in a local or public Appsody repository. Refer to the section on [Packaging Stacks](/content/docs/stacks/package.md) for more details. The Appsody CLI can then access such a repo, to use the stack to initiate local development.

As described earlier, the stack (along with the Appsody software) has different responsibilities, depending whether you are in local development, or build and deploy. To understand how the stack operates, we will delve into each of these scenarios separately, including the initial work that is required to initialize the project. One of things that can initially cause confusion when looking at the source of an Appsody stack is that there are two Dockerfiles. The Dockerfiles are independent of each other - one is used to build the initial stack image (`Dockerfile-stack`) and one to build the final application image (`Dockerfile`). These are both described as we examine the scenarios.

## Stack requirements during initialization

Initialization occurs when a user issues an `appsody init` command in a new empty directory, in order to configure a new project. It might seem odd that there are any requirements on the stack for initialization, but since the goal is for the stack image to encapsulate *all* aspects of the stack, the configuration steps required (which are likely to be technology specific) are indeed contained within it. The following is a summary of what happens during initialization:

* Appsody CLI finds the yaml entry for the stack in the respective repo
* Appsody CLI downloads the referenced tar file for the specified template to be used as a basis for the user application, and extracts the contents. This creates the directory structure within the current directory, including the `.appsody-config.yaml` file that specifies the stack image itself (which is usually stored in a Docker repository)
* Appsody CLI downloads this stack image
* Appsody CLI inspects the stack image to see if it has an initialization file within it called `appsody-init.sh` (or `appsody-init.bat` if running on Windows). If this file does it exist, it is executed to set up any further configuration. Note that it not recommended that this initialization installs new packages or modules in user space of the local machine. Any dependencies should be handled by ensuring this happens during run and build, listed below.

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

   > Note that in older stacks this variable was called `APPSODY_INSTALL`, which has since been deprecated

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

## Summary of files within the stack source and user directory structure

### Stack.yaml

The `stack.yaml` file in the top level directory defines the different attributes of the stack and which template the stack should use by default. See the following example:

```bash
name: Sample Application Stack   # concise one line name for the stack
version: 0.1.0                   # version of the stack
description: sample stack to help creation of more Appsody stacks # free form text explaining more about the capabilities of this stack and various templates
license: Apache-2.0              # license for the stack
language: nodejs                 # programming language the stack uses
maintainers:                     # list of maintainer(s) details
  - name: John Smith
    email: example@example.com
    github-id: jsmith
default-template: my-template-1  # name of default template
```

### README

The top level directory must contain a `README.md` markdown file that describes the contents of the stack and how it should be used.

### LICENSE

The `image` directory must contain a `LICENSE` file.

### app-deploy.yaml

The `app-deploy.yaml` is the configuration file for deploying an Appsody project using the Appsody Operator. For more information about specifics, see [Appsody Operator User Guide](https://github.com/appsody/appsody-operator/blob/master/doc/user-guide.md).

### Dockerfile-stack

The `Dockerfile-stack` file in the `image` directory defines the foundation stack image, and a set of environment variables that specify the desired behaviour during the local development cycle. It also defines what is exposed from the host machine to the container during local development.

Environment variables can be set to alter the behaviour of the CLI and controller (see [Appsody Environment Variables](/content/docs/stacks/environment-variables.md)).

### Dockerfile

The `Dockerfile` in the `image/project` directory defines the final image that will created by the `appsody build` command, which needs to contain the content from both the stack itself along with the user application (typically modified from one of the templates). This is used to run the application as a whole, outside of Appsody CLI control.

### Templates

A template is a pre-configured starter application that is ready to use with the particular stack image. It has access to all the dependencies supplied by that image and is able to include new functionality and extra dependencies to enhance the image. A stack can have multiple templates, perhaps representing different classes of starter applications using the stack technology components.

### .appsody-config.yaml

The `.appsody-config.yaml` is not part of the the source structure. It is generated as part of the stack building process and will be placed in the user directory by the `appsody init` command. This file specifies the stack image that is used and can be overridden for testing purposes to point to a locally built stack.

For example, the following specifies that the template uses the python-flask image:

```bash
stack: python-flask:0.1
```
