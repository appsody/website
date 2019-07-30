---
path: /docs/using-appsody/local-development
---

# Appsody Local Development

When a source code project is initialized with Appsody, you get a local Appsody development container. The container can be started in three modes:

- run
- debug
- test

Typically, you run one mode at a time. If you want to run more than one mode at a time you must specify unique name and port options to avoid conflicts between containers. See [Advanced Options](#advanced-options).

While running the container in any of these modes, you can quit Appsody by pressing `Ctrl-C` or running `appsody stop` in the terminal.

Each stack might open different ports and behave slightly differently across these modes. For more information, see the [documentation](https://github.com/appsody/stacks/tree/master/incubator) for the appropriate stack.

- `appsody run` starts the development container in normal *run* mode. This mode most closely resembles your application running in production. Appsody watches your local project directory for file changes and hot swaps the application to reflect code changes as you develop.

- `appsody debug` starts the development container with a debugger enabled. Typically, the stack provides a debug port that connects to your IDE. You can then set breakpoints and step through your code as it runs in the container.

- `appsody test` runs the test suite for your application in the container. To define tests for the application, see the [documentation](https://github.com/appsody/stacks/tree/master/incubator) for the appropriate stack.

## Advanced options
The `appsody run|debug|test` commands support some of the same options as `docker run`. To see a list of supported options, run `appsody help run`.

If you want to run the same Appsody project in two parallel containers, you will hit conflicts with container names and ports. You can avoid these conflicts by specifying an alternative name and port number for one of the Appsody containers.

For example, to enable two parallel runs of a nodejs-express project, you can start two Appsody containers with the following command:
```
appsody run &
appsody run --name my-project-dev2 -p 3001:3000 -p 9230:9229 &
```
To stop the containers:
```
appsody stop
docker stop my-project-dev2
```
