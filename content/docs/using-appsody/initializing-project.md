---
title: Initializing Appsody Projects
---

# Initializing Appsody Projects

The easiest way to initialize an Appsody project is to start a new source code project from a stack template. However, you can also configure an existing source code project to use an appropriate Appsody stack.

## Creating a new project

The first step to creating a new project is to create an empty directory and give your project a name. You might want to place the project directory next to your other source code projects or your IDE workspace. For example:

```
cd /path/to/your/project/workspace
mkdir my-project
cd my-project
```
Alternatively, you could clone an empty Git repository or create an empty project in an IDE, then navigate to that directory in the terminal. Appsody is tolerant of some hidden files in the project directory, such as .git, .project, or .settings files. The `appsody init <repo>/<stack> <template>` command won't overwrite files without the `--overwrite` option.

Next, choose a stack. Use `appsody list` to view the available stacks.

Here is an example of the output produced by the `appsody list` command:
```
$ appsody list

REPO      	    ID               	        VERSION  	TEMPLATES        	DESCRIPTION
incubator    	java-openliberty         	0.2.2    	*default         	Open Liberty & OpenJ9 using Maven          
incubator	    java-spring-boot2	        0.3.26    	*default, kotlin 	Spring Boot using OpenJ9 and Maven
incubator	    nodejs           	        0.3.4    	*simple          	Runtime for Node.js applications
incubator	    nodejs-express   	        0.4.4   	*simple, scaffold	Express web framework for Node.js
incubator	    swift            	        0.2.5    	*simple          	Runtime for Swift applications
experimental	java-spring-boot2-liberty	0.1.11    	*default 	        Spring Boot using OpenJ9, Maven and OpenLiberty
experimental	nodejs-functions         	0.2.0    	*simple  	        Serverless runtime for Node.js functions
experimental	quarkus                  	0.2.3    	*default 	        Quarkus runtime for running Java applications

```
You can limit the `appsody list` output by specifying a `repository name` as shown below:
```
$ appsody list incubator

REPO      	  ID               	     VERSION  	TEMPLATES        	DESCRIPTION
incubator     java-openliberty       0.2.2    	*default         	Open Liberty & OpenJ9 using Maven          
incubator	  java-spring-boot2	     0.3.26    	*default, kotlin 	Spring Boot using OpenJ9 and Maven
incubator	  nodejs           	     0.3.4    	*simple          	Runtime for Node.js applications
incubator	  nodejs-express   	     0.4.4   	*simple, scaffold	Express web framework for Node.js
incubator	  swift            	     0.2.5    	*simple          	Runtime for Swift applications

```

When you have chosen your stack, run `appsody init <repository-name>/<stack> <template>` for the repository and stack of your choice. This command downloads the default project template for the stack and initializes Appsody for local development.  If you elect to only specify the stack, e.g. `appsody init <stack>`, the default repository is assumed.  If you do not specify a template, the default template is assumed.

You can specify an `application-name:` field in the Appsody configuration file `.appsody-config.yaml` by using the `--application-name` flag. The Appsody configuration file does not contain an application name entry by default. If added, this field is used by downstream tools such as the Appsody Operator.

You can specify the `--stack-registry` flag to override the default registry URL that hosts your stack images, from the default value “docker.io”. Subsequent calls to Appsody CLI commands, such as `appsody run`, then use this registry URL.

Now you have a fully functional Appsody project. For more details on running the project, see [Local Development](/docs/using-appsody/local-development).


## Configuring an existing project

You can configure an existing project to use Appsody, which typically involves adjusting the project structure.

First, choose a stack that closely resembles your existing project. Use `appsody list` to view the available stacks, and review the [documentation](https://github.com/appsody/stacks/tree/master/incubator) for the appropriate stack.

Next, from your project directory, run `appsody init <stack> none` to initialize Appsody without using a template on the existing project.

You might need to update the structure of your project so that the stack can find and run your code. Because each stack has a different structure, refer to the documentation for your stack and review the project template for guidance.

When you have updated the project structure, start the development container to verify that it is working with `appsody run`. For more details on running the project, see [Local Development](/docs/using-appsody/local-development).
