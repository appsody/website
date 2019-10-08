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
Alternatively, you could clone an empty git repository or create an empty project in an IDE, then navigate to that directory in the terminal. Appsody is tolerant of some hidden files in the project directory, such as .git, .project, or .settings files. The `appsody init <repo>/<stack> <template>` command won't overwrite files without the `--overwrite` option.

Next, choose a stack. Use `appsody list` to view the available stacks.

Here is an example of the output produced by the `appsody list` command:
```
$ appsody list

REPO      	    ID               	        VERSION  	TEMPLATES        	DESCRIPTION
appsodyhub	    java-microprofile	        0.2.6    	*default         	Eclipse MicroProfile using OpenJ9 and Maven
appsodyhub	    java-spring-boot2	        0.3.2    	*default, kotlin 	Spring Boot using OpenJ9 and Maven
appsodyhub	    nodejs           	        0.2.3    	*simple          	Runtime for Node.js applications
appsodyhub	    nodejs-express   	        0.2.3    	*simple, scaffold	Express web framework for Node.js
appsodyhub	    swift            	        0.1.2    	*simple          	Runtime for Swift applications
experimental	java-spring-boot2-liberty	0.1.0    	*default 	        Spring Boot using OpenJ9, Maven and OpenLiberty
experimental	nodejs-functions         	0.1.1    	*simple  	        Serverless runtime for Node.js functions
experimental	quarkus                  	0.1.1    	*default 	        Quarkus runtime for running Java applications

```
You can limit the `appsody list` output by specifying a `repository name` as shown below:
```
$ appsody list appsodyhub

REPO      	ID               	VERSION  	TEMPLATES        	DESCRIPTION
appsodyhub	java-microprofile	0.2.6    	*default         	Eclipse MicroProfile using OpenJ9 and Maven
appsodyhub	java-spring-boot2	0.3.2    	*default, kotlin 	Spring Boot using OpenJ9 and Maven
appsodyhub	nodejs           	0.2.3    	*simple          	Runtime for Node.js applications
appsodyhub	nodejs-express   	0.2.3    	*simple, scaffold	Express web framework for Node.js
appsodyhub	swift            	0.1.2    	*simple          	Runtime for Swift applications

```

When you have chosen your stack, run `appsody init <repository-name>/<stack> <template>` for the repository and stack of your choice. This command downloads the default project template for the stack and initializes Appsody for local development.  If you elect to only specify the stack, e.g. `appsody init <stack>`, the default repository is assumed.  If you do not specify a template, the default template is assumed.

Now you have a fully functional Appsody project. For more details on running the project, see [Local Development](/content/docs/using-appsody/local-development.md).


## Configuring an existing project

You can configure an existing project to use Appsody, which typically involves adjusting the project structure.

First, choose a stack that closely resembles your existing project. Use `appsody list` to view the available stacks, and review the [documentation](https://github.com/appsody/stacks/tree/master/incubator) for the appropriate stack.

Next, from your project directory, run `appsody init <stack> none` to initialize Appsody without using a template on the existing project.

You might need to update the structure of your project so that the stack can find and run your code. Because each stack has a different structure, refer to the documentation for your stack and review the project template for guidance.

When you have updated the project structure, start the development container to verify that it is working with `appsody run`. For more details on running the project, see [Local Development](/content/docs/using-appsody/local-development.md).
