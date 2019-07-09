---
title: "Creating and Modifying Stacks"
path: /docs/stacks/create-or-modify
section: Appsody Stacks
---
# Creating and Modifying Stacks

You might want to modify an existing stack to suit your development needs, for example you might want to use a different library or runtime version from an existing stack. We are actively working to create new stacks so that more people can adopt Appsody. If you find that none of the existing stacks meet your needs please reach out to us on the [Appsody Slack](https://appsody-slack.eu-gb.mybluemix.net/) or create a new GitHub issue to track the discussion.

We always welcome any contributions. If you want to [create](#Creating-a-stack) or [modify](#Modifying-a-stack) a stack, please review the [contributing guidelines](https://github.com/appsody/docs/blob/master/CONTRIBUTING.md) and [code of conduct](https://github.com/appsody/docs/blob/master/CODE_OF_CONDUCT.md).

Use the following examples to help you get started creating, or modifying stacks. Stacks contain specific files laid out in a particular directory tree, you can learn more about these in our [structure of a stack](/docs/stacks/stack-structure.md) guide. This knowledge will be helpful if you'd like to create or modify stacks.

## Creating a stack

The quickest way to create an Appsody stack from scratch is to build from the [sample stack](https://github.com/appsody/stacks/tree/master/samples/sample-stack/README.md) which is provided in this repository. Clone the sample:

1.
    ```bash
    git clone https://github.com/appsody/docs
    cd docs/sample-stack
    ```

2. Create your stack. See [structure of a stack](/docs/stacks/stack-structure.md) for a guide on what makes a stack.

3. In the image folder build your stack image:

    ```bash
    docker build -t <user>/<my-stack> -f Dockerfile-stack .
    ```

3. Test your stack:

    ```bash
    cd ../templates/sample
    appsody run
    ```

Note: If you are contributing a new template for an existing stack, just open a pull request in the stacks repo.

## Modifying a stack

If you want to modify an existing Appsody stack, clone the stacks repo and then navigate to the stack you want to modify. Here is an example:

1. Clone the GitHub repository:

    ```bash
    git clone https://github.com/appsody/stacks
    cd incubator/java-spring-boot2/image
    ```

2. Make your changes to the stack's image

3. Build the `java-spring-boot2` stack image:

    ```bash
    cd incubator/java-spring-boot2/stack
    docker build -t <user>/spring-boot2-image -f Dockerfile-stack .
    ```

4. Change the stack image in `.appsody-config.yaml` to point to your image:

    ```bash
    cd ../templates/default
    ```
    `stack: <user>/spring-boot2-image:0.2`

6. Save and run the application in the default template:

    ```bash
    appsody run
    ```

Contribute the stack by opening a PR to the stacks repo!
