---
title: Glossary
---

# Glossary
Learn about terms and definitions that are related to the Appsody project.

## A

>### Appsody
Appsody stacks contain software components that provide the foundation for building applications that run in containers. Stacks are an easy way to manage consistency and adopt best practices across many applications. Stacks are available for different language runtime environments and frameworks, which can be customized to suit local needs. A stack includes a base container image (see Dockerfile-stack), and project templates that act as a starting point for application development.

>### Appsody CLI
The Appsody command-line interface supports the full application development lifecycle; creating stacks, creating applications based on stacks, testing and debugging your applications, and deployment to Kubernetes.  

>### Appsody controller
The controller manages a running application inside the Appsody development container. It monitors file changes in the application source and provides live updates to the application running in the container.  

>### Appsody operator
The operator manages the deployment of applications that are developed using Appsody to Kubernetes environments.  

## D

>### Dockerfile
Dockerfile combines your application and the stack to build a production image, ready for deployment.  
&thinsp;  
For more information on Dockerfiles see the official [Docker documentation](https://docs.docker.com/engine/reference/builder).

>### Dockerfile-stack
Dockerfile-stack is a Dockerfile that builds a stack container image used during development.  
&thinsp;  
For more information on Dockerfiles see the official [Docker documentation](https://docs.docker.com/engine/reference/builder).

## P

>### Project Template
Project templates provide a starting point, typically a ‘Hello World’ application, for application development. Like other components within an Appsody stack, you can customize project templates and share them across teams.
