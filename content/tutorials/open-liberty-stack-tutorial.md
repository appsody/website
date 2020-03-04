---
title: Using the Open Liberty stack
---

Open Liberty is a lightweight, open framework for building fast and efficient cloud-native microservices.
Blazingly fast startup times and seamless "dev mode" integration means you can focus less on
administration and more on writing code.

[Appsody](https://appsody.dev/) takes this a step further by bringing your development into the cloud. Using the [Open Liberty stack](https://github.com/appsody/stacks/tree/master/incubator/java-openliberty), you can develop your Open Liberty app directly within a container with real time compilation and code updates.

This tutorial walks you through the basics of using the Open Liberty stack with Appsody. By the end of this guide, you will be up and running with a starter MicroProfile application running on Open Liberty.


# Prerequisites

* Install the Appsody CLI following [these instructions](https://appsody.dev/docs/installing/installing-appsody/)
* [A Java 8 JDK Installation](https://adoptopenjdk.net/?variant=openjdk8&jvmVariant=openj9)
* [Apache Maven](https://maven.apache.org/)
* Docker Desktop
  * [Windows Docker Installation](https://docs.docker.com/docker-for-windows/)
  * [MacOS Docker Installation](https://docs.docker.com/docker-for-mac/)

## Create a new Open Liberty project

Creating a new project is fast and easy. Navigate to an empty directory and issue the following command:

```
appsody init java-openliberty
```  

When the build completes, you should see something like:

```
...
[InitScript] [INFO] ------------------------------------------------------------------------
[InitScript] [INFO] BUILD SUCCESS
[InitScript] [INFO] ------------------------------------------------------------------------
[InitScript] [INFO] Total time: 0.800 s
[InitScript] [INFO] Finished at: 2019-09-02T15:52:41+01:00
[InitScript] [INFO] ------------------------------------------------------------------------
Successfully initialized Appsody project with the java-openliberty stack and the default template.
```

Your new Open Liberty project should look similar to the following:

```
.
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── appsody
    │   │           └── starter
    │   │               ├── StarterApplication.java
    │   │               ├── StarterResource.java
    │   │               └── health
    │   │                   ├── StarterLivenessCheck.java
    │   │                   └── StarterReadinessCheck.java
    │   ├── liberty
    │   │   └── config
    │   │       ├── configDropins
    │   │       │   └── defaults
    │   │       │       └── quick-start-security.xml
    │   │       └── server.xml
    │   └── webapp
    │       ├── WEB-INF
    │       │   └── beans.xml
    │       └── index.html
    └── test
        └── java
            └── it
                └── dev
                    └── appsody
                        └── starter
                            ├── EndpointTest.java
                            └── HealthEndpointTest.java

```

This is intentionally a 'bare-bones' project so as to avoid the need to delete unnecessary files. It contains:

* `StarterApplication.java` - a JAX-RS Application class  
* `StarterResource.java` - a JAX-RS Resource class
* `server.xml` and `quick-start-security.xml` - the Liberty server configuration files
* `index.html` - a static index file
* `pom.xml` - the project build file


## Run your app

You are now ready to run your app. Issue the following command:

```
appsody run
```

The run command for this stack ensures that the compiled code is up to date, then starts the Open Liberty server and deploys the application in `dev mode`.  Dev mode is Open Liberty's support for hot application update during development. Check out [this blog](https://openliberty.io/blog/2019/10/22/liberty-dev-mode.html) for more information.

After a while you should see output similar to the following indicating that the application is up and running.
> If tests are started automatically, you might need to scroll up to find this output.

```
[Container] [INFO] [AUDIT   ] CWWKZ0001I: Application starter-app started in 3.393 seconds.
[Container] [INFO] [AUDIT   ] CWWKF0012I: The server installed the following features: [appSecurity-2.0, cdi-2.0, concurrent-1.0, distributedMap-1.0, jaxrs-2.1, jaxrsClient-2.1, jndi-1.0, json-1.0, jsonb-1.0, jsonp-1.1, jwt-1.0, microProfile-3.2, mpConfig-1.3, mpFaultTolerance-2.0, mpHealth-2.1, mpJwt-1.1, mpMetrics-2.2, mpOpenAPI-1.1, mpOpenTracing-1.3, mpRestClient-1.3, opentracing-1.3, servlet-4.0, ssl-1.0].
[Container] [INFO] [AUDIT   ] CWWKF0011I: The defaultServer server is ready to run a smarter planet. The defaultServer server started in 14.015 seconds.
[Container] [INFO] CWWKM2015I: Match number: 1 is [2/17/20 16:27:14:725 UTC] 0000002a com.ibm.ws.kernel.feature.internal.FeatureManager            A CWWKF0011I: The defaultServer server is ready to run a smarter planet. The defaultServer server started in 14.015 seconds..
[Container] [INFO] Tests will run automatically when changes are detected.

```

Just like that, your Open Liberty application is running inside a Docker container ready for development.

Next, navigate to the JAX-RS application resource endpoint to confirm that the default JAX-RS resource is available.  Open the following link in your browser:

[http://localhost:9080/starter/resource](http://localhost:9080/starter/resource)

You should see the response `StarterResource response`

To show Open Liberty's dev mode in action, make a change to the source code. Navigate to the `src/main/java/dev/appsody/starter` directory, and open the file called `StarterResource.java` - this is the JAX-RS resource.

```Java
package dev.appsody.starter;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/resource")
public class StarterResource {

    @GET
    public String getRequest() {
        return "StarterResource response";
    }
}
```
Try changing the message in `StarterResource.java`. When you save the file, the source is compiled and the application updated:

```
[Container] [INFO] Source compilation was successful.
[Container] [INFO] [AUDIT   ] CWWKT0017I: Web application removed (default_host): http://a904f464a04b:9080/
[Container] [INFO] [AUDIT   ] CWWKZ0009I: The application starter-app has stopped successfully.
[Container] [INFO] [AUDIT   ] CWWKT0016I: Web application available (default_host): http://a904f464a04b:9080/
[Container] [INFO] [AUDIT   ] CWWKZ0003I: The application starter-app updated in 1.447 seconds.
```

Refresh your browser page to see the updated message.

## MicroProfile capabilities

The Open Liberty stack provides your application with a full set of MicroProfile 3.2 technologies and enables these out of the box.

### Health

With the server still running, open the following link in your browser:

[http://localhost:9080/health](http://localhost:9080/health)

This is a basic health check provided with your application. You should see output similar to this indicating that your service is up and running:

```
{"checks":[{"data":{},"name":"StarterLivenessCheck","status":"UP"},{"data":{},"name":"StarterReadinessCheck","status":"UP"}],"status":"UP"}
```

### Open API

Now open the following link to view available REST APIs for your application:

[http://localhost:9080/openapi](http://localhost:9080/openapi)

You should see the StarterResource endpoint listed like this:

```
openapi: 3.0.0
info:
  title: Deployed APIs
  version: 1.0.0
servers:
- url: http://localhost:9080
- url: https://localhost:9443
paths:
  /starter/resource:
    get:
      operationId: getRequest
      responses:
        default:
          description: default response
          content:
            '*/*':
              schema:
                type: string
```

### Metrics

Finally, you can check out some metrics for your application by navigating to the following URL:

[http://localhost:9080/metrics](http://localhost:9080/metrics)

The username for this endpoint is "admin", and for security purposes, the password is automatically generated by the container at runtime.

To get the generated password, enter the following command where *my-project* is the name of your project directory:

```
docker exec -it my-project-dev  bash -c "grep keystore /opt/ol/wlp/usr/servers/defaultServer/server.env"
```

You should see output similar to this:

```
keystore_password=2r1aquTO3VVUVON7kCDdzno
```

The password is the value of the **keystore_password** variable. Enter that password in the browser prompt.

You should see text-form metrics data similar to this:

```
...

# TYPE base_memory_usedHeap_bytes gauge
# HELP base_memory_usedHeap_bytes Displays the amount of used heap memory in bytes.
base_memory_usedHeap_bytes 5.5484848E7

...
```

When you're done, type `Ctrl-C` to end the `appsody run`.

## Building a production image

Now you are done with your development and are ready to package up your app in an Open Liberty Docker image.
To do this, issue the following command.

```
appsody build
```

The first build may take a bit of time. This is due to the application being rebuilt from the ground up which
ensures that no local dependencies are used. However, as a result of deliberate caching, subsequent
runs will be much faster.

When the build completes, your app will be built into an Open Liberty image and tuned to be lightweight and fast.

Run your image by issuing the following where *my_project* is the project directory:

```
docker run -p 9080:9080 -p 9443:9443 dev.local/my_project
```

Your app should start up lightning fast, and the [resource endpoint](http://localhost:9080/starter/resource) should be available as it was before.


# Next Steps

Find out more about Appsody with our other tutorials by visiting [https://appsody.dev](https://appsody.dev)

Any questions or want to chat, come join us on Slack!

You can also find a bunch of other helpful guides for creating Java applications with OpenLiberty [here](https://openliberty.io/guides/)
