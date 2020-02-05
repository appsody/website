---
title: Overview - Installing Appsody
---

# Installing Appsody

Install Appsody by using the pre-built installers, or binary packages for your platform. The easiest way to install Appsody is to use the pre-built installers which are available for all supported platforms, except Windows&reg;.

## Platforms

Appsody supports:
 - macOS&reg;
 - Ubuntu
 - Red Hat Enterprise Linux (RHEL)
 - Windows&reg; - Windows 10 Professional and Windows 10 Enterprise editions only

## Requirements

Appsody depends on Docker so ensure that you have [Docker](https://docs.docker.com/get-started/) installed and the Docker daemon is running on your system.

## Testing

Integration tests have been run on:
- macOS 10.13 (High Sierra) and later
- Ubuntu 18.04
- Red Hat Enterprise Linux 7.7
- Windows 10 Professional and Windows 10 Enterprise

Travis builds and unit tests are run on:
- macOS 10.13 (High Sierra)
- Ubuntu 16.04
- Windows Server, version 1803 (the only version of Windows currently supported by Travis)  

## Appsody binaries

If you prefer not to use an installer, you can install Appsody by using a binary file. If you are on Windows, instead of following these instructions follow [Installing on Windows](/docs/installing/windows):

1. Go to the [Appsody Releases page](https://github.com/appsody/appsody/releases), scroll to the release you want and download the file that is appropriate to your operating system. For example, on macOS: `appsody_v.r.m-darwin-amd64.tar.gz`, where `v.r.m` indicates the release tag.

2. Extract the files by running:
```
tar -xvf appsody_v.r.m-darwin-amd64.tar.gz
```

3. This is a nested zip file so if you use a GUI you might have to unzip twice.

## Building Appsody from source

If you would like to build Appsody from the source code, look at [Building from Source](https://github.com/appsody/appsody/blob/master/build.md).
