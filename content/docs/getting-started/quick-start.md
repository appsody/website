---
path: /docs/getting-started/quick-start
---

# Quick Start

If you haven't already installed Appsody, follow the steps described in [Installation](/docs/getting-started/installation.md).

Creating a new Appsody project is easy! All you need is a few commands to create a containerized development environment running with the stack of your choice.

First, choose a development stack. To see all the available stacks, run:  

```
appsody list
```

Create a new directory for your project and run `appsody init <stack>` to download the template project. The following example uses the `nodejs-express` stack to create
a fully functional Appsody project:

```
mkdir my-project
cd my-project
appsody init nodejs-express
```

Start the development container:

```
appsody run
```

Great! Now the project is running in a docker container, and the container is linked to the project source code on your local system. For `nodejs-express`, navigate to <http://localhost:3000> to see the output. Other stacks might use a different URL, so check the [documentation](https://github.com/appsody/stacks/tree/master/incubator) for your chosen stack.

Now let's try changing the code. Edit the file `app.js` to output something other than "Hello from Appsody!". When you save the file, Appsody picks up the change and automatically updates the container. Refresh <http://localhost:3000> to see the new message!

You are ready to continue developing your application.

- To stop the container, press `Ctrl-C` in the terminal.
- To enable the debugger, restart the container with `appsody debug`.
- When you are ready to build a production docker image, run `appsody build`.

**Tip:** You can get more information about all the available commands by running `appsody help [command]` or `appsody <command> --help`.
