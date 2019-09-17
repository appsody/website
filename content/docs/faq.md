---
title: FAQ
path: /docs/faq
---

# FAQ

Welcome to the FAQ. Here you will find a list of common questions and answers along with CLI issues you may face.

## CLI Issues

### 1. Does Appsody support Enterprise Windows users?
Enterprise Windows users very frequently authenticate through Azure Active Directory (AAD). In those circumstances, the Docker daemon on Windows may not be authorized to access any of the folders that are owned by the AAD user. For this reason, Appsody supports Enterprise Windows users through a workaround.

1. Create a new folder called ```C:\my-appsody-config-dir\``` (any folder outside the home directory would work)

1. Edit the configuration file: ```notepad C:\my-appsody-config-dir\.appsody-config.yaml```

1. Change the entry ```home:``` to ```C:\my-appsody-config-dir```

1. Create a new project folder (pick a folder that is outside of your home directory, or Docker will not have access to it).

1. Change directories to your project folder and initialize your application: ```appsody init <stack> --config C:\my-appsody-config-dir\.appsody-config.yaml```

1. Run your app: ```appsody run --config C:\my-appsody-config-dir\.appsody-config.yaml```

1. Notice that if you are using some of the **Java-based stacks**, their containers might attempt to mount your local home directory, in order to be able to share the Maven repository that you may have on your disk (typically located in `~/.m2/repository`). To avoid permission issues, you need to set a special environment variable to override the resolution of the `~` with a directory that is accessible to the Docker container, by running: 
```
SET APPSODY_MOUNT_HOME=<any accessible directory>
```
This command must be run in the same command prompt window as the one where you are running Appsody.

For more information on this issue, click [here](https://github.com/appsody/appsody/issues/24).

### 2. Why am I getting a cross-device link error on Appsody extract?

This was an issue that was faced in an older version of the software. It occurred when the Appsody CLI and the Appsody project were located on different disk volumes. If you are experiencing this problem, navigate to our [GitHub page](https://github.com/appsody) and ensure you are operating on the latest version. If you would like more information on this issue, please click [here](https://github.com/appsody/appsody/issues/82).
                                                                                                                
### 3. Why is Appsody deploy not displaying the URL of the Knative service?

Sometimes, when you run ```appsody deploy```, you may see a message that fails to provide the URL of the deployed Knative service. Although the Knative URL is not displaying, Appsody should have still been deployed successfully. This is a timing issue where ```kubectl apply``` finishes executing before all resources have been made available.

### 4. Is the HTTP_PROXY environment variable used by the CLI?

Versions of Appsody at 0.2.5 and older do not support going through a HTTP proxy. However, newer versions do: Before launching Appsody, you just need to set the HTTP\_PROXY or HTTPS\_PROXY environment variable.

### 5. Why can't the CLI read my index?

When you encounter the following error
```
[Error] Could not read indices: Failed to get repository index: 404 Not Found response trying to download https://raw.githubusercontent.com/appsody/stacks/master/index.yaml
```

1. Go to your home directory and open the **repository.yaml** using an editor of your choice.

    - `cd ~/.appsody/repository/` (macOS/Linux)
    - `cd %HOMEPATH%/.appsody/repository/` (Windows)

2. Replace the appsodyhub URL to use the latest appsodyhub index which is:

`https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml`

3. Save your changes and try running your command again.