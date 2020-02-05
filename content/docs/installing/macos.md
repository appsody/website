---
title: Installing on macOS
---

# Installing and Uninstalling on macOS

The easiest way to install and uninstall Appsody on macOS is to use [Homebrew](#installing-with-homebrew), or you can alternatively use a [binary file](/docs/installing-appsody#appsody-binaries).

## Prerequisites

If you don't have the Xcode Command Line Tools installed on your system, install them by running:

```
xcode-select --install
```

## Installing with Homebrew

To install Appsody with Homebrew:

1. If you don’t have Homebrew installed, you can install it by running:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. To install Appsody with Homebrew, run:

```
brew install appsody/appsody/appsody
```

You can now follow the [Quick Start](/docs/getting-started/quick-start) instructions to create your first containerized development environment with a running *Hello World!* application.

# Upgrading

If you installed Appsody using Homebrew, you can upgrade Appsody on your system by running the following command:
```
brew upgrade appsody
```
This command checks the installed Appsody folder for outdated installations and replaces them with newer versions.

# Uninstalling

To uninstall Appsody, run the following command:
```
brew uninstall appsody
```
You might also want to remove the `.appsody` directory that gets created, by default, within your home directory: `rm -rf ~/.appsody`.
