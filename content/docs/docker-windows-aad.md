---
title: Appsody and Docker Desktop on Windows 10
path: /docs/docker-windows-aad
---

# Appsody and Docker Desktop on Windows 10

Docker Desktop on Windows requires access to the computer's filesystems to mount host volumes contained in those filesystems. You can find more information at [Get started with Docker for Windows](https://docs.docker.com/docker-for-windows/).

Appsody relies on mounted hosted volumes to expedite the startup of applications under development. Therefore, Docker Desktop must be configured to access the shared drive that contains the user's home directory. When Docker has that access, the next requirement is for that user to have the "Full Control" permission to directories mounted to containers.

In most cases, it is sufficient to configure Docker with the same user as the user that is developing applications with Appsody.

However, for users of Windows 10 Enterprise that is secured with Azure Active Directory (AAD), the AAD user does not reside in the local host and might not be accepted in the "Shared Drives" tab of the Docker Desktop "Settings" dialog. Particularly if the organization configured AAD to use authentication mechanisms other than user passwords, such as PIN codes.

## Workaround for Windows 10 Enterprise secured with Azure Active Directory

If Docker Desktop does not accept your AAD user and password in the "Shared Drives" tab of the Docker "Settings" dialog, or you do not have the password for your user, the only known workaround currently is to use a separate, local, Windows account to handle the drive sharing and file permissions.

Assuming the creation of a new user does not violate your organization's policies, the workaround consists of the following steps:

1. [Create a new local user account](https://support.microsoft.com/en-us/help/4026923/windows-10-create-a-local-user-or-administrator-account
) on Windows and use that account and its password in the "Shared Drives" tab of the Docker Desktop "Settings" dialog.

    Most systems have only a single shared drive, labeled "C". If your "Shared Drives" list shows more drive letters, make sure you select the label that matches the drive letter for the AAD user's home directory.

2. Grant the new user the "Full Control" permission to the folders that are going to be mounted into a container by Appsody. You can run Windows Explorer, right-click the directory, click Properties, and on the Security tab change the permissions. Alternatively you can open a command prompt and enter the following [icacls](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/icacls) commands:

    ```
    REM Must be the user that you specified in the "Shared Drives" tab of the Docker Desktop dialog
    set DOCKER_SHARED_DRIVE_USER=Developer

    REM Include if you are using Java stacks:
    mkdir %USERPROFILE%\.m2\repository
    icacls "%USERPROFILE%\.m2" /grant %DOCKER_SHARED_DRIVE_USER%:(OI)(CI)F

    mkdir %USERPROFILE%\.appsody
    icacls "%USERPROFILE%\.appsody" /grant %DOCKER_SHARED_DRIVE_USER%:(OI)(CI)F

    mkdir %USERPROFILE%\directory-for-appsody-project
    icacls "%USERPROFILE%\directory-for-appsody-project" /grant %DOCKER_SHARED_DRIVE_USER%:(OI)(CI)F
    ```

    Repeat the `mkdir` and `icacls` commands for any other directories where you plan to create new Appsody projects.

    The parameters to the `icacls` commands specify a recursive authorization. Therefore, if you plan on creating multiple projects, you might want to create a parent directory to contain the individual project directories. Then, you would not need to repeat the `icacls` commands for each new Appsody project directory.

     Granting the permissions directly to the `%USERPROFILE%` directory might be faster and simpler. However, these instructions are written to minimize impact to the system.

3. Validating the permissions

   The following commands run a docker container that creates, and then removes, a directory in each of the directories used by Appsody. The commands indicate the successful outcome of the validation if the shared drive access and the filesystem permissions are set correctly:

    ```
    docker run --rm -it -v "%USERPROFILE%\.appsody":/data alpine  /bin/sh  -c "mkdir /data/test-write-permission && echo Success; rmdir /data/test-write-permission"

    docker run --rm -it -v "%USERPROFILE%\directory-for-appsody-project":/data alpine  /bin/sh  -c "mkdir /data/test-write-permission && echo Success; rmdir /data/test-write-permission"

    REM If you granted permissions to the .m2 folder:
    docker run --rm -it -v "%USERPROFILE%\.m2\repository":/data alpine  /bin/sh  -c "mkdir /data/test-write-permission && echo Success; rmdir /data/test-write-permission"
    ```

## Removing the workaround

If you want to revert the Windows filesystem permissions later, open another command prompt and run a `icacls ... /remove` command on all affected directories. The operation is recursive and removes the permissions from subdirectories too.

For example, run the following commands:

```
set DOCKER_SHARED_DRIVE_USER=Developer

icacls "%USERPROFILE%\.m2" /remove %DOCKER_SHARED_DRIVE_USER%
icacls "%USERPROFILE%\.appsody" /remove %DOCKER_SHARED_DRIVE_USER%
icacls "%USERPROFILE%\directory-for-appsody-project" /remove %DOCKER_SHARED_DRIVE_USER%
```

You might also want to delete the directories.
