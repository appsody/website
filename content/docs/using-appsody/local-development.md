---
title: "Local Development"
section: Using Appsody
path: /docs/using-appsody/local-development
---

# Appsody Local Development
You can start the Appsody development container in three modes: run, debug, and test. You should only execute one of these at a time unless you overwrite the name and port options (see [Advanced Options](#advanced-options) below).

While running the container in any of these modes, you can quit Appsody by pressing `Ctrl-C` or running `appsody stop` in the terminal.

Each stack may open different ports and behave slightly differently across these modes. See your stack's documentation for further details.

## appsody run
The `appsody run` command starts the development container in normal run mode. This mode will most closely resemble your application running in production. Appsody watches your local project directory for file changes and hot swaps the application to reflect code changes as you develop.

## appsody debug
The `appsody debug` command starts the development container with a debugger enabled. Typically, the stack provides a debug port which connects to your IDE. Then you can set breakpoints and step through code as it runs in the container. 

## appsody test
The `appsody test` command runs the test suite for your application in the container. See the stack's documentation on how to define tests for the application.

## Advanced options
The `appsody run|debug|test` commands support some of the same options as `docker run`. See `appsody help run` for a list of supported options.

If you want to run the same Appsody project in two parallel containers, by default you will hit conflicting container name and ports. Therefore, in one of the runs, you must override these options to avoid the conflicts.
For example, for nodejs-express, you could start two Appsody containers with:
```
appsody run &
appsody run --name my-project-dev2 -p 3001:3000 -p 9230:9229 &
```
To stop the containers:
```
appsody stop
docker stop my-project-dev2
```
