---
title: Testing Stacks
---

# Testing Stacks

After you create, or update a stack the next consideration is to test the stack to check that it meets your needs. You can use the `appsody stack validate` command to validate a stack in your local Appsody development environment. Validate performs several operations (lint, package, init, run, test, build) against the stack and provides a summary of these operations.

## Testing using Appsody CLI stack validate

1. Navigate to the root directory of the stack you want to test e.g. `cd my-stack`.

2. Run `appsody stack validate` to validate your stack locally.

Validate runs the following operations: lint, package, init, run, test, and build.  Next, the operations that make up the validate command are described in more detail:

### Lint

The lint test statically analyzes your source code to verify that it conforms to the structure of an Appsody stack. It informs you of missing files, or directories and warns you if your stack might be enhanced.

If you don't want to run the lint test as part of the validate operations, you can use the `--no-lint` flag as follows:

`appsody stack validate --no-lint`

If the `stack validate` command reports problems in the lint test, you can also run the lint command on its own as follows:

`appsody stack lint`

### Package

Builds the stack images and templates and generates an Appsody repository index that you can use for local testing. See [Packaging a stack]() for more details.

If you don't want to run the package command as part of the validate operations, you can use the `--no-package` flag as follows:

`appsody stack validate --no-package`

If the `stack validate` command reports problems in packaging, you can also run the package command on its own as follows:

`appsody stack package`

### Testing creating, running, building and testing Appsody projects

After your stack is linted and packaged, the stack is validated by initializing, running, testing, and building an Appsody project by using the default template in your stack. To test the creation and running of Appsody projects only, you can turn off linting and packaging for your stack as follows:

`appsody stack validate --no-lint --no-package`

### Init

This step initializes an Appsody project that uses the default project template from your stack. This produces a local containerized development environment for your stack.

This operation runs the `appsody init <stack>` command (link to Initializing Appsody Projects page?) against your stack.

### Run

The run command starts the Appsody development container that was created during initialization. In `run` mode Appsody watches your local project directory for file changes and updates the application to reflect code changes as you develop.

This operation runs the `appsody run` command against your stack (link to local devt page?).

### Test

The test command runs the project's test suite in the Appsody development container. The test suite is composed of generic tests in the stack which verify the capabilities provided by the stack are working as expected and any tests that are defined within the template.

This operation runs the `appsody test` command against your stack.

### Build

The build command generates a production Docker image ready for deployment to your runtime platform of choice.

This operation runs the `appsody build` command against your stack.

### Summary

Summarizes the results of running the validate command, by providing an overall Passed or Failed status and a summary of the operations within it.
