---
title: "REST on a cloud: easily package a JAX-RS application to deploy to Kubernetes with Appsody"
date: "2019-07-15"
author: "David Harris"
tutorial: "true"
length: "1 hour 30 mins"
---

# REST on a cloud: easily package a JAX-RS application to deploy to Kubernetes with Appsody



In this tutorial I’ll show how you can use [Appsody](https://appsody.dev) to take care of packaging applications for the cloud, so that you can focus on writing code. You’ll learn using the application provided in the OpenLiberty guide for ‘[Creating a RESTful Web Service](https://openliberty.io/guides/rest-intro.html)’, although you’ll be able to use the same approach for other Java applications based on [Eclipse Microprofile](https://microprofile.io/).

### What is Appsody?

![](https://cdn-images-1.medium.com/max/2000/1*5SXWG-TQiEaRNabFsTnnXQ.png)

[Appsody](https://appsody.dev) is an open source project which simplifies developing apps for the cloud. It helps teams share common foundations on which to build applications; where they can embed their expertise and standards, and reduce the learning curve before new folks can start writing apps.

At its core, Appsody provides:

* **Stacks** which include language runtimes, frameworks, libraries and tools.

* **Project Templates** which build upon these Stacks and provide an initial project structure, and just enough code to get started with your own “cloud native” application.

* A **CLI** which allows you to manage the full development lifecycle.

Applications can be iteratively developed whilst deployed in a locally running docker container, with code changes automatically detected and reflected in the app.

This tutorial will show you how existing applications can be built on top of a Stack to take advantage of Appsody’s workflows for development and deployment.

### Pre-requisites

* Install Appsody by following the information [here](https://appsody.dev/docs/getting-started/installation).

* You will also need Docker and Maven on your workstation.

### Sample application

This [guide](https://openliberty.io/guides/rest-intro.html) shows you how to develop a simple JAX-RS web service, which will respond to a GET request with the JVM’s system properties. You can either follow the guide to build the app yourself, or skip to the end as the application is provided within a finish folder.

To work with the finished application, clone the project
```
git clone https://github.com/OpenLiberty/guide-rest-intro
```
and navigate to /guide-rest-intro/finish where the completed application resides.

### Setting up the local development environment

As mentioned, Appsody provides both a Stack and Project Templates. If you already have your own application, and as such don’t require the template, you can initialise the development environment with just the Stack required by your application, by issuing the init command with none specified as a template.

The JAX-RS and JSON-P features used by the sample application are part of Eclipse Microprofile specification, so we can use the java-microprofile Stack. We can initialise the development environment by issuing the following command within the finish directory:
```
appsody init java-microprofile none
```
There are 2 changes you will need to make in order for the app to run.

(1) Both the application and the java-microprofile Stack will include a pom.xml. The Stack’s will act as the parent, so before you can run the app you need to update the <parent> field in the application pom.xml, to reference the Stack as shown below:
```
    <parent>
      <groupId>dev.appsody</groupId>
      <artifactId>java-microprofile</artifactId>
      <version>0.2.1</version>
    </parent>
```
(2) The Stack requires the application to either be a specific version of OpenLiberty like 19.0.0.5 or to rely on the default set in Stack by using ${version.openliberty-runtime}, so you’ll need to update <assemblyArtifact> appropriately.

### Running the application

Simply issue appsody run

This will start a docker container and copy across the workspace and a **controller**. This controller will watch for changes in the src directory and issue mvn -Dmaven.repo.local=/mvn/repository compile to rebuild the app.

Once complete you can test the app by going to:
[http://localhost:9080/LibertyProject/System/properties](http://localhost:9080/LibertyProject/System/properties)

You now have a fully functional development environment, where you can make changes in your IDE of choice, hit save, and refresh the above URL to see the changes take effect.

For example, try adding the following **bold** text within src/main/java/io/openliberty/guides/rest/PropertiesResource.java

    [@GET](http://twitter.com/GET)
    [@Produces](http://twitter.com/Produces)(MediaType.APPLICATION_JSON)
    public JsonObject getProperties() {

      JsonObjectBuilder builder = Json.createObjectBuilder();

    **  builder.add("General Kenobi","Hello there");**

      System.getProperties()
            .entrySet()
            .stream()
            .forEach(entry -> builder.add((String)entry
                                     .getKey(),(String)entry
                                     .getValue()));

      return builder.build();
    }

### Build and deploy

The Appsody CLI allows you to build a local dockerfile and deploy the application to a Kubernetes cluster. Full guidance on this can be found in our documentation under ‘[build and deploy](https://appsody.dev/docs/using-appsody/building-and-deploying)’.

### Next Steps

Find out more about Appsody with our other tutorials [here](https://medium.com/appsody), or by visiting [https://appsody.dev](https://appsody.dev)

Any questions or want to chat, come join us on [Slack](http://appsody-slack.eu-gb.mybluemix.net/)!

You can also find a bunch of other helpful guides for creating Java applications with OpenLiberty [here](https://openliberty.io/guides).