---
title: "Overview"
path: /docs
---
# Welcome to Appsody
Appsody has been designed to help you compose a masterpiece of an application for cloud.

Our aims were to simplify the experience for developers - now asked to have full-stack expertise and responsibilities, and allow them to focus on their application code; and to enable architects to curate an opinionated set of technologies - configurable, reusable and already infused with cloud native capabilities.

There are 3 key components of Appsody:

### Appsody Stacks
These are configurable technology stacks built with popular runtimes and frameworks, such as Java with Eclipse Microprofile and Node.js with Express, that provide the foundation for building applications which can be deployed and managed effectively in Kubernetes. Stacks allow for rapid development, whilst giving the stack provider the ability to control how the applications are composed, for example which security policies are applied, or which version of a dependency is pulled.

[More info on Appsody Stacks](/docs/stacks/stacks-overview.md)

### Appsody Hub
The central point of control for Appsody Stacks. This is where you can find available stacks, create new stacks or modify existing ones. You can utilize what's in the public repo, and/or clone to provide a private/internal Hub based on your requirements. By making changes to the Stacks in the Hub, you are able to mass-apply updates to applications which have been built on these, simply by restarting the application.

### Appsody CLI
No project is complete without a nice new CLI to play with. The Appsody CLI is powerful and intuitive, and allows developers to discover available stacks, bring them into their local development environment, and build/run/test/deploy locally. The Docker container, which is built for your application, can be integrated with Tekton pipelines as described [here](/docs/using-appsody/building-and-deploying.md#Deploying-your-app-through-a-Tekton-pipeline) and deployed to Kubernetes cloud environments.

[More info on Appsody CLI](/docs/using-appsody/cli-commands.md)

## How does it work?

Appsody provides pre-configured application stacks, which use the well-known Dockerfile syntax to specify which language runtimes, frameworks, libraries and tools are included.

Project templates build upon these stacks, and provide developers with a templatised application to bring into their IDE of choice and begin development.

When developers run, debug or test their application using the Appsody CLI, it starts a container with the stack image, makes the development workspace available to the running container, and starts the Appsody controller. This is configurable through environment variables in the stack, and manages the application within the running container. For example, the controller can watch for changes in the application `/src` directory, and when these are saved - it will restart the application running in a docker container.

## Contributing

We welcome all contributions, see [CONTRIBUTING](https://github.com/appsody/docs/blob/master/CONTRIBUTING.md) and come chat to us in [Slack](https://appsody-slack.eu-gb.mybluemix.net/) if you'd like to get involved).

Want to see your framework available as an Appsody Stack? See [Creating and Modifying Stacks](/docs/stacks/create-or-modify.md) and join the `#stack-providers` channel on the above Slack to introduce yourself!

## Documentation

Follow the links to learn more about Appsody:

### Getting Started
- [Installing Appsody](/docs/getting-started/installation.md)
- [Quick Start](/docs/getting-started/quick-start.md)
### Stacks
- [Stacks Overview](/docs/stacks/stacks-overview.md)
- [Creating and Modifying Stacks](/docs/stacks/create-or-modify.md)
- [Stack Structure](/docs/stacks/stack-structure.md)
### Using Appsody
- [Creating Project](/docs/using-appsody/creating-project.md)
- [Local Development](/docs/using-appsody/local-development.md)
- [Building and Deploying](/docs/using-appsody/building-and-deploying.md)
- [CLI commands](/docs/using-appsody/cli-commands.md)

## License
This project is licensed under the Apache 2.0 license, and all contributed stacks must also be licensed under the Apache 2.0 license. Each contributed stack should include a LICENSE file containing the Apache 2.0 license. More information
can be found in the LICENSE file or online at

http://www.apache.org/licenses/LICENSE-2.0
