---
title: "Appsody in Autumn: project update"
date: "2019-09-27"
author: "David Harris"
imagePath: "http://localhost:8000/static/e05283c91c0cc09f39645b4b283a68a7/8dcf2/autumn.jpg"
---

# Appsody in Autumn: project update

![Autumn](./resources/autumn.jpeg)

It’s been a busy couple of months since we publicly launched as an open source project, full of fixes, features and (cloud) functions. If you’ve not tried Appsody yet, head over to [appsody.dev](https://appsody.dev), create cloud native applications and live your best life.

## Doubling the number of Stacks

Appsody stacks, “enable rapid development of quality microservice-based applications. Stacks include a base container image and project templates which act as a starting point for your application development.” (Shamelessly lifted from our [docs](https://appsody.dev/docs/stacks/stacks-overview)).

We started out with **5 Stacks**: nodejs; nodejs-express; java-microprofile; java-spring-boot2; swift.

Thanks to some great new folks to the project — **there are now 11**.

### Newly available Stacks

* [Quarkus](https://github.com/appsody/stacks/tree/master/experimental/quarkus): a “Kubernetes Native Java stack”. Quarkus is an open source project sponsored by Red Hat, which you can discover [here](https://quarkus.io/). Thanks to [Paul](https://github.com/paulrobinson) for this stack!

* [Node.js Functions](https://github.com/appsody/stacks/tree/master/experimental/nodejs-functions): an extension to the existing nodejs-express stack, allowing you to build functions using the same “Connect Middleware” API from Express.js. For example:

    var handler = function handler(req, res, next) {
        res.send('Hello from Appsody!')
    }

* [LoopBack4](https://github.com/appsody/stacks/tree/master/incubator/nodejs-loopback): a powerful Node.js framework built in TypeScript, which helps you easily build REST APIs and microservices. Thanks [Raymond](https://github.com/raymondfeng)!

* [Spring Boot on Open Liberty](https://github.com/appsody/stacks/tree/master/experimental/java-spring-boot2-liberty): allowing you to develop Spring Boot 2 applications and run on Open Liberty with OpenJ9 — an open source JVM ideal for cloud deployments, see the comparison with HotSpot [here](https://www.eclipse.org/openj9/oj9_performance.html).

* [Python Flask](https://github.com/appsody/stacks/tree/master/incubator/python-flask): a new language for Appsody! This stack uses Python 3.7 and Flask 0.11.1 and enables health checking and application metrics out of the box. It also uses [flasgger](https://github.com/flasgger/flasgger) to auto-generate Swagger UI documentation and specification(thanks [Henry](https://github.com/henrynash)!).

* [Eclipse Vert.x](https://github.com/appsody/stacks/tree/master/experimental/vertx): a “toolkit for building reactive applications on the JVM”. This Stack is based on Vert.x V3.8.0 and the template application provides a simple JAX-RS “Hello World”. Thanks [Erik](https://github.com/edewit)!

### It doesn’t stop here

Growing the number of Stacks remains a priority for us. We want to give developers as much choice as possible, and to be able to work with their preferred technologies when building cloud-native microservices.

With that in mind, we are trying to make it easier to provide new Stacks, both from a technology perspective — like updating the CLI to help create stacks ([#45](https://github.com/appsody/appsody/issues/45) & [#199](https://github.com/appsody/stacks/issues/199)) — and in terms of guidance, such as improving the docs with our new ‘[building and testing stacks’](https://appsody.dev/docs/stacks/build-and-test) section. We also have the #stack-providers channel in our [Slack](http://appsody-slack.eu-gb.mybluemix.net/) for any and all questions you might have.

## Appsody CLI

At time of writing we’re at V0.4.5 and I would strongly encourage you to keep up to date! We have provided a new warning message when using a backdated version of the CLI to help here.

Here’s some of the new functionality introduced so far:

* Work with multiple repositories: you can specify a repo when using the init cmd to initialise a new project and start building an application i.e. appsody init <repository>/<stack> . You can also set a default repository with appsody repo set-default

* Support for the Appsody Operator (more on that later…)

* Pass options to ‘docker run’ in appsody[run/debug/test] and to ‘docker build’ in appsody build via the --docker-options flag

* Support for buildah in appsody extract allowing you to run in environments where docker-in-docker is not viable.

* Support for interactive stacks: you can now use --interactive to attach STDIN to the container for interactive TTY mode.

For a full list of updates — you can peruse the release notes [here](https://github.com/appsody/appsody/releases).

## Appsody.dev

We basically built the website in a 2 week sprint. That’s pretty cool in itself, and credit to [Gatsby](https://www.gatsbyjs.org/).js being intuitive enough for two developers to learn it from scratch and produce this so quickly.

We’ve exponentially expanded the amount of documentation under [appsody.dev/docs](https://appsody.dev/docs) … which is a bit of a double edged sword. So one of the things we’re going to focus on in the near future is ensuring our documentation is easily consumable and intuitive. You’ll start to notice tasks in the website repo such as [https://github.com/appsody/website/issues/259](https://github.com/appsody/website/issues/259), please feel free to jump in and comment.

Alternatively, as always, come chat to us in slack or raise an issue of your own.

We’ve also added exciting new features like a search bar 🎉

We also have an [FAQ](https://appsody.dev/docs/faq) section — which yes, we know still needs a lot of work. However, ultimately our *intent* here is that we’ll take questions that come in through Github/Slack/wherever, create a new issue and decide whether this is a bug, a lack of documentation, an inaccuracy in documentation, or something that warrants a Q&A-style post that you might expect on something like StackOverflow… but without us or Appsody users needing to go to StackOverflow.

## Appsody Operator

“Operators implement and automate common Day-1 (installation, configuration, etc) and Day-2 (re-configuration, update, backup, failover, restore, etc.) activities in a piece of software running inside your Kubernetes cluster, by integrating natively with Kubernetes concepts and APIs.” — [https://operatorhub.io/what-is-an-operator](https://operatorhub.io/what-is-an-operator)

Well, we’ve now got one for Appsody! Allowing you to deploy Appsody apps into OKD or OpenShift Clusters.

Check out the [user guide](https://github.com/appsody/appsody-operator/blob/master/doc/user-guide.md) or see it in action [here](https://github.com/appsody/appsody-operator/blob/master/demo/README.md).

## What’s next

* Open meetings and planning: we’re hoping to set up calls anyone can join to discuss their ideas/issues/PRs

* More stacks : Rust; more Java, Node.js and Swift stacks; and as always — we welcome contributions!

* Redesigned docs page

* More tutorials!

* Self describing docker images for easier management

* Running Appsody on Kubernetes

## TTFN

Hopefully this was a relatively interesting read, and gave you some insight into the work thats happened within the Appsody project recently. Trying to distill the results of ~400 closed GitHub issues into a 5 min read is a little tricky.

Please clap and comment if you’d like to see something like this again in the future, or if you have any other suggestions on content you’d like to see.

### Stay in touch

* Medium: [appsody](https://medium.com/appsody)

* Twitter: [appsodydev](https://twitter.com/appsodydev)

* Slack: [http://appsody-slack.eu-gb.mybluemix.net/](http://appsody-slack.eu-gb.mybluemix.net/)

* GitHub: [appsody](https://github.com/appsody)
