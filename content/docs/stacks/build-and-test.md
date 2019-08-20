---
title: Building and Testing Stacks
path: /docs/stacks/build-and-test
---

# Building and Testing Stacks

Once you have updated/created a stack, using a build.sh script wrapper you can build the specific stack images that you want to create/modify. It identifies which stacks need to be built, builds stack images and templates, generates all repo indexes and then tests the stacks and indexes locally.

## Building a stack locally using build scripts


1. Run build script and specify the stack which need to build as argument e.g.
    ```
      ./ci/build.sh . incubator/nodejs-express
    ```

1. Add appsody repository by running:
    ```

    appsody repo add <local-repo-name> file://$PWD/ci/assets/<local-stack-repo>
    ```

Note: `<local-stack-repo>` can be `incubator-index-local.yaml` or `experimental-index-local.yaml` or `stable-index-local.yaml`


For example:
    ```
    appsody repo add my-repo file://$PWD/ci/assets/experimental-index-local.yaml
    ```

Now that you have built the stack, you can run all the normal appsody commands on the local stack.

## Building a stack image locally without build scripts
To build your stack image locally follow the below steps:
1. Navigate to the `/image` directory:
1. Build stack image:
    ```
    docker build -t <org-name>/<stack-id> -f Dockerfile-stack .
    ```
    You can now have access to the stack image to use and test locally.

### Pointing a template to use a specific stack image
1. Navigate to template directory
    ```
    cd /templates/<template-name>
    ```
1. Edit `.appsody-config.yaml` to use your stack:
    ```
    stack: <org-name>/<stack-id>
    ```
1. Run the template with the new stack image:
    ```
    appsody run
    ```
