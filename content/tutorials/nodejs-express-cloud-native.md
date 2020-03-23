---
title: "Build a new Cloud Native Express.js app with Appsody"
date: "2019-07-15"
author: "Chris Bailey"
imagePath: "http://localhost:8000/static/e05283c91c0cc09f39645b4b283a68a7/8dcf2/autumn.jpg"
tutorial: "true"
length: "45 mins"
---


# Build a new Cloud Native Express.js app with Appsody

The use of Appsody’s tools and provided Stacks greatly simplies the steps and knowledge required to build “cloud packaged”, “cloud native” and “cloud functions” based applications.

Appsody’s nodejs-express Stack makes it easy to go beyond making an application “cloud packaged” (which you can see how to do with the basic nodejs Appsody Stack), to creating “cloud native” applications which exploit the capabilities of the cloud platform by providing features such as additional built-in “**Cloud Native**” capabilities such as liveness and readiness, and metrics and observability..

In the following post, you’ll see how to create a new cloud-native Express.js application using the nodejs-express Stack.

## Pre-requisites

In order to follow this tutorial, you’ll need to install the Apposdy CLI, which also requires you to have Docker installed.

### Install the Appsody CLI

Before getting started, you’ll need to install the Appsody CLI.

1. Follow the [Installing Appsody](https://appsody.dev/docs/getting-started/installation) guide to install the CLI for your platform.

Additionally, if you’re not familiar with the Appsody’s concepts, its worth reading the “[Building Cloud-Native Apps with Appsody](https://medium.com/appsody/overview-c0cf1f2a244c)” article.

## Creating a new application with the `nodejs-express` Appsody Stack

New Appsody based applications are initialized using appsody init <stack> , where the name of the stack is one of those listed when running appsody list. This both downloads the most recent copy of the Appsody Stack, and populates the project directory with a template that provides a basic project structure.

This needs to be done in a new, empty project directory, and Appsody will then use the name of the directory as the default name for the project.

1. Create a new directory for your project:
```
    mkdir express-app
    cd express-app
```
2. Initialize a new application using the nodejs-express Stack:
```
    appsody init nodejs-express
```
This provides output similar to the following:

    Running appsody init…
    Downloading nodejs-express template project from [https://github.com/appsody/stacks/releases/download/nodejs-express-v0.2.1/incubator.nodejs-express.templates.simple.tar.gz](https://github.com/appsody/stacks/releases/download/nodejs-express-v0.2.1/incubator.nodejs-express.templates.simple.tar.gz)
    Download complete. Extracting files from nodejs-express.tar.gz
    Setting up the development environment
    Running command: docker[pull appsody/nodejs-express:0.2]
    Running command: docker[run — rm — entrypoint /bin/bash appsody/nodejs-express:0.2 -c find /project -type f -name .appsody-init.sh]
    Successfully initialized Appsody project

This has downloaded a project template that provides a very basic project structure, along with the latest nodejs-express Stack which is a container image that contains:

* A continuous, containerized run, debug and test environment for use during development.

* A pre-configured Express.js server with built-in cloud-native capabilities.

* A build configuration to provide optimized production-read container images for your application.

Your newly created application contains the following files:

     8 -rw-r — r — .appsody-config.yaml
     0 drwxr-xr-x .vscode
     0 drwxr-xr-x test
     8 -rw-r — r — app.js
     8 -rw-r — r — package.json

Where:

* .appsody-config.yaml configures the Appsody project, primarily controlling with version(s) of the Appsody Stack that the project can use.

* .vscode provides very basic integration with VSCode, including adding **Run Task…** entries for the Appsody CLI commands.

* test contains a set of tests for the application based on the **mocha** and **chai** frameworks.

* app.js provides a very simple “Hello from Appsody” Express.js route as an example.

* package.json configured your application, and allows you to add your own additional module dependencies as normal.

Looking at the **app.js** file in detail, it contains the following:

    const app = require('express')()

    app.get('/', (req, res) => {
      res.send(“Hello from Appsody!”);
    });
     
    module.exports.app = app;

This creates an instance of an Express.js app, and then registers a handler for get() requests on /that send() a response of "Hello from Appsody!".

The crucial characteristic that is required for the application to work with the nodejs-express Appsody Stack is that the application exports the create Express.js app using the following line:

    module.exports.app = app;

Ths is required as the Appsody Stack will apply the exported app onto its own pre-configured Express.js server that has already had support for cloud-native capabilities such as liveness and readiness probes, and metrics and observability built in.

## Developing your application with Appsody

Now that you have created your application, the next step is to see it running. To do that you can use the appsody run command in a terminal window. Alternatively, if you use VS Code, you can use the tasks that have been configured in the .vscode directory that was added as part of the template project.

1. Run your applcation using: 
a) From the terminal: appsody run
b) In VSCode: **Terminal **> **Run Task…** > **Appsody: run**

This starts a continuous development environment for your application, running inside a container.
 
2. Connect to the application in your browser: [http://localhost:3000](http://localhost:3000)

This responds with:

    Hello from Appsody!

In addition to the handler for get requests on / that was defined in app.js, some other capabilities have been added by the Appsody Stack itself, these include health, liveness and readiness endpoints, a metrics endpoint, and an application performance analysis dashboard (during development only). 
 
3. View the additional cloud-native capabilities:

* Health Endpoint: [http://localhost:3000/health](http://localhost:3000/health)

* Liveness Endpoint: [http://localhost:3000/live](http://localhost:3000/live)

* Readiness Endpoint: [http://localhost:3000/ready](http://localhost:3000/ready)

* Metrics Endpoint: [http://localhost:3000/metrics](http://localhost:3000/metrics)

* Performance Dashboard: [http://localhost:3000/appmetrics-dash](http://localhost:3000/appmetrics-dash)

Now that your application is running under appsody run, as you make and save code changes in your application, those will automatically cause your application to be restarted and the changes reflected in the browser.

4. Make a code change to your project that will be reflected in the browser:

a) Open the **app.js** file
 b) Change the file contents to:

    const app = require('express')()
     
    app.get('/', (req, res) => {
      res.send(“Hello from Appsody!!!!!!!”);
    });
     
    module.exports.app = app;

c) Save the file.

5. Connect to the application in your browser: [http://localhost:3000](http://localhost:3000)
 
 This will display:

    Hello from Appsody!!!!!!!

6. Finally, stop the continuous run environment by either:

* Using **Ctrl-C** in the terminal window where appsody run is executing

* Running appsody stop from the project directory

### Testing, Debugging and Performance Analysing your application

The Appsody CLI also provides test and debug capabilities, and the built-in Performance Dashboard can be used for performance analysis.

The these work in exactly the same was as they do for the base nodejs Appsody Stack. You can see how to use those capabilities in the “[Package your Node.js app for Cloud with Appsody](https://medium.com/appsody/nodes-cloud-packaged-fe60e29b699d)” article.

## Using the Metrics endpoint on `/metrics`

The Metrics endpoint that is automatically added as part of the nodejs-express Stack is designed to work with the [Prometheus](https://prometheus.io) open source monitoring system.

While Prometheus can be run anywhere, it is also designed to integrate easily into a Kubernetes environment, and has been embraced by Kubernetes itself — with many of its components exposing metrics for Prometheus to collect.

This means that, once deployed into Kubernetes, you can visualize data both from your application, and from Kubernetes itself.

### Installing and configuring Prometheus

An instance of Prometheus can easily be setup locally by running it in a container, using its container image from DockerHub. To do that, you’ll first need to setup a configuration file to tell Prometheus what to monitor, and then run with that file:

1. Create a file called **prometheus.yml** that contains the following:
```
    # my global config
    global:
      scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
      evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
     # scrape_timeout is set to the global default (10s).

    # A scrape configuration containing exactly one endpoint to scrape:
    scrape_configs:
     # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
      - job_name: 'prometheus'
        static_configs:
        - targets: ['localhost:9090']
     
      - job_name: 'nodejs-app'
        static_configs:
        - targets: ['host.docker.internal:3000']
```

The scrape_configs section tells Prometheus which applications to monitor, their location and port. By default, Prometheus will make http requests on /metrics.

Note that for our nodejs-app, the target has an address of host.docker.internal. This is special address that tells Docker to connect to the localhost of the machine on which the docker container is running.

2. Run Prometheus in a container using docker:
```
docker run --rm -d -p 9090:9090 --name=prometheus -v $PWD/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```
3. Connect to Prometheus in your browser: [http://localhost:9090](http://localhost:9090)

This shows the following view where you can display graphs and data:

![Prometheus Dashboard View](https://cdn-images-1.medium.com/max/2840/1*F5KOAHrAxKbfeM87s_s6zQ.png)*Prometheus Dashboard View*

Before doing that, first see what “targets” Prometheus is collecting data from:

4. Select **Status** > **Targets**

This shows a list of two servers that Prometheus is collecting data from:

![Prometheus Target Status View](https://cdn-images-1.medium.com/max/3300/1*iCbfDAYMhOkMVqvSmp3hfw.png)*Prometheus Target Status View*

This show that Prometheus is collecting data itself as well as your application, and that both have a state of UP.
 
5. Select **Graph** two switch back to the Graph view, and then display some data: 
 a) Enter http_request_duration_microseconds in the **Expression** box
 b) Click on the **Graph** tab

This displays a graph of the the performance of requests to various HTTP endpoints in your application:

![Promethus Graph View with Request Duration Data](https://cdn-images-1.medium.com/max/2744/1*V6OaKFUSCn1WDdyfjB4Y0w.png)*Promethus Graph View with Request Duration Data*

This shows that Prometheus has data for requests against / and /favicon.ico.

6. Next, make some requests of your application in your browser, and refresh the Graph page in the Prometheus dashboard

![Promethus Graph View with Request Duration Data](https://cdn-images-1.medium.com/max/2548/1*tEIbuGPFgnOMY8a3QhWx-w.png)*Promethus Graph View with Request Duration Data*

This now shows the variation in performance as the application is responding to ongoing requests.

Prometheus provides the ability to build simple graphs and alerts. However, it is also designed to be used with more advanced graphing and dashboarding solutions. The most frequently used being Grafana.

### Installing Grafana

[Grafana](https://grafana.com) can also easily be setup and run locally using its container image from DockerHub, and the connect it to the running Prometheus instance. To do that, you’ll first need to run Grafana itself, and then configure it use your Prometheus server so that has access to the data that Prometheus us collecting.

1. Run Grafana in a container using docker:
```
    docker run --rm -d -p 3001:3000 --name=grafana -e “GF_SECURITY_ADMIN_PASSWORD=password” grafana/grafana
```
2. Open the Grafana console: [http://localhost:3001](http://localhost:3001)

3. Login with the following credentials:

* Username: admin

* Password: password

![Grafana Login Page](https://cdn-images-1.medium.com/max/2332/1*kl8-ejpc88Jr34zyzfPW6Q.png)*Grafana Login Page*

Note that the password of password was set using the GF_SECURITY_ADMIN_PASSWORD value when you started the Grafana server using docker.
 
4. In the Home Dashboard display, click on **Add data source**:

![Adding a data source in Grafana](https://cdn-images-1.medium.com/max/3024/1*7Z-oe1udHhYDor4X2XZQkg.png)*Adding a data source in Grafana*

5. Select the **Prometheus** icon for the data source type:

![Selecting the Prometheus data source](https://cdn-images-1.medium.com/max/2568/1*4hxvLa9C-Uu_gq8-09CMsg.png)*Selecting the Prometheus data source*

6. Enter a **URL** of http://host.docker.internal:9090and click **Save & Test**:

![Setting the data source values in Grafana](https://cdn-images-1.medium.com/max/2404/1*Sgm9VB1cIDXhtcAzQFfSog.png)*Setting the data source values in Grafana*

7. Select the **+** button on the left hand side-bar and click on **Dashboard**:

![Creating a new Dashboard in Grafana](https://cdn-images-1.medium.com/max/2244/1*6Ysk2lfnRW-c8pn5o7bPbQ.png)*Creating a new Dashboard in Grafana*

This will create a new dashboard for you, in which you can start to create panels to display visualizations, queries and data.

8. Click on the **Add Query** icon

![Add a new panel using Add Query](https://cdn-images-1.medium.com/max/2320/1*qJjtUyTpxGlzOhNKKayp8w.png)*Add a new panel using Add Query*

This opens a new query and visualization panel.

9. In the entry box next to **A**, enter the following query:
```
    http_request_duration_microseconds
```
and then click on the graph at the top of the panel.

![Adding aquery and creating a graph](https://cdn-images-1.medium.com/max/3024/1*Ft4jMGquH9a9a-i7-MkKew.png)*Adding aquery and creating a graph*

This will now display a chart of the HTTP responsiveness for all of the applications that Prometheus collecting data from.
 
10. Add a filter and calculation to the query so that it only displays data from your application by modifying the query to the following:
```
    http_request_duration_microseconds{job=”nodejs”}/1000 
```
and then click on the graph at the top of the panel.

![Filtered graph, displayed in milliseconds](https://cdn-images-1.medium.com/max/3012/1*5xP1ibNUStXgvcRkxImoWA.png)*Filtered graph, displayed in milliseconds*

This has filtered the graph to only display data from the application with the job name of nodejsn — this is the value you set for your application in the **prometheus.yml** file when you started Prometheus — and then divides the data by 1000 to give a time in milliseconds rather than microseconds.
 
11. Finally, click the “**Disk**” icon at the top of the window to save your dashboard, giving it a name and clicking on the **Save** button.

![Save the Dashboard](https://cdn-images-1.medium.com/max/3016/1*GoyHsHjHYJ6uNUrbI3QAhQ.png)*Save the Dashboard*

Grafana makes it possible to build rich and dynamic dashboards so that you can visualize your data however you wish. It also lets you import pre-built dashboards.

To see the catalog of available dashboards, visit the [Dashboards](https://grafana.com/dashboards) page on Grafana.com.

### Cleaning Up

Finally, to shut down Prometheus and Grafana, you need to stop their running containers. You can do that with the following two commands:

    docker stop prometheus
    docker stop grafana

## Next Steps

This article covered how to build new “Cloud-Native” Express.js application using the nodejs-express Appsody Stack which automatically provides the application with cloud-native capabilities such as liveness and readiness checks, along with metrics and observability.

In the next article: “[Make your Express.js app Cloud-Native with Appsody](https://medium.com/appsody/nodejs-express-enablement-f6fc2609bc00)”, we’ll look at how its possible to take an existing Express.js application and enable it to use the nodejs-express Appsody Stack.

For more information on [Appsody](https://appsody.dev), join us on [Slack](http://appsody-slack.eu-gb.mybluemix.net), follow us on [Twitter](https://twitter.com/appsodydev) and star us on [GitHub](https://github.com/appsody).
