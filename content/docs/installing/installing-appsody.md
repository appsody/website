---
title: Overview - Installing Appsody
---

# Installing Appsody

The easiest way to install Appsody is to use the installers, which are available for all supported platforms, except Windows&reg;.

## Platforms

Appsody supports the following operating systems on x86 hardware:

 - macOS&reg;
 - Ubuntu
 - Red Hat Enterprise Linux (RHEL)
 - Windows&reg; - Windows 10 Professional and Windows 10 Enterprise editions only

## Requirements

To use all of Appsody's functions, you need to install [Docker](https://docs.docker.com/get-started/) and start the Docker daemon on your system. In environments where Docker is not available, a subset of Appsody commands can be used with Buildah as detailed in the [FAQ](/docs/faq#9-can-i-use-appsody-without-docker). Prerequisites specific to each operating system are provided within the links in the following section.

## Using installers

Installation steps are covered in the following sections:

 - [Installing on macOS](/docs/installing/macos)
 - [Installing on RHEL](/docs/installing/rhel)
 - [Installing on Ubuntu](/docs/installing/ubuntu)

Appsody does not have an installer package for Windows, so to install Appsody on that operating system follow:

 - [Installing on Windows](/docs/installing/windows)

## Alternative install methods

### Appsody binaries

If you prefer not to use an installer, you can install Appsody by using a binary file. These instructions are for installing on macOS, Ubuntu, and RHEL. For Windows, follow [Installing on Windows](/docs/installing/windows):

1. Go to the [Appsody Releases page](https://github.com/appsody/appsody/releases), scroll to the release you want and download the file that is appropriate to your operating system. For example, on macOS: `appsody_v.r.m-darwin-amd64.tar.gz`, where `v.r.m` indicates the release tag.

2. Extract the files by running:
```
tar -xvf appsody_v.r.m-darwin-amd64.tar.gz
```

3. This is a nested zip file so if you use a GUI you might have to unzip twice.

### Building Appsody from source

If you would like to build Appsody from the source code, look at [Building from Source](https://github.com/appsody/appsody/blob/master/build.md).
