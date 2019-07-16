# Appsody contributing guidelines

Welcome to the Appsody community!

You can contribute to the project in a variety of ways:
- Fixing or reporting bugs
- Improve documentation
- Contribute code

We welcome all contributions to the Appsody project and request you follow the guidelines below:

## Code of conduct

All members of the Appsody community must abide by the
[Code of Conduct](./CODE-OF-CONDUCT.md). Only by respecting each other can we
develop a productive, collaborative community.

## Raising issues

A great way to contribute to the project is to raise a detailed issue when you encounter a problem.

Check that the list of project issues doesn't already include that problem or request before submitting an issue. If you find a matching issue, add a "+1" or comment indicating that you have the same issue, as this helps prioritize the most common problems and requests.

A good bug report is one that make it easy for everyone to understand what you were trying to do and what went wrong. Provide as much context as possible so we can try to recreate the issue.

## Setting up to contribute to Appsody

Check out this
[README](https://github.com/appsody/docs/blob/master/README.md) to learn
about the Appsody source base and setting up your
[development environment](https://github.com/appsody/docs/blob/master/docs/using-appsody/local-development.md).

## Commit message guidelines

You should describe what changed and why.

To avoid duplicaton if you are adding a new stack, template or making any breaking changes to the code base you MUST create a new GitHub issue to track the discussion. It is good practise to raise GitHub issues for fixes but if you prefer to just submit a pull request with your desired code changes then that is fine.

If your Pull Request fixes an existing issue, use `Fixes:` to reference that issue in your Pull Request. You should also add the project area name, or stack, you are working on, followed by a `:` to your commit message.

Example commit message:
```
java-microprofile: adding an rest sample template

This PR adds a simple RESTful web application using JAS-RS rest sample template.

Fixes: https://github.com/appsody/docs/issues/12
```

## Pull requests

If you're working on an existing issue, simply respond to the issue and express
interest in working on it. This helps other people know that the issue is
active, and hopefully prevents duplicated efforts.

To submit a proposed change:

- Fork the affected repository.
- Create a new branch for your changes.
- Develop the code/fix.
- Modify the documentation as necessary.
- Verify all CI status checks pass, and work to make them pass if failing.

The general rule is that all PRs should be 100% complete - meaning they should
include documentation changes related to the change. A
significant exception is work-in-progress PRs. These should be indicated by opening a draft pull request. To open a draft pull request, click the dropdown arrow that appears next to the “Create pull request” button and then select the "Create draft pull request" option.

## Contributor License Agreement

In order for us to merge any of your changes into Appsody, you need to sign the Contributor License Agreement. When you open up a Pull Request for the first time, a bot will comment with a link to the CLA.

## Merge approval and release process

A maintainer may add "LGTM" (Looks Good To Me) or an equivalent comment to indicate that a PR is acceptable. Any change requires at least one LGTM. No pull requests can be merged until at least one maintainer signs off with an LGTM.

Once the PR has been merged, the release job will automatically run in the CI process of the specific repository. New stack images will be built and pushed to the [Docker Hub Repo](https://hub.docker.com/u/appsody).

## How to get Help?

Whether you are a user or contributor, official support channels include:

- If you have any questions, or need any help, contact us on [Appsody Slack](https://appsody-slack.eu-gb.mybluemix.net/)
- You can also comment on existing issues, or raise new ones on [GitHub](https://github.com/appsody/docs/issues)

## License
This project is licensed under the Apache 2.0 license, and all contributed stacks must also be licensed under the Apache 2.0 license. Each contributed stack should include a LICENSE file containing the Apache 2.0 license. More information
can be found in the LICENSE file or online at

http://www.apache.org/licenses/LICENSE-2.0