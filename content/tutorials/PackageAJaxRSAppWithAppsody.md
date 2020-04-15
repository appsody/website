---
title: 'REST on a cloud: easily package a JAX-RS application to deploy to Kubernetes with Appsody'
date: "2019-07-15"
author: "David Harris"
tutorial: "true"
length: "15 mins"
---

# REST on a cloud: easily package a JAX-RS application to deploy to Kubernetes with Appsody

This tutorial shows you how to use [Appsody](https://appsody.dev) to take care of packaging applications for the cloud so that you can focus on writing code. The tutorial uses the application provided in the Open Liberty guide for [Creating a RESTful Web Service](https://openliberty.io/guides/rest-intro.html).

### What is Appsody?

Appsody simplifies developing apps for the cloud. It helps teams share common foundations on which to build applications; where they can embed their expertise and standards, and reduce the learning curve before new folks can start writing apps.

At its core, Appsody provides:

* **Stacks** which include language runtimes, frameworks, libraries, and tools.

* **Project Templates** which build upon these Stacks and provide an initial project structure, and just enough code to get started with your own “cloud native” application.

* A **CLI** which allows you to manage the full development lifecycle.

Applications can be iteratively developed while they are deployed in a locally running Docker container, with code changes automatically detected and reflected in the app.

This tutorial shows you how existing applications can be built on top of a Stack to take advantage of Appsody’s workflows for development and deployment.

### Prerequisites

* Install the Appsody CLI by following the [Installing Appsody](https://appsody.dev/docs/getting-started/installation) guide for your platform.

* You also need to install Docker and Maven.

### Sample application

This [guide](https://openliberty.io/guides/rest-intro.html) shows you how to develop a simple JAX-RS web service, which responds to a GET request by returning the JVM’s system properties. You can either follow the guide and build the app yourself, or skip to the end as the finished application is provided within a folder called `finish`.

To work with the finished application:

1. Clone the project:

```
git clone https://github.com/OpenLiberty/guide-rest-intro
```

2. Navigate to the folder: `/guide-rest-intro/finish` that contains the completed application.

### Setting up the local development environment

As mentioned, Appsody provides both a Stack and Project Templates. If you already have your own application, and therefore don’t require the project template, you can initialize the Appsody development environment with just the Stack that is required by your application. To do this issue the `appsody init` command with `none` specified for the template.

The JAX-RS and JSON-P features used by the sample application are part of Eclipse Microprofile specification. You can use the `java-openliberty` stack to build MicroProfile compliant applications. Initialize your Appsody development environment by issuing the following command within the `finish` directory:

```
appsody init java-openliberty none
```

The output includes a statement similar to:

```
[InitScript] [INFO] --------------------< dev.appsody:java-openliberty >--------------------
[InitScript] [INFO] Building java-openliberty 0.2.5
```

There is one change that you need to make in order for the app to run.

Both the application and the `java-openliberty` Stack include a `pom.xml` file. The Stack’s `pom.xml` file acts as the parent. Therefore, before you can run the app you need to update the `<parent>` field in the application's `pom.xml` to reference the Stack. The application's `pom.xml` is in the directory you are currently in, open the file and add the following code:

> You can find the correct parent pom version in the output from the `appsody init` command.

```
    <parent>
      <groupId>dev.appsody</groupId>
      <artifactId>java-openliberty</artifactId>
      <version>0.2.5</version>
    </parent>
```

### Running the application

Start your Appsody development environment by entering: `appsody run`.

The `run` command starts a Docker container and mounts the workspace and the local maven repository (`~/.m2/repository`). Open Liberty's "dev mode" is enabled which automatically detects changes to the application's configuration and source, triggering a recompile and redeploy of the application.

You can test the app by going to:
[http://localhost:9080/LibertyProject/System/properties](http://localhost:9080/LibertyProject/System/properties)

You now have a fully functional development environment, where you can make code changes in your IDE of choice, save, and refresh the above URL to see the changes take effect.

For a simple example, open `src/main/java/io/openliberty/guides/rest/PropertiesResource.java` and replace:

```
    return System.getProperties();
```

with 

```
    Properties prop = new Properties();
    prop.setProperty("Hello", "World");
    return prop;
```

You can see that the changes are picked up automatically by looking at the output from the `appsody run` command. If you then revisit: [http://localhost:9080/LibertyProject/System/properties](http://localhost:9080/LibertyProject/System/properties) you now see the output:

```
{"Hello":"World"}
```

### Build and deploy

With the Appsody CLI, you can build a local Dockerfile and deploy the application to a Kubernetes cluster. More information about how to build and deploy your app can be found in the [deploying](https://appsody.dev/docs/using-appsody/building-and-deploying) documentation.

### Next Steps

If you have any questions or would like to chat, come join us on [Slack](http://appsody-slack.eu-gb.mybluemix.net/)!

You can also find other helpful guides for creating Java applications with Open Liberty [here](https://openliberty.io/guides).
