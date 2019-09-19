# Special notes about Appsody and Docker Desktop on Windows 10

Docker Desktop on Windows requires access to the computer's filesystems in order to mount host volumes contained in those filesystems. That access is explained in detail in the "Shared Drives" section of the ["Get started with Docker for Windows"](https://docs.docker.com/docker-for-windows/) page.

Appsody relies on mounted hosted volumes to expedite the startup of applications under development, so that it is imperative that Docker Desktop be configured to access the shared drive containing the user's home directory. Once Docker has that access, the next requirement is for that user to have the "Full Control" permission to directories mounted to containers.

In most cases, it is sufficient to configure Docker with the same user as the user developing applications with Appsody.

However, for users of Windows 10 Enterprise secured with Azure Active Directory (AAD), the AAD user does not reside in the local host and may not be accepted in the "Shared Drives" tab of the Docker Desktop "Settings" page, specially if the organization has configured AAD to use authentication mechanisms that do not include user passwords, such as PIN codes.

## Workaround for Windows 10 Enterprise secured with Azure Active Directory

If Docker Desktop does not accept your AAD user and password in the "Shared Drives" tab of the "Settings" panel, or you just do not have the password for your user, the only known workaround at this time is to use a separate, local, Windows account to handle the drive sharing and file permissions.

Assuming the creation of a new user does not violate your organization policies, the workaround is comprised of the following steps:

1. [Create a new local user account](https://support.microsoft.com/en-us/help/4026923/windows-10-create-a-local-user-or-administrator-account
) on Windows and use that account and respective password in the "Shared Drives" tab of the Docker Desktop's "Settings" panel.

    Most systems will have only a single shared drive, labeled "C". If your "Shared Drives" list shows addditional drive letters, make sure you select the label matching the drive letter for the AAD user's home directory.

2. Grant the new user from step 1 the "Full Control" permission to the folders to be mounted by Appsody into a container. You could use the "Security" tab for each folder properties in the File Explorer application, but the quickest and simplest mechanism is to open a "Command Prompt" and issue the following commands to achieve the same results:

    ```
    set DOCKER_SHARED_DRIVE_USER=Developer

    REM if using the java-microprofile collection and until issue https://github.com/appsody/stacks/issues/363 is resolved:
    mkdir %USERPROFILE%\.m2\repository
    icacls "%USERPROFILE%\.m2" /grant %DOCKER_SHARED_DRIVE_USER%:(OI)(CI)F
    
    mkdir %USERPROFILE%\.appsody
    icacls "%USERPROFILE%\.appsody" /grant %DOCKER_SHARED_DRIVE_USER%:(OI)(CI)F
    
    mkdir %USERPROFILE%\directory-for-appsody-project
    icacls "%USERPROFILE%\directory-for-appsody-project" /grant %DOCKER_SHARED_DRIVE_USER%:(OI)(CI)F
    ```

    Note that the user in `DOCKER_SHARED_DRIVE_USER` must match the user specified in the Docker Desktop "Shared Drives" tab in the first step. 

    Repeat the `mkdir` and `icacls` commands for any other directory where you are about to create a new Appsody project. If you plan on creating multiple projects, you can also target a parent directory for those future project directories, so that you do not have to repeat the commands for each new Appsody project directory.

    Since the parameters for `icacls` specify a recursive authorization, granting the permission directly to the `%USERPROFILE%` directory could be faster and simpler, but the instructions in this page were written to minimize impact to the system.

3. Validating the correct permissions

    The commands below will run a docker container that creates (and removes) a directory in the directories used by Appsody. If the docker shared drive and filesystem permissions are set correctly, the command will indicate the successful outcome of the validation and your configuration is correct. 

    ```
    docker run --rm -it -v "%USERPROFILE%\.appsody":/data alpine  /bin/sh  -c "mkdir /data/test-write-permission && echo Success; rmdir /data/test-write-permission"

    docker run --rm -it -v "%USERPROFILE%\directory-for-appsody-project":/data alpine  /bin/sh  -c "mkdir /data/test-write-permission && echo Success; rmdir /data/test-write-permission"

    REM if you also granted permissions to the .m2 folder:
    docker run --rm -it -v "%USERPROFILE%\.m2\repository":/data alpine  /bin/sh  -c "mkdir /data/test-write-permission && echo Success; rmdir /data/test-write-permission"
    
    ```

    
## Removing the workaround

If you want to revert the Windows filesystem permissions later, open another "Command Prompt" and execute a `icacls ... /remove` command on all affected directories. The operation is recursive and will remove the permissions from sub-directories of those directories as well.

As an example, for the specific instructions in this page, you would execute the following commands:

```
set DOCKER_SHARED_DRIVE_USER=Developer

icacls "%USERPROFILE%\.m2" /remove %DOCKER_SHARED_DRIVE_USER%
icacls "%USERPROFILE%\.appsody" /remove %DOCKER_SHARED_DRIVE_USER%
icacls "%USERPROFILE%\directory-for-appsody-project" /remove %DOCKER_SHARED_DRIVE_USER%
```

You may decide whether or not to remove the directories after removing the permissions.
