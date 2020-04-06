---
title: 'Make your Express.js app Cloud-Native with Appsody'
date: "2019-07-15"
author: "Chris Bailey"
tutorial: "true"
length: "30 mins"
---

# Make your Express.js app Cloud-Native with Appsody

This tutorial shows you how to take an existing Express.js application, and make it cloud-native, by enabling it to work with the nodejs-express Appsody Stack.

## Prerequisites

To follow this tutorial, you need to install both the Appsody CLI and Docker. You also need the Express.js application that you want to make cloud-native by using Appsody.

### Install the Appsody CLI

Install the Appsody CLI by following the [Installing Appsody](https://appsody.dev/docs/getting-started/installation) guide for your platform.

## Create an Express.js application

You can either use an Express.js app that you already have, or create a sample Express.js app by using the [Express.js Application Generator](http://expressjs.com/en/starter/generator.html). The examples within the tutorial assume that you are using the Express.js Application Generator as follows:

1. Install the Express.js Application Generator:

    ```
    npm install -g express-generator
    ```

2. Create a directory for your application:

    ```
    mkdir expressjs-app
    cd expressjs-app
    ```

3. Run the Express Application Generator to build a sample application:

    ```
    express
    ```

## Enabling your Express.js application with the `nodejs-express` Appsody Stack

New Appsody based applications are created by using `appsody init <stack> <template>`, where the stack is chosen by you from the stacks that are listed when you run `appsody list`. The `init` command downloads the most recent copy of the Appsody Stack, and populates the project directory with a template that provides a basic project structure.

The Express.js Appsody stack provides [two templates: simple and scaffold](https://github.com/appsody/stacks/tree/master/incubator/nodejs-express#templates). Simple, the default template, provides a basic Express app. The scaffold template has more boilerplate.

To enable an existing application with a stack, use the `appsody init` command, but pass `none` as the template. A template value of `none` indicates that a project structure (or template) is not required.

1. Enable the Express.js Application:
    ```
    appsody init nodejs-express none
    ```

    This provides output similar to the following:

    ```
    Checking stack requirements...
    Docker requirements met
    Appsody requirements met
    Running appsody init...
    Downloading nodejs-express template project from https://github.com/appsody/stacks/releases/download/nodejs-express-v0.4.6/incubator.nodejs-express.v0.4.6.templates.simple.tar.gz
    Download complete. Do not unzip the template project. Only extracting .appsody-config.yaml file from /Users/helenmasters/expressjs-app/nodejs-express.tar.gz
    Setting up the development environment
    Your Appsody project name has been set to expressjs-app
    Pulling docker image docker.io/appsody/nodejs-express:0.4
    Running command: docker pull docker.io/appsody/nodejs-express:0.4
    0.4: Pulling from appsody/nodejs-express
    Digest: sha256:14828ecbd226c9869761a4991911c407465c754e54b5a988c4daa933b6adf4ae
    Status: Image is up to date for appsody/nodejs-express:0.4
    docker.io/appsody/nodejs-express:0.4
    Running command: docker run --rm --entrypoint /bin/bash docker.io/appsody/nodejs-express:0.4 -c "find /project -type f -name .appsody-init.sh"
    Successfully initialized Appsody project with the nodejs-express stack and no template.
    ```

    As well as downloading the latest version of the Appsody Stack (in this case version 0.4), this has added a **.appsody-config.yaml** file to the project, which configures the versions of the Stack that the project uses.

    While your application is now enabled to use the nodejs-express stack, there are three additional steps that are required to ensure that the Express.js application works properly with the stack.

2. Modify the **package.json** file so that it has a main entry that references the file that contains your Express.js application.

    In the case of the application created by the Express Application Generator, the **package.json** becomes:
    ```

    {
      “name”: “expressjs-app”,
      “version”: “0.0.0”,
      “private”: true,
      “main”: “app.js”,
      “scripts”: {
        “start”: “node ./bin/www”
      },
      “dependencies”: {
        “cookie-parser”: “~1.4.4”,
        “debug”: “~2.6.9”,
        “express”: “~4.16.1”,
        “http-errors”: “~1.6.3”,
        “jade”: “~1.11.0”,
        “morgan”: “~1.9.1”
      }
    }
    ```

    Here main references `app.js` as that is the file that contains the Express.js application. The next step is to export the function that returns the Express router or application from the file.

3. The nodejs-express stack requires you to export a function that returns your Express router or application.

    To enable this, the last line of the `app.js` file becomes:

    ```
    module.exports = () => app;
    ```

    This exports the function so that the nodejs-express Appsody stack can apply it onto its own pre-configured Express.js server that includes the cloud-native capabilities.

4. Remove any default routes (e.g. for 404: Not Found):

    The nodejs-express stack contains default implementations of Health, Readiness, and Liveness endpoints. These endpoints are able to be overridden by your application. This means that any default route handlers override these routes.

    In the application created by the Express Application Generator, this means removing the following statement:

    ```
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });
    ```

At this point, your application has been fully enabled. This means that you can now run, test, and debug your application in a continuous containerized environment provided by the Appsody Stack. You also get the following additional capabilities, which have been inherited from the stack:

* Health Endpoint: [http://localhost:3000/health](http://localhost:3000/health)
* Liveness Endpoint: [http://localhost:3000/live](http://localhost:3000/live)
* Readiness Endpoint: [http://localhost:3000/ready](http://localhost:3000/ready)
* Metrics Endpoint: [http://localhost:3000/metrics](http://localhost:3000/metrics)
* Performance Dashboard: [http://localhost:3000/appmetrics-dash](http://localhost:3000/appmetrics-dash)

You can also use the appsody build command to build your app into a optimized container image, and the appsody deploy command to deploy it to Kubernetes.

## Next Steps

For more information on [Appsody](https://appsody.dev), join us on [Slack](http://appsody-slack.eu-gb.mybluemix.net), follow us on [Twitter](https://twitter.com/appsodydev) and star us on [GitHub](https://github.com/appsody).
