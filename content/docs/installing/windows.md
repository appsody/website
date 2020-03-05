---
title: Installing on Windows
---

# Installing on Windows

> Appsody runs only on Windows 10 Professional and Windows 10 Enterprise editions. If you are running Windows 10 Enterprise with authentication through Azure Active Directory, follow the additional instructions in [Appsody and Docker Desktop on Windows 10](/docs/docker-windows-aad).

Follow these steps:

1. Create a directory to install Appsody in.
2. Download the Appsody binaries for Windows from the [Appsody releases page](https://github.com/appsody/appsody/releases) into your newly created directory. The file is named `appsody-v.r.m-windows.tar.gz`, where `v.r.m` indicates the release tag.
3. To extract the files run: `tar -xvf appsody-v.r.m-windows.tar.gz`.
4. This is a nested zip file so if you use a GUI you might have to unzip twice.
5. Run the following setup script to create the `APPSODY_PATH` environment variable, set it to the directory where Appsody is installed, and configure your `PATH` environment variable:
```
appsody-setup.bat
```

You can now follow the [Getting Started](/docs/getting-started) instructions to create your first containerized development environment with a running *Hello World!* application.

# Upgrading

To upgrade Appsody on your system, follow these steps:
1. Download the Appsody binaries for Windows from  [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody-v.r.m-windows.tar.gz`, where `v.r.m` indicates the release tag.
2. Move the file to the directory where you stored the existing Appsody binaries.
3. To extract the files run: `tar -xvf appsody-v.r.m-windows.tar.gz`.
4. This is a nested zip file so if you use a GUI you might have to unzip twice.

# Uninstalling

To uninstall Appsody:
1. Delete the directory where you installed Appsody.
2. You might want to remove the `.appsody` directory that gets created under your home directory: `rm -rf ~/.appsody`.
3. Remove `APPSODY_PATH` from the `PATH` environment variable (see [Modifying the PATH on Windows 10](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)). You might also want to remove the `APPSODY_PATH` variable.
