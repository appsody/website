---
title: Testing Stacks
---

# Testing Stacks

After you create or update a stack, the next consideration is to test the stack to check that it meets your needs. To validate a stack in your local Appsody development environment, use the stack validate command. Stack validation performs several operations (lint, package, init, run, test, build) against the stack and provides a summary of these operations.

>Packaging the stack does not logically form part of validation, it is included because the tests that are run as part of the stack validate command depend on the stack being packaged.

---

## Testing a stack using the Appsody CLI

1. Navigate to the root directory of your stack

2. Run the following command:

```
appsody stack validate
```

3. The validate command then runs through six operations and provides a summary of the results.  The following summary output shows the result of running `validate` against the starter stack:
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

> The summary provides a result for each of the operations and a total for the overall number of passed and failed operations.
---

## Validation Operations

The six operations that the `appsody stack validate` command calls are as follows:

### Lint

Runs [`appsody stack lint`](/docs/using-appsody/cli-commands/#appsody-stack-lint).

The lint test statically analyzes your source code to verify that it conforms to the structure of an Appsody stack. It informs you of missing files, or directories and warns you if your stack might be enhanced.

### Package

Runs [`appsody stack package`](/docs/using-appsody/cli-commands/#appsody-stack-package).

Builds the stack images and templates and generates an Appsody repository index that you can use for local testing. See [Packaging Stacks](/docs/stacks/package) for more details.

> If your stack is already packaged and you don't want to run the `package` operation as part of the validation, you can use the `--no-package` flag as shown in the following command: `appsody stack validate --no-package`

### Init

Runs [`appsody init`](/docs/using-appsody/cli-commands/#appsody-init).

This step initializes an Appsody project that uses the default project template from your stack. See [Initializing Appsody Projects](/docs/using-appsody/initializing-project) for more details.

### Run

Runs [`appsody run`](/docs/using-appsody/cli-commands#appsody-run).

The `run` command starts the Appsody development container that was created during initialization. In `run` mode Appsody watches your local project directory for file changes, and updates your application to reflect code changes as you develop. See [Local Development](/docs/using-appsody/local-development) for more details.

### Test

Runs [`appsody test`](/docs/using-appsody/cli-commands#appsody-test).

The test command runs the project's test suite in the Appsody development container. The test suite is composed of generic tests in the stack, which verify that the capabilities provided by the stack are working as expected, and any custom tests that are defined within the template.

### Build

Runs [`appsody build`](/docs/using-appsody/cli-commands/#appsody-build).

The build command generates a production Docker image ready for deployment to your runtime platform of choice. See [Getting ready to deploy your Appsody project](/docs/using-appsody/building-and-deploying) for more details.

---

## Next steps

You have now developed, packaged, and tested a stack. You can now publish your stack so that other developers can use its functionality to accelerate development of their own cloud-native applications. For more information, see [Publishing Stacks](publish).
