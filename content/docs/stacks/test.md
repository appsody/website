---
title: Testing Stacks
---

# Testing Stacks

After you create, or update a stack the next consideration is to test the stack to check that it meets your needs. To validate a stack in your local Appsody development environment, use the `appsody stack validate` command. Validate performs several operations (lint, package, init, run, test, build) against the stack and provides a summary of these operations. After your stack is linted and packaged, the stack is validated by initializing, running, testing, and building an Appsody project against the default template in your stack.

Packaging the stack does not logically form part of validation, it is included because the tests that are run as part of the `validate` command depend on the stack being packaged.

## Testing using Appsody CLI stack validate

1. Navigate to the root directory of the stack you want to test e.g. `cd my-stack`.

2. Run `appsody stack validate` to validate your stack locally.

Validate runs the following operations: lint, package, init, run, test, and build.  Next, the operations that make up the validate command are described in more detail:

### Lint

Runs the [`appsody stack lint`](/content/docs/using-appsody/cli-commands.md/#appsody-stack-lint) command.

The lint test statically analyzes your source code to verify that it conforms to the structure of an Appsody stack. It informs you of missing files, or directories and warns you if your stack might be enhanced.

### Package

Runs the [`appsody stack package`](/content/docs/using-appsody/cli-commands.md/#appsody-stack-package) command.

Builds the stack images and templates and generates an Appsody repository index that you can use for local testing. See [Packaging Stacks](/content/docs/using-appsody/package) for more details.

If your stack is already packaged and you don't want to run the `package` operation as part of validate, you can use the `--no-package` flag as shown in the following command:

`appsody stack validate --no-package`

### Init

Runs the [`appsody init <stack>`](/content/docs/using-appsody/cli-commands.md/#appsody-init) command.

This step initializes an Appsody project that uses the default project template from your stack. See [Initializing Appsody Projects](/content/docs/using-appsody/initializing-project) for more details.

### Run

Runs the [`appsody run`](/content/docs/using-appsody/cli-commands#appsody-run) command.

The run command starts the Appsody development container that was created during initialization. In `run` mode Appsody watches your local project directory for file changes and updates your application to reflect code changes as you develop. See [Local Development](/content/docs/using-appsody/local-development) for more details.

### Test

Runs the [`appsody test`](/content/docs/using-appsody/cli-commands#appsody-test) command.

The test command runs the project's test suite in the Appsody development container. The test suite is composed of generic tests in the stack, which verify the capabilities provided by the stack are working as expected, and any custom tests that are defined within the template.

### Build

Runs the [`appsody build`](/content/docs/using-appsody/cli-commands.md/#appsody-build) command against your stack.

The build command generates a production Docker image ready for deployment to your runtime platform of choice. See [Getting ready to deploy your Appsody project](/content/docs/using-appsody/building-and-deploying) for more details.

### Summary

Running the six operations that form the `validate` command produces a significant amount of output. To help you spot any issues, a summary is provided at the end of the output. It provides a result for each of the operations and a total for the overall number of passed and failed operations. The following summary output shows the result of running `validate` against the starter stack:

```
@@@@@@@@@ Validate Summary Start @@@@@@@@@@
PASSED: Lint for stack: starter
PASSED: Package for stack: starter
PASSED: Init for stack: starter
PASSED: Run for stack: starter
PASSED: Test for stack: starter
PASSED: Build for stack: starter
Total PASSED: 6
Total FAILED: 0
@@@@@@@@@ Validate Summary End @@@@@@@@@@
```
