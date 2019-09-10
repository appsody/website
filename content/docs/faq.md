---
title: FAQ
path: /docs/faq
---

# FAQ

Welcome to the FAQ. Here you will find a list of common questions and answers along with CLI issues you may face.

## CLI Issues

### 1. Does Appsody support Enterprise Windows users?
Enterprise Windows users very frequently authenticate through Azure Active Directory (AAD). In those circumstances, the Docker daemon on Windows may not be authorized to access any of the folders that are owned by the AAD user. For this reason, Appsody supports Enterprise Windows users through a workaround.
1. Create a new project (pick a folder that is outside of your home directory, or Docker will not have access to it).
2. Go into that project directory and run ```appsody init <stack>```
3. Create a new folder called ```C:\my-appsody-config-dir\```
4. Run ```appsody init --config C:\my-appsody-config-dir\.appsody-config.yaml```

5. ```notepad C:\my-appsody-config-dir\.appsody-config.yaml```

6. Change the entry ```home:``` to ```C:\my-appsody-config-dir```

7. Run ```appsody run --config C:\my-appsody-config-dir\.appsody-config.yaml```

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