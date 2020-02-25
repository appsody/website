---
title: Installing on RHEL
---

# Installing on RHEL

The easiest way to install and uninstall Appsody on Red Hat Enterprise Linux is to use yum.

## Prerequisites

To avoid permissions problems on Linux hosts, your user account must be a member of the `docker` group, as detailed in the [Docker documentation](https://docs.docker.com/install/linux/linux-postinstall/), which you can configure by running:
```
sudo usermod -aG docker <username>
```

## Installing

Follow these steps:

1. Download the latest RPM install package from the [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody-v.r.m-1.x86_64.rpm`, where `v.r.m` indicates the release tag.
2. To install the package, run:

```
sudo yum install <path>/appsody-v.r.m-1.x86_64.rpm
```

where `<path>` is the fully qualified path to the package.

You can now follow the [Quick Start](/docs/getting-started/quick-start) instructions to create your first containerized development environment with a running *Hello World!* application.

# Upgrading

To upgrade Appsody on your system, follow these steps:
1. Download the latest RPM install package from the [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody-v.r.m-1.x86_64.rpm`, where `v.r.m` is the release number.
2. Open your terminal and change into the directory that contains your downloaded file.
3. Run the following command:
```
sudo yum update appsody-v.r.m-1.x86_64.rpm -y
```

# Uninstalling

To uninstall Appsody, run the following command:
```
sudo yum remove appsody
```
You might also want to remove the `.appsody` directory that gets created under your home directory: `rm -rf ~/.appsody`.
