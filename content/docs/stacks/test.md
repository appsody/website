---
title: Testing Stacks
---

# Testing Stacks

After you create or update a stack, the next consideration is to test the stack to check that it meets your needs. To validate a stack in your local Appsody development environment, use the stack validation command. Stack validation performs several operations against the stack and provides a summary of these operations.

---
## Validation process

Stack validation consists of six operations:

  - **Lint**: Statically analyzes your source code to verify that it conforms to the structure of an Appsody stack.
  - **Package**: Builds the stack images and templates and generates an Appsody repository index that you can use for local testing.
  - **Init**: Initializes an Appsody project that uses the default project template from your stack.
  - **Run**: Starts the Appsody development container that was created during initialization.
  - **Test**: Runs the project's test suite in the Appsody development container. The test suite is composed of generic tests in the stack.
  - **Build**: Generates a production Docker image ready for deployment to your runtime platform of choice.

---

## Testing a stack using the Appsody CLI

1. Navigate to the root directory of your stack

2. Run the following command:

```
appsody stack validate
```

If your stack is already packaged and you don't want to run the package operation as part of validate, you can use the `--no-package` flag.

3. After completion, it provides a summary of the results.  The following summary output shows the result of running `validate` against the starter stack:

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

The summary provides a result for each of the operations and a total for the overall number of passed and failed operations.

---

## Next steps

You have now developed, packaged, and tested a stack. You can now publish your stack so that other developers can use its functionality to accelerate development of their own cloud-native applications. For more information, see [Publishing Stacks](/docs/stacks/publish).
