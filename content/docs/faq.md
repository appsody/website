---
title: FAQ
---

# FAQ

Welcome to the FAQ. Here you will find a list of common questions and answers along with CLI issues you may face.

## CLI Issues

### 1. Does Appsody support Windows Enterprise users?
Yes, though Docker Desktop may require special settings to access user folders in the host system. In order to ensure Docker has access to those folders, please follow the instructions in the page [Appsody and Docker Desktop on Windows 10](docker-windows-aad.md).

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

### 6. How to work offline with the Appsody CLI

Although the installation guide states that a working internet connection is required, you can use the Appsody CLI offline for some stacks. Other stacks, such as the `nodejs` stacks, need to download package dependencies so cannot can be used offline.

Here is a list of commands that are part of the standard Appsody flow of work, with the steps to follow to enable working offline:

- `appsody list/repo list`: Download the Appsody index files that you are using, for example [incubator](https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml) or [experimental](https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml) and add them to your local repository, by using: 
    ```
    appsody repo add <repo-name> <path-to-downloaded-index>
    ```

- `appsody init`: Initialize an Appsody project for your chosen stack, with ```appsody init```, which pulls down the latest images from DockerHub. These images are then cached locally and can be used without an internet connection.

- `appsody run/test/debug`: To use images that are stored in the local cache, rather than pull them from Dockerhub, set the environment variable:
    ```
    export APPSODY_PULL_POLICY=IFNOTPRESENT
    ```