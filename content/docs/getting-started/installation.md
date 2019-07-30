---
path: /docs/getting-started/installation
---
# Installing Appsody

You can install Appsody on your system in a few easy steps by using our binary packages, which are available for macOS&reg;, Ubuntu, Red Hat Enterprise Linux (RHEL), and Windows&reg;.

Because Appsody depends on Docker, ensure that you have [Docker](https://docs.docker.com/get-started/) installed and the Docker daemon running on your system.

## Installing on macOS

Follow these steps:

1. If you don't have the Xcode command line tools installed on your system, install them by running `xcode-select --install`.
2. If you don't have Homebrew installed on your system, install it by running `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`.
3. To install Appsody, run:

```
brew install appsody/appsody/appsody
```

This command creates a brew tap for the `appsody/appsody` repo and installs the `appsody` formula.

That's all there is to it! You can now follow our [Quick Start](#quick-start) instructions to create your first containerized development environment with a running *Hello World!* application.

To remove Appsody, run `brew uninstall appsody`. Optionally, remove the `.appsody` directory that gets created under your home directory: `rm -rf ~/.appsody`.

## Installing on Ubuntu

Follow these steps:

1. Your user account must be a member of the `docker` group, which you can configure by running `sudo usermod -aG docker <username>`.
2. Download the latest **Debian install package** from the [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody_v.r.m_amd64.deb`, where `v.r.m` indicates the release tag.
3. To install the package, run:

```
sudo apt install -f <path>/appsody_v.r.m_amd64.deb
```
Where `<path>` is the fully qualified path to the package.

That's all there is to it! You can now follow our [Quick Start](#docs/getting-started/quick-start.md) instructions to create your first containerized development environment with a running *Hello World!* application.

To remove Appsody, run `sudo apt remove appsody`. Optionally, remove the `.appsody` directory that gets created under your home directory: `rm -rf ~/.appsody`.

## Installing on RHEL

Follow these steps:

1. Your user account must be a member of the `docker` group, which you can configure by running `sudo usermod -aG docker <username>`.
2. Download the latest **RPM install package** from the [Appsody releases page](https://github.com/appsody/appsody/releases). The file is named `appsody-v.r.m-1.x86_64.rpm`, where `v.r.m` indicates the release tag.
3. To install the package, run:

```
sudo yum install <path>/appsody-v.r.m-1.x86_64.rpm
```

Where `<path>` is the fully qualified path to the package.

That's all there is to it! You can now follow our [Quick Start](#docs/getting-started/quick-start.md) instructions to create your first containerized development environment with a running *Hello World!* application.

To remove Appsody, run `sudo yum remove appsody`. Optionally, remove the `.appsody` directory that gets created under your home directory: `rm -rf ~/.appsody`.

## Installing on Windows

Note: Appsody runs only on Windows 10.

Follow these steps:

1. Create a directory for Appsody on your Windows 10 system.
2. Download the **Appsody binaries for Windows** from the [Appsody releases page](https://github.com/appsody/appsody/releases) into the directory. The file is named `appsody-v.r.m-windows.tar`, where `v.r.m` indicates the release tag.
3. Extract the files by running `tar -xvf appsody-v.r.m-windows.tar`.
4. To install Appsody, run the following setup command:

```
appsody-setup.bat
```

That's all there is to it! You can now follow our [Quick Start](#docs/getting-started/quick-start.md) instructions to create your first containerized development environment with a running *Hello World!* application.

To uninstall Appsody, delete the directory where you extracted the binaries. Optionally, remove the `.appsody` directory that gets created under your home folder and the **PATH** entry that was created by the setup command (see [Modifying the PATH on Windows 10](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)).

## Running Appsody with SELinux
If you are running Security-Enhanced Linux, you may experience problems when running Appsody, because the Docker daemon - although it runs as `root` - may not be able to access the folders that are mounted from the host file system.

The manifestation of these problems include errors such as those reported in the snippet below.
```
Container] [Warning] Failed to add directory to recursive watch list: /project/user-appopen /project/user-app: permission denied
npm ERR! path /project/user-app/package.json
[Container] npm ERR! code EACCES
[Container] npm ERR! errno -13
[Container] npm ERR! syscall open
[Container] npm ERR! Error: EACCES: permission denied, open '/project/user-app/package.json'
```

In order to check whether you have SELinux enabled and enforcing its policies, you can run `sestatus`. The output of this command includes the `Current Mode` of SELinux. If it is set to `enforcing`, and you see errors similar to those in the snippet above, you may need to change your SELinux configuration.

This can be done by exempting the folders mounted by the stacks you are using, through the following command:
```
chcon -Rt svirt_sandbox_file_t </path/to/volume>
```
You may need to run this command multiple times, to whitelist different paths, depending on your setup, and on the mount points of the specific stack you are using.

In general - however - you should be required to run the command at most twice:
* For your home directory
* For the directory where your Appsody project is located (assuming this isn't under your home)

If you are unsure about which directories are mounted by the stack you are using, you can inspect the output of the `appsody run` command, and look at the `-v` parameters in the `docker run` command. For example:
```
[ibmadmin@naval1 my-project]$ appsody run
Running development environment...
Running command: docker[pull appsody/nodejs-express:0.2]
Running command: docker[run --rm -p 3000:3000 -p 9229:9229 --name my-project-dev -v /home/ibmadmin/appsody/my-project/:/project/user-app -v my-project-deps:/project/user-app/node_modules -v /home/ibmadmin/.appsody/appsody-controller:/appsody/appsody-controller -t --entrypoint /appsody/appsody-controller appsody/nodejs-express:0.2 --mode=run]
```
In the example above, there are two binding mounts:
* /home/ibmadmin/appsody/my-project/
* /home/ibmadmin/.appsody/appsody-controller

In this case, whitelisting the home directory (`/home/ibmadmin`) would be sufficient.
