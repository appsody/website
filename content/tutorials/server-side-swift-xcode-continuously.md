---
title: "Server-Side Swift: Develop in Xcode, Continuously verify in Docker"
date: "2019-09-27"
author: "Chris Bailey"
imagePath: "http://localhost:8000/static/e05283c91c0cc09f39645b4b283a68a7/8dcf2/autumn.jpg"
tutorial: "true"
length: "1 hour"
---

# Server-Side Swift: Develop in Xcode, Continuously verify in Docker

Due to the availability of the Swift Language Server Protocol (LSP) library, there are now more IDEs that you can use to develop server-side Swift applications, including using VSCode on Linux. Undoubtedly though, the vast majority of development is still done using Xcode on macOS.

Whilst this is great in terms of support for the Swift language — and with the support for Swift Package Manager added in Xcode 11, for package management — there is still the challenge of ensuring that the APIs, frameworks and packages that you are using on macOS are supported and work in the same way on Linux.

The new support for Swift in the Appsody cloud-native development tools helps to solve that challenge, by enabling you to continuously run and test your code in a Docker container as you develop in Xcode.

![Develop in Xcode, Verify in Docker, Deploy to Kubernetes](https://cdn-images-1.medium.com/max/3124/1*DELjr4SUVq7dkE3v0v-hrQ.png)*Develop in Xcode, Verify in Docker, Deploy to Kubernetes*

This means that, as you develop in Xcode (or any other IDE), your code is mirrored into a Docker container which rebuilds every time you save your code changes — meaning you can immediately see if you code changes fail or have different behaviour on Linux.

Below you’ll see how to enable your project and run it in the Appsody environment in parallel to working in Xcode.

## Pre-requisites

In order to follow this tutorial, you’ll need to install the Appsody CLI, which also requires you to have Docker installed, along with having your Swift application.

#### Install Docker

It is recommended that you do this using [Docker for Desktop for Mac](https://docs.docker.com/docker-for-mac/install/), which is available as a download from Docker Hub.

#### Install the Appsody CLI
The Appsody CLI can be installed by following the [Installing Appsody](https://appsody.dev/docs/getting-started/installation) guide. On macOS is is done using Homebrew:
```
    brew install appsody/appsody/appsody
```
#### Create a sample application
Additionally, you’ll need a server-side Swift application. You can either use one you already have, or create a sample application using one of the two approaches below:

**Option 1: Create a sample application using Kitura
**You can create a sample application using the Kitura macOS app using the “[Create a server with the Kitura macOS app](https://www.kitura.io/docs/getting-started/create-server-app.html)” guide, or using the Kitura CLI by following the “[Create a server with the Kitura CLI](https://www.kitura.io/docs/getting-started/create-server-cli.html)” guide. The steps below show how to use the CLI:

1. Install the Kitura CLI using Homebrew:
```
brew install ibm-swift/kitura/kitura
```
2. Create a directory for your Swift project
```
    mkdir ~/swiftapp
    cd ~/swiftapp
```
3. Create a Kitura application
```
    kitura init
```
#### Option 2: Create a sample application using Vapor

You can create a sample application using the Vapor CLI by following the “Install on macOS” guide to install the CLI, followed by the “Hello World” guide to create you application. Those steps are summarized below:

1. Install the Vapor CLI using Homebrew:
```
    brew install vapor/tap/vapor
```
2. Make sure you are in your home directory
```
    cd ~
```
3. Create a Vapor application
```
    vapor new swiftapp
    cd swiftapp
```
4. Create an Xcode Project for your app (only required for Xcode 10 and before)
```
    swift package generate-xcodeproj
```
## Enabling your application to work with Appsody

New Appsody based applications are created using appsody init `stack template`, where the names of the stack and the template are from those listed when running appsody list. This both downloads the most recent copy of the Appsody Stack — essentially the development and build environment for that language) — and populates the project directory with a template that provides a basic project structure.

In order to enable an existing application with a stack, the same steps can be followed, but using a template name of none with theappsody init command.

1. Enable the Swift Application:
```
    appsody init swift none
```
This will print output similar to the following to the console:
```
    Running appsody init...

    Downloading swift template project from [https://github.com/appsody/stacks/releases/download/swift-v0.1.4/incubator.swift.templates.simple.tar.gz](https://github.com/appsody/stacks/releases/download/swift-v0.1.4/incubator.swift.templates.simple.tar.gz)
    Download complete. Extracting files from swift.tar.gz
    Setting up the development environment
    Running command: docker[pull appsody/swift:0.1]
    Running command: docker[run --rm --entrypoint /bin/bash appsody/swift:0.1 -c find /project -type f -name .appsody-init.sh]
    Successfully initialized Appsody project
```
As well as downloading the latest version of the Appsody Stack (in this case version 0.1), this has added a **.appsody-config.yaml** file to the project, which configures the versions of the Stack that the project will use.

At this point, your application has been enabled, which means you can now run , test and debug your application in a continuous containerized environment provided by the Appsody Stack, to build it into a optimized container image, and to deploy it to Kubernetes.

## Developing your application with Appsody

Now that your application has been enabled, you can use the run, test and debugcommands to the Appsody CLI to work with your application in a continuous containerized environment provided by the Appsody Stack.

Appsody’s run mode provides a continuous development environment, where changes that are saved to your project cause your application to be restarted.

1. First open your project in Xcode so that you can make changes to your project:

* Xcode 10 and earlier:
```
    cd ~/swiftapp
    xed .
```
* Xcode 11 and beyond:
```
    cd ~/swiftapp
    open Package.swift
```
2. Next, start the continuous run environment, by using the Appsody CLI in the terminal window:

    appsody run
> This will build and run your application in a Docker container. The first run may take a couple of minutes as it downloads and builds your application for the first time, but subsequent runs will cache that data.

3. Finally, open your browser to see your Swift application running inside the Docker container: [http://localhost:8080](http://localhost:8080)

If you are running the Kitura sample app, you should see the following:

![“Your Kitura server is up and running!” — Success from Kitura App](https://cdn-images-1.medium.com/max/5584/1*W1eGFPxDAUic8AdF40HuyQ.png)

*“Your Kitura server is up and running!” — Success from Kitura App*

However if you are running Vapor, you should receive an error with the web page failing to load. This is because Vapor apps only accept requests from localhost by default — and the Docker container does not see your host machine (ie, your macbook) as localhost — so we need to enable remote connections.

You can do that by adding the following into Sources/App/app.swift in Xcode:

    **let** serverConfig = NIOServerConfig.default(hostname: "0.0.0.0")
    services.register(serverConfig)

As appsody run provides a continuous development environment, any code changes you make will cause an automatic restart of the application — just go back to your browser and see if you can now connect to your app. You should now see:

![“It works!” — Success from Vapor App in Appsody](https://cdn-images-1.medium.com/max/2092/1*BfUPibQuJTrEjX5rVoll0A.png)*“It works!” — Success from Vapor App in Appsody*

4. Make a code change to your project that will be reflected in the browser. 
Any code changes you now make should be immediately reflected. If you’re using Vapor, you’ve already seen that in order to enable requests from non-localhost addresses to be handled.

For Kitura, a simple code change is to remove the Health Route.
> By default, Kitura provides a /health route that responds with the status of the Kitura server. This is provided because many clouds and cloud technologies — like Kubernetes — can use this to determine whether the application needs to be automatically restarted.

To do that, edit Sources/Application/application.swift to remove the following line:

    initializeHealthRoutes(app: **self**)

Save the file, and open [http://localhost:8080/health](http://localhost:8080/health) to see that the route it no longer present!

## Working with your application in Test mode

Appsody’s test mode makes it possible to run any tests that your application has inside the containerized environment.

Run the tests using the Appsody test mode:

    appsody test

This will respond with the output of your tests being run:

    [Container] Test Suite 'All tests' started at 2019-09-01 11:58:12.127
    [Container] Test Suite 'debug.xctest' started at 2019-09-01 11:58:12.171
    [Container] Test Suite 'RouteTests' started at 2019-09-01 11:58:12.172
    [Container] Test Case 'RouteTests.testGetStatic' started at 2019-09-01 11:58:12.172
    [Container] ------------------------------
    [Container] ------------New Test----------
    [Container] ------------------------------
    ...
    [Container] Test Case 'RouteTests.testGetStatic' passed (0.21 seconds)
    [Container] Test Suite 'RouteTests' passed at 2019-09-01 11:58:12.382
    [Container]   Executed 1 test, with 0 failures (0 unexpected) in 0.21 (0.21) seconds
    [Container] Test Suite 'debug.xctest' passed at 2019-09-01 11:58:12.383
    [Container]   Executed 1 test, with 0 failures (0 unexpected) in 0.21 (0.21) seconds
    [Container] Test Suite 'All tests' passed at 2019-09-01 11:58:12.383
    [Container]   Executed 1 test, with 0 failures (0 unexpected) in 0.21 (0.21) seconds

Note that, unlike run anddebug, test executes a single run of the tests rather than a continuous container.

## Building your application with Appsody

Once you have reached a point that you would like to build a deployable container image for your application, you can do that using appsody build. This creates a production-optimized image that is built using the regular [“swift” Official Docker image](https://hub.docker.com/_/swift) from the Swift community and then rebased on the communities “slim” image. The “slim” image is both significantly smaller that the regular image, making it easier and faster to deploy to a cloud, and more secure because it does not include the Swift compiler — it only contains enough to run your application.

The steps below show how to build the container image for your application, and then run it locally using Docker:

1. Build the container image for your application:
```
    appsody build
```
This builds a container image for your application, using the name of your project as the “tag” (which is the name of the folder in which is resides). The final line of the output gives the name of the image:

    Built docker image swiftapp
> To see the size of your built image, you can use docker images. This shows that the built image is 315MB. If this was built with the full Swift image it would have been 1.47 GB!

2. Run the container image using Docker:
```
    docker run — rm -p 8080:8080 -i -t swiftapp
```
This runs your container image, using the-p option to map port 8080 from the container to port 8080 on your machine, the -i option to run interactively (so you can use **Ctrl-C** to stop the container), the --rm option to remove the container when its stopped, and the -t option to run the container image with our “tag” of swiftapp.

3. Open your browser to see the application running: [http://localhost:8080](http://localhost:8080)

4. Finally, stop the container by using **Ctrl-C** in the terminal window where docker run is executing.

You now have a cloud packaged available in a container image that is ready to be deployed to any cloud that supports container images.

If you have access to a Kubernetes cluster, you can also very easily deploy the built application using the appsody deploy command.

## Next Steps

This article covered how to take develop your server-side Swift application and develop it with the benefit of a continuous Linux environment running in a Docker container locally on your MacBook using Appsody.

Appsody provides similar experiences for many other languages and frameworks including Java, Node.js and Python, as well as an easy mechanism to deploy and manage your application in Kuberentes.

For more information on [Appsody](https://appsody.dev), join us on [Slack](http://appsody-slack.eu-gb.mybluemix.net), follow us on [Twitter](https://twitter.com/appsodydev) and star us on [GitHub](https://github.com/appsody).
