---
title: Installing on Ubuntu
---

# Installing on Ubuntu

The easiest way to install and uninstall Appsody on Ubuntu is to use `apt`.

## Prerequisites

1. To avoid permissions problems on Linux hosts, your user account must be a member of the `docker` group, as detailed in the [Docker documentation](https://docs.docker.com/install/linux/linux-postinstall/), which you can configure by running:
```
sudo usermod -aG docker <username>
```

## Installing

Follow these steps:

1. Download the latest Debian install package from the [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody_v.r.m_amd64.deb`, where `v.r.m` indicates the release tag.
2. To install the package, run:

```
sudo apt install -f <path>/appsody_v.r.m_amd64.deb
```
where `<path>` is the fully qualified path to the package.

You can now follow the [Quick Start](/docs/getting-started/quick-start) instructions to create your first containerized development environment with a running *Hello World!* application.

# Upgrading

To upgrade Appsody on your system, follow these steps:
1. Download the latest Debian install package from the [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody_v.r.m_amd64.deb`, where `v.r.m` is the release tag.
2. Open your terminal and change into the directory that contains your downloaded file.
3. Run the following command:
```
sudo apt upgrade -f ./appsody_v.r.m_amd64.deb -y
```

# Uninstalling

To uninstall Appsody, run the following command:
```
sudo apt remove appsody
```
You might also want to remove the `.appsody` directory that gets created under your home directory: `rm -rf ~/.appsody`.
