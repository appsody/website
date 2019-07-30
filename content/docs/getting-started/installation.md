---
path: /docs/getting-started/installation
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

### Prerequisites for macOS

You should have Xcode Command Line Tools installed. To install the Xcode Command Line Tools, run:
```
xcode-select --install
```

## Installing on macOS
Ensure the [prerequisites](#Prerequisites) are met.

Run this command: 
```
brew install appsody/appsody/appsody
```
The command will create a brew tap for the `appsody/appsody` repo, and install the `appsody` formula for you.

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
