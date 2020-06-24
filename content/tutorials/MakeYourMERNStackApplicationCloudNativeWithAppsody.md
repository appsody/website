---
title: "Make your MERN stack application cloud-native with Appsody"
date: "2020-05-21"
author: "Andrew Hughes"
tutorial: "true"
length: "45 mins"
---

# Make your MERN stack application cloud-native with Appsody

This tutorial shows you how to take your existing MERN (MongoDB, ExpressJS, ReactJS, and Node.js) stack application and
convert it into a cloud-native application using the open source [Appsody](https://appsody.dev) project.

Specifically, we show you how to use Appsody's `nodejs-express` stack to create a simple ToDo list application from the [CloudNativeJS MERN workshop](https://github.com/CloudNativeJS/mern-workshop). By using an Appsody stack, you can delegate your chosen cloud technologies and standards to the stack which ensures consistency and reliability across your applications that use this stack.

## Introduction to Appsody

[Appsody](https://appsody.dev) is an open source project that helps you create containerized applications for the cloud. Appsody applications use pre-configured application stacks that have built in cloud native capabilities, such as health checks and metrics to be used for [Prometheus](https://prometheus.io/) monitoring. The Appsody CLI allows you to run, build, and test your application locally before deploying to Kubernetes. By using Appsody you can develop cloud native applications ready to be deployed to Kubernetes without being an expert on the underlying container technology.

## Prerequisites

To follow the step in tutorial, you need to:

* [Install the Appsody CLI](https://appsody.dev/docs/getting-started/installation)
* [Install Kubernetes](https://kubernetes.io/docs/setup/)
* [Install Helm](https://helm.sh/docs/intro/install/)

You will also need to clone the MERN stack application:

```sh
git clone https://github.com/CloudNativeJS/mern-workshop.git
cd mern-workshop
```

## Converting your application to an Appsody application

### MongoDB database

This application uses a MongoDB database, so you need to start a MongoDB docker container using the following commands:

```sh
docker pull mongo
docker run -d -p 27017:27017 --name mern-mongo mongo
export MONGO_URL=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mern-mongo)
```

This creates an instance of MongoDB listening on port `27017` and also sets the environment variable `MONGO_URL` which you will use in your backend application.

### Back-end Express application

Start by enabling Appsody for the back-end Express.js application:

```sh
cd backend
appsody init nodejs-express none
```

This downloads the latest Appsody nodejs-express stack and also creates a `.appsody-config.yaml` file. You can use this yaml file to configure the name of your Appsody project and stack and its version used in the project. At the time of this writing, that's nodejs-express version 0.4, but updates are posted frequently.

Appsody should now be enabled for the back-end application. However you need to make a couple of adjustments to the code before the application will work with Appsody. Start by replacing the code in `server/routers/index.js` with the code shown below:

```js
module.exports = function(options){
  const express = require('express');
  const app = express();

  require('./mongo')(app, options.server);

  return app;
};
```

The Appsody `nodejs-express` stack includes a pre-configured Express.js app with cloud-native features, such as health checks and monitoring. You need to export your app with module.exports, so it can be consumed by this stack-provided application.

Next, use the following command to remove all the duplicate files that you no longer need, as you are delegating these features to the Appsody stack:

```sh
rm -rf .dockerignore chart Dockerfile scripts public sever/server.js server/routers/health.js server/routers/public.js
```

The following duplicate features have been removed:

1. [appmetrics-dash](https://www.npmjs.com/package/appmetrics-dash) and [appmetrics-prometheus](https://www.npmjs.com/package/appmetrics-prometheus). These application monitoring libraries are included in the nodejs-express stack by default, so we no longer need to require them in our application. appmetrics-prometheus will provide a `/metrics` endpoint for use with
Prometheus monitoring. appmetrics-dash provides a web-based dashboard at `/appmetrics-dash` showing performance metrics of the application.

2. The HTTP server for the application stack can now be accessed using options.server instead of requiring HTTP.

3. log4js has been removed as the nodejs-express stack provides [Pino](http://getpino.io/#/) logging.

4. Both `app.use` have been removed as they are used to catch all undefined routes and provide a 404 error. The nodejs-express stack already provides this feature.

Now that you made the adjustments to `index.js`, you need to update the `package.json`. Start by adding a main field that defines the entry point of the application for Appsody.

```json
{
  "name": "node-backend",
  "version": "1.0.0",
  "description": "Cool MERN app for Docker/Kubernetes",
  "private": true,
  "main": "server/routers/index.js",
  "engines": {
    "node": "^12.14.1"
  },
  "scripts": {
    "start": "node server/server.js",
    "build": "NODE_ENV=production webpack"
  },
  "dependencies": {
    "appmetrics-dash": "^5.3.0",
    "appmetrics-prometheus": "^3.1.0",
    "body-parser": "^1.17.1",
    "connect-mongo": "^3.2.0",
    "cors": "^2.8.4",
    "express": "^4.15.3",
    "log4js": "^3.0.5",
    "mongoose": "^5.8.11"
  }
}
```

You can also remove the appmetrics-dash and appmetrics-prometheus dependencies as these are already included in the nodejs-express stack.

```sh
npm uninstall appmetrics-prometheus appmetrics-dash
```

The application should now be fully compatible with Appsody and can be started with:

```sh
appsody run  --docker-options "-e MONGO_URL"
```

The application will be running on port 3000. You passed the MONGO_URL environment variable to Appsody using the `--docker-options` option. While the application is running, any code changes you make will cause your application to restart and the changes reflected immediately to your container. You will also get access to the additional cloud-native capabilities of the Appsody nodejs-express stack:

Appsody endpoints:

- Liveness endpoint: <http://localhost:3000/live>
- Readiness endpoint: <http://localhost:3000/ready>
- Prometheus metrics endpoint: <http://localhost:3000/metrics>
- Metrics dashboard: <http://localhost:3000/appmetrics-dash> (development only)

Application-defined endpoints:

- Health endpoint: <http://localhost:3000/health>
- API endpoint: <http://localhost:3000/api/todos>

The metrics dashboard is only available during development and is not included in images built using `appsody build`.

## Deploy your application to Kubernetes

Now that you have converted your application to use the `nodejs-express` stack, you can use the `appsody deploy` command to deploy microservices to a [Kubernetes](https://kubernetes.io/) cluster. To follow the rest of this
tutorial you will need the following pre-requisites installed:

- [Kubernetes](https://kubernetes.io/docs/setup/)

- [Helm](https://helm.sh/docs/intro/install/)

### MongoDB database

To deploy a MongoDB database to Kubernetes, we use [Helm](https://helm.sh), a package manager for Kubernetes that allows you to install application charts into your Kubernetes cluster.

Start by configuring Helm to use charts from the *stable* Helm repository.

```sh
helm repo add stable https://kubernetes-charts.storage.googleapis.com
```

Now you can deploy MongoDB into your cluster using the stable Helm chart.

```sh
helm install mongo --set replicaSet.enabled=true,service.type=LoadBalancer,replicaSet.replicas.secondary=3 stable/mongodb
```

Run the command `kubectl get all` and you should see the following:

```sh
NAME                                    READY   STATUS    RESTARTS   AGE
pod/mongo-mongodb-arbiter-0             1/1     Running   0          21s
pod/mongo-mongodb-primary-0             0/1     Running   0          21s
pod/mongo-mongodb-secondary-0           0/1     Running   0          21s
pod/mongo-mongodb-secondary-1           0/1     Running   0          21s
pod/mongo-mongodb-secondary-2           0/1     Running   0          21s


NAME                             TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)           AGE
service/kubernetes               ClusterIP      10.96.0.1       <none>        443/TCP           7d1h
service/mongo-mongodb            LoadBalancer   10.102.160.21   <pending>     27017:32574/TCP   21s
service/mongo-mongodb-headless   ClusterIP      None            <none>        27017/TCP         21s


NAME                                          DESIRED   CURRENT   READY   AGE
replicaset.apps/appsody-operator-7ff45fd6cc   1         1         1       3d4h

NAME                                       READY   AGE
statefulset.apps/mongo-mongodb-arbiter     1/1     21s
statefulset.apps/mongo-mongodb-primary     0/1     21s
statefulset.apps/mongo-mongodb-secondary   0/3     21s
```

It may take a few minutes for all your pods to be `1/1 READY`. You can watch them become available using `kubectl get pods --watch`. Once they are all ready, you can carry on with the next steps in this tutorial.

### Back-end Express application

Now we have a MongoDB database deployed to our Kubernetes cluster, we can deploy the backend application. Before we can deploy the application we need to modify the connection URL, because the deployed database uses a username and password.
This means we need to edit the `mongoConnect` variable in the file `server/routers/mongo.js` to the following.

```js
let mongoConnect = `mongodb://${MONGO_CONFIG.mongoUser}:${MONGO_CONFIG.mongoPass}@${MONGO_CONFIG.mongoURL}:27017`;
```

Run the following command to build your production-ready Docker image and generate a deployment manifest file.

```sh
appsody build
```

A new file, `app-deploy.yaml` should have been created in the back-end directory. You can use this file to deploy your application to Kubernetes. Before you can deploy the application, you need to add a few environment variables to the deployment config.

To do this, simply add the password for the database to the blank value field and then add this yaml to the deployment config under the `spec` field.

```yaml
env:
  - name: MONGO_URL
    value: mongo-mongodb
  - name: MONGO_USER
    value: root
  - name: MONGO_PASS
    value:
```

To get the password for the MongoDB database, run the following command:

```sh
echo $(kubectl get secret --namespace default mongo-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)  
```

The `spec` section of your `app-deploy.yaml` should now look like the following:

```yaml
spec:
  applicationImage: "dev.local/backend"
  createKnativeService: false
  env:
  - name: MONGO_URL
    value: mongo-mongodb
  - name: MONGO_USER
    value: root
  - name: MONGO_PASS
    value: XXXX
  expose: true
  livenessProbe:
    failureThreshold: 12
    httpGet:
      path: /live
      port: 3000
    initialDelaySeconds: 5
    periodSeconds: 2
  monitoring:
    labels:
      k8s-app: backend
  readinessProbe:
    failureThreshold: 12
    httpGet:
      path: /ready
      port: 3000
    initialDelaySeconds: 5
    periodSeconds: 2
    timeoutSeconds: 1
  service:
    annotations:
      prometheus.io/scrape: "true"
    port: 3000
    type: NodePort
  stack: nodejs-express
  version: 1.0.0
```

This approach is not normally recommended for environment variables that should be kept secret, such as passwords. For those environment variables, you should use [Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/#creating-a-secret-manually). For simplicity, we skipped that step.

Now deploy the backend to your Kubernetes cluster using:

```sh
appsody deploy --no-build
```

We used the `--no-build` option as we built our production-ready Docker container in the last step using `appsody build`, so there's no need to rebuild it.

Once it has finished deploying, you should see a message like the following.

```sh
Found deployment manifest /Users/andrewhughes/mern-blog/mern-workshop/backend/app-deploy.yaml
Using namespace default for deployment
Attempting to get resource from Kubernetes ...
Running command: kubectl get pods "-o=jsonpath='{.items[?(@.metadata.labels.name==\"appsody-operator\")].metadata.namespace}'" --all-namespaces
Attempting to get resource from Kubernetes ...
Running command: kubectl get deployments "-o=jsonpath='{.items[?(@.metadata.name==\"appsody-operator\")].metadata.namespace}'" -n default
Attempting to get resource from Kubernetes ...
Running command: kubectl get pod "-o=jsonpath='{.items[?(@.metadata.labels.name==\"appsody-operator\")].metadata.name}'" -n default
Attempting to get resource from Kubernetes ...
Running command: kubectl exec -n default -it appsody-operator-7ff45fd6cc-xzxwk -- /bin/printenv WATCH_NAMESPACE
Attempting to apply resource in Kubernetes ...
Running command: kubectl apply -f /Users/andrewhughes/mern-blog/mern-workshop/backend/app-deploy.yaml --namespace default
Appsody Deployment name is: backend
Running command: kubectl get rt backend -o "jsonpath=\"{.status.url}\"" --namespace default
Attempting to get resource from Kubernetes ...
Running command: kubectl get route backend -o "jsonpath={.status.ingress[0].host}" --namespace default
Attempting to get resource from Kubernetes ...
Running command: kubectl get svc backend -o "jsonpath=http://{.status.loadBalancer.ingress[0].hostname}:{.spec.ports[0].nodePort}" --namespace default
Deployed project running at http://localhost:31811
```

Your Appsody `nodejs-express` application should now be successfully deployed to Kubernetes. If you want to test it before you deploy your frontend application, try a POST request to http://localhost:31811/api/todos with the following body:

```json
{
   "task": "appsody task",
   "author": "appsody"
}
```

Alternatively using cURL:

```sh
curl -X POST -H 'Content-Type: application/json' -d "{\"author\":\"appsody\",\"task\": \"appsody task\"}" http://localhost:31811/api/todos
```

Now if you go to the [http://localhost:31811/api/todos](http://localhost:31811/api/todos) in your browser, you should see the task you just sent. Note that the port number used in the URLs in this tutorial may be different to the port number of your Appsody application.

### Front-end React application

To deploy the front-end application to Kubernetes, use the Helm charts that are in the charts directory. These charts are a predefined way to deploy your application to Kubernetes. In this case, the charts have already been created for this application. Normally, you would have to write your own chart to define how you want to deploy your application to Kubernetes.

Before you can deploy your application, you need to make a small adjustment to the `API_URL` variable in the file `src/containers/App.js` in the `frontend` directory to use the new port of the backend application deployed to Kubernetes.

```js
const API_URL = 'http://localhost:BACKEND_PORT/api/todos';
```

Build the Docker image for the front-end application using the following:

```sh
cd frontend
docker build -f Dockerfile -t frontend:v1.0.0 .
```

Now that have you built the Docker container, deploy it to Kubernetes with Helm using the following:

```sh
helm install frontend chart/frontend
```

You can view your deployed frontend, backend, and MongoDB in Kubernetes using:

```sh
kubectl get pods
```

Port-forward the application to port `30555` using the following command:

```sh
kubectl port-forward service/frontend-service 30555:80
```

The front-end application should now be accessible at <http://localhost:30555>

You have now successfully taken your MERN stack application, converted it to an Appsody application, and deployed it to Kubernetes. If you want to find out more about Appsody chat to us in
[Slack](appsody-slack.eu-gb.mybluemix.net).
