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

Appsody requires the user to have a working Internet connection to utilise several commands. However if you wish to work offline, there are several things you must do first:

- Download the incubator or experimental index files here and add them to your repo by using `appsody repo add <repo-name> <path-to-downloaded-index>`:
    - https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml
    - https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml

- Initialise an Appsody project using the desired stack with `appsody init` to pull down the latest images from DockerHub. These images will then be cached locally for offline use to run other Appsody commands e.g. `run/test/debug`.

**NOTE:** Some stacks such as the `nodejs` stacks may need to download package dependencies and therefore not all stacks can be used offline.