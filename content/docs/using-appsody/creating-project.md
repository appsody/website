---
title: Creating Projects
section: Using Appsody
path: /docs/using-appsody/creating-project
---

# Creating Appsody Projects

## New Project from Template
The easiest way to create an Appsody project is to start a new project from a stack template. 

First, give your project a name and create an empty directory for your new project. You may want to place the project directory next to your other source code projects or your IDE workspace.
```
cd /path/to/your/project/workspace
mkdir my-project
cd my-project
```
Alternatively, you could clone an empty git repository or create an empty project in an IDE, then navigate to that directory in the terminal. Appsody is tolerant of some hidden files in the project directory, such as .git, .project, .settings, etc. The `appsody init <stack>` command won't overwrite files without the `--overwrite` option.

Next, choose a stack. Use `appsody list` to view the available stacks.
```
$ appsody list

NAME             	VERSION	DESCRIPTION                               
nodejs           	0.2.0  	Node.js Runtime                           
nodejs-express   	0.2.0  	Express web framework for Node.js         
java-microprofile	0.2.0  	Microprofile using Adopt OpenJDK and Maven
java-spring-boot2	0.2.0  	Spring Boot using IBM Java SDK and Maven
```

Then, run `appsody init <stack>` for the stack of your choice. This will download the default project template for the stack and initialize Appsody for your local development.

Now you have a fully functional Appsody project. See the [Local Development](/docs/using-appsody/local-development.md) document for more details on running the project.


## Existing Project to Appsody
You can configure an existing project to use Appsody, however you may have to manually adjust the project structure.

First, choose a stack that closely resembles your existing project. Use `appsody list` to view the available stacks, and review their documentation at <https://github.com/appsody/stacks/tree/master/incubator>.

Next, from the project directory, run `appsody init <stack> --no-template` to initialize Appsody on the existing project.

Now you will likely need to update the structure of your project so the stack can find and run your code. Each stack has a different structure, so you will need to study your chosen stack's documentation and project template for guidance.

Once the project structure is updated, you should try `appsody run` to verify it is working. See more about running an Appsody project in the [Local Development](/docs/using-appsody/local-development.md) document.
