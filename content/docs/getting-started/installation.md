---
title: "Installation"
path: /docs/getting-started/installation
section: Getting Started
---
# Installing Appsody

Here we cover the steps to get Appsody installed on your system.

Currently, Appsody provides pre-built binary releases for four platforms:
1) macOS (we developed and tested primarily on Mojave)
2) Ubuntu (We tested primarily on 18.04.2)
3) RedHat Enterprise Linux (we tested on 7.4)
4) Windows 10 - which is the only Windows platform where Appsody runs

## Prerequisites

You should have [Docker](https://docs.docker.com/get-started/) installed and the Docker daemon running on your system. Appsody will install even if Docker isn't installed or running - however, you will not be able to use Appsody until Docker is running.

## Installing on macOS
Ensure the [prerequisites](#Prerequisites) are met.

Run these two commands:
```
brew tap appsody/appsody
brew install appsody
```

If you have not installed the Xcode Command Line Tools, you may see an error message stating:
```
Error: Xcode alone is not sufficient on Mojave.
Install the Command Line Tools:
  xcode-select --install
```
To install the Xcode Command Line Tools, run:
```
xcode-select --install
brew install appsody
```

To remove Appsody, run `brew uninstall appsody`. You may also want to remove the `.appsody` directory that gets created under your home dir: `rm -rf ~/.appsody`.

## Installing on Ubuntu

Ensure the [prerequisites](#Prerequisites) are met.

You should also make sure that **your user is a member of the `docker` group**. This is necessary for Appsody to run correctly. You can do this by executing the following command after substituting in your user for XXXX:
```
sudo usermod -aG docker XXXX
```

To install Appsody on your system follow these steps:
1) Download the latest **Debian install package** from the [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody_v.r.m_amd64.deb`, where `v.r.m` indicates the release tag.
2) Assuming, you downloaded the package into `~/Downloads`, run:
```
sudo apt install -f ~/Downloads/appsody_v.r.m_amd64.deb
```
Make sure you specify the path to the package file.

To uninstall Appsody, run: `sudo apt remove appsody`. You may also want to remove the `.appsody` directory that gets created under your home directory: `rm -rf ~/.appsody`

## Installing on RHEL

Ensure the [prerequisites](#Prerequisites) are met.

You should also make sure that **your user is a member of the `docker` group**. This is necessary for Appsody to run correctly. We do realize that having your user id part of the `docker` group isn't common practice on RHEL - however, at present, this is a requirement for Appsody to run successfully.

To install Appsody on your system follow these steps:
1) Download the latest **RPM install package** from the [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody-v.r.m_1.x86_64.rpm`, where `v.r.m` indicates the release tag.
2) Assuming, you downloaded the package into `~/Downloads`, run:
```
sudo yum install ~/Downloads/appsody-v.r.m_1.x86_64.rpm
```
Make sure you specify the path to the package file.

To uninstall Appsody, run: `sudo yum remove appsody`. You may also want to remove the `.appsody` directory that gets created under your home directory: `rm -rf ~/.appsody`

## Installing on Windows
Note, Appsody only runs on Windows 10.

Ensure the [prerequisites](#Prerequisites) are met.

Follow these steps:
1) Download the **Appsody binaries for Windows** from  [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody-v.r.m-windows.tar`, where `v.r.m` indicates the release tag.
2) Move the file to a directory where you want to keep the Appsody binaries (say, an `appsody` folder under your home folder.)
3) Untar the file there: `tar -xvf appsody-v.r.m-windows.tar`.
4) Run the setup command `appsody-setup.bat`.

You can now use Appsody.

To uninstall Appsody, delete the directory where you extracted the binaries. You may also want to remove the `.appsody` directory that gets created under your home folder. And finally, you may want to remove the Path entry that was created for you by the setup command (instructions on editing your Path env var can be found [here](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)).
