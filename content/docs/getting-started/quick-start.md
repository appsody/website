---
title: Quick Start
path: /docs/getting-started/quick-start
section: Getting Started
---

# Appsody Quick Start

## Installing Appsody

**Prerequisite:** [Docker](https://docs.docker.com/install/) is installed and running.

To install Appsody on macOS, run the following commands:
```
brew tap appsody/appsody
brew install appsody
```

To install Appsody on Windows or Linux, check out the [installation guide](/docs/getting-started/installation.md).

## Using Appsody

Creating a new Appsody project is easy! With only a few commands, you will have a containerized development environment running with the stack of your choice!

First, create a new directory for the project and run `appsody init <stack>` to download the template project. The following example uses the `nodejs-express` stack:
```
mkdir my-project
cd my-project
appsody init nodejs-express
```
**Tip:** You can view other available stacks with `appsody list`

Now you have a fully functional Appsody project. Next, start the development container:
```
appsody run
```
Great! Now the project is running in a docker container, and the container is linked to the project source code on your local system. For `nodejs-express`, navigate to <http://localhost:3000> to see the output (other stacks may use a different URL).

Finally, let's try changing the code. Edit the file `app.js` to output something other than "Hello World!". Upon saving the file, Appsody will pickup the change and automatically update the container. Refresh <http://localhost:3000> to see the new message!

You are ready to continue developing your application. To stop the container, press `Ctrl-C` in the terminal. To enable the debugger, restart the container with `appsody debug`. 

Finally, when you are ready to publish a production docker image, run `appsody build`. 

**Tip:** You can get more information about all the commands with `appsody help [command]` or `appsody <command> --help`.