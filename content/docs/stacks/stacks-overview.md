---
title: "Stacks Overview"
path: /docs/stacks/stacks-overview
section: Appsody Stacks
---
# Appsody Stacks

Appsody provides pre-configured application stacks that enable rapid development of quality microservice-based applications. Stacks include a base container image and project templates which act as a starting point for your application development.

Appsody stacks include language runtimes, frameworks and any additional libraries and tools that are required to simplify your local application development. Stacks are an easy way to manage consistency and adopt best practices across many applications.

**Template:** A template utilizes the base image and provides a starter application that is ready to use. It leverages existing capabilities provided by that image and can extend functionality to meet your application requirements.

---
Stacks are categorized as either `stable`, `incubator` or `experimental` depending on the content of the stack.

- `stable/`: Stable stacks meet this set of [technical requirements](https://github.com/appsody/docs/blob/master/STABLE_TECHNICAL_REQUIREMENTS.md).

- `incubator/`: The stacks in the incubator folder are actively being worked on to satisfy the stable criteria.

- `experimental/`: Experimental stacks are not being actively been worked on and may not fulfill the requirements of an Appsody stack. These can be used for trying out specific capabilities or proof of concept work.

## Getting started
Follow our [Quick Start Guide](/docs/getting-started/quick-start.md) to get you up and running with Appsody.

To find a list of existing stacks that are available to you:
- Visit the [Appsody website](https://appsody.dev) or
- Run the `appsody list` command within the Appsody CLI

For information on Appsody local development go [here](/docs/using-appsody/local-development.md).

## Modifying existing stacks
You might want to modify an existing stack to suit your development needs, for example you might want to use a different library or runtime version.

To learn how to go about modifying an existing stack go to [modifying a stack](create-or-modify.md#modifying-a-stack).

## Creating new stacks
We are actively working to create new stacks so that more people can adopt Appsody. If you find that none of the existing stacks meet your needs please reach out to us on the [Appsody Slack](https://appsody-slack.eu-gb.mybluemix.net/) or create a new GitHub issue to track the discussion.

We always welcome any contributions. If you wanted to create your own stack for a framework or language that we do not currently support, please review the [contributing guidelines](https://github.com/appsody/docs/blob/master/CONTRIBUTING.md) and follow the steps outlined in [creating a stack](create-or-modify.md#creating-a-stack).

## Need help?
If you have a question that you can't find an answer to, we would also like to hear about that too. You can reach out to the community for assistance on [Slack](https://appsody-slack.eu-gb.mybluemix.net/).
