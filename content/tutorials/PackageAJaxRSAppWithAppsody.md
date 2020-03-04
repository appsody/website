
# REST on a cloud: easily package a JAX-RS application to deploy to Kubernetes with Appsody

This tutorial shows you how to use [Appsody](https://appsody.dev) to take care of packaging applications for the cloud so that you can focus on writing code. The tutorial uses the application provided in the OpenLiberty guide for ‘[Creating a RESTful Web Service](https://openliberty.io/guides/rest-intro.html)’.

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

* Install Appsody by following the information [here](https://appsody.dev/docs/installing/installing-appsody).

* You also need to install Docker and Maven.

### Sample application

This [guide](https://openliberty.io/guides/rest-intro.html) shows you how to develop a simple JAX-RS web service, which responds to a GET request with the JVM’s system properties. You can either follow the guide and build the app yourself, or skip to the end as the finished application is provided within a `finish` folder.

To work with the finished application:

1. Clone the project:

```
git clone https://github.com/OpenLiberty/guide-rest-intro
```

2. Navigate to `/guide-rest-intro/finish` where the completed application resides.

### Setting up the local development environment

As mentioned, Appsody provides both a Stack and Project Templates. If you already have your own application, and as such don’t require the template, you can initialize the development environment with just the Stack that is required by your application. To do this issue the `appsody init` command with none specified as a template.

The JAX-RS and JSON-P features used by the sample application are part of Eclipse Microprofile specification. We can use the java-openliberty stack which allows you to build MicroProfile compliant applications. You can initialize the development environment by issuing the following command within the `finish` directory:

```
appsody init java-openliberty none
```

You should see output including a statement similar to this:

```
[InitScript] [INFO] --------------------< dev.appsody:java-openliberty >--------------------
[InitScript] [INFO] Building java-openliberty 0.2.2
```

There is one change that you need to make in order for the app to run.

Both the application and the java-openliberty Stack include a `pom.xml` file. The Stack’s `pom.xml` file acts as the parent, so before you can run the app you need to update the `<parent>` field in the application's `pom.xml` to reference the Stack as follows:

Note: You can find the correct parent pom version in the above output statement from `appsody init`.

```
    <parent>
      <groupId>dev.appsody</groupId>
      <artifactId>java-openliberty</artifactId>
      <version>0.2.2</version>
    </parent>
```

### Running the application

Simply issue: `appsody run`.

This starts a docker container and mounts the workspace and the local maven repository (~/.m2/repository). Open Liberty's "dev mode" is enabled which will automatically detect changes to the application's configuration and source triggering a recompile and redeploy of the application.

Once complete you can test the app by going to:
[http://localhost:9080/LibertyProject/System/properties](http://localhost:9080/LibertyProject/System/properties)

You now have a fully functional development environment, where you can make changes in your IDE of choice, hit save, and refresh the above URL to see the changes take effect.

For example, try adding the following code snippet within `src/main/java/io/openliberty/guides/rest/PropertiesResource.java`:

```
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
```

### Build and deploy

The Appsody CLI allows you to build a local dockerfile and deploy the application to a Kubernetes cluster. Full guidance on this can be found in our documentation under ‘[build and deploy](https://appsody.dev/docs/using-appsody/building-and-deploying)’.

### Next Steps

Find out more about Appsody with our other tutorials [here](https://medium.com/appsody).

Any questions or to chat, come join us on [Slack](http://appsody-slack.eu-gb.mybluemix.net/)!

You can also find a bunch of other helpful guides for creating Java applications with OpenLiberty [here](https://openliberty.io/guides).
