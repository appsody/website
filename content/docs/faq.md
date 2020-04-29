---
title: FAQ
---

# FAQ

Welcome to the FAQ. Here you will find a list of common questions and answers along with CLI issues you may face.

## CLI Issues

### 1. Does Appsody support Windows Enterprise users?
Yes, though Docker Desktop may require special settings to access user folders in the host system. In order to ensure Docker has access to those folders, please follow the instructions in the page [Appsody and Docker Desktop on Windows 10](/docs/docker-windows-aad).

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

    - On macOS/Linux
        ```
        cd ~/.appsody/repository/
        ```
    - On Windows
        ```
        cd %HOMEPATH%/.appsody/repository/
        ```
2. Change the URL for the incubator repository to reference the latest incubator index, which is:

    ```
    https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml
    ```

3. Save your changes and try running your command again.

### 6. Can I use the Appsody CLI offline?

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

### 7. Why does my Appsody project on macOS fail with the error “address already in use”?

If you encounter errors, running `appsody run` or `appsody deploy` similar to:

```
[Container] docker: Error response from daemon: driver failed programming external connectivity on endpoint hello-dev (c7cd774c8fab853f31f94efee4e639189cb6b77de7501a4c0bc669fbb7defe60): Error starting userland proxy: listen tcp 0.0.0.0:9443: bind: address already in use.
[Error] Error in 'appsody run': exit status 125
```

You might find that embedded Kubernetes on Docker Docktop on macOS is using port 9443.  You can [query the open TCP ports on macOS](https://support.apple.com/lt-lt/guide/mac-help/mchlp1710/mac).

The workaround is to append `-p 9444:9443` to the Appsody command so that the port inside the container is 9443 but access to the application (the publicly exposed port), is through 9444.

Alternatively you can append `-P` to your Appsody command, which automatically assigns a free port to the process.

### 8. Can I run Appsody with SELinux?

Yes. Although if you see errors similar to the following, it indicates that the Docker daemon, although it runs as `root`, might not be able to access the folders that are mounted from the host file system:

```
Container] [Warning] Failed to add directory to recursive watch list: /project/user-appopen /project/user-app: permission denied
npm ERR! path /project/user-app/package.json
[Container] npm ERR! Code EACCES
[Container] npm ERR! errno -13
[Container] npm ERR! syscall open
[Container] npm ERR! Error: EACCES: permission denied, open '/project/user-app/package.json'
```

To check whether SELinux is enabled and enforcing its policies, you can run `sestatus`. The output of the command includes the `Current Mode` of SELinux. If it is set to `enforcing`, and you see errors similar to those shown, you might need to change your SELinux configuration.

You can exempt the folders that are mounted by the stacks that you are using, with the following command:
```
chcon -Rt svirt_sandbox_file_t </path/to/volume>
```
You might need to run this command multiple times to whitelist different paths, depending on your setup, and on the mount points of the specific stack you are using.

### 9. Can I use Appsody without Docker?

Appsody lists Docker as a prerequisite for creating and running applications and stacks. However, certain Appsody operations like building an application, or packaging a stack can also be done with Buildah. Using Buildah is useful in environments where Docker is not available, for example, in Tekton pipelines or other Kubernetes environments. To use Buildah with Appsody, instead of Docker, add the `--buildah` flag to the following Appsody commands:
```
appsody stack package
appsody extract
appsody build
appsody deploy
```

For convenience, there is also a container image `appsody-buildah` that includes the current version of the Appsody CLI and the version of buildah that is used by Appsody. If you would like to modify this image to fit your own purposes, you can find the Dockerfile in the [appsody-buildah repo](https://github.com/appsody/appsody-buildah)

### 10. How do I set up Knative Serving for Local Kubernetes Development?

To work with Kubernetes locally, it is recommended that you enable Kubernetes in Docker for Desktop. To do that, first run the Docker app that starts Docker and adds the Docker icon to the menu bar.

Select the Docker icon in the menu bar, click 'Preferences', and select the 'Kubernetes' tab. Select the 'Enable Kubernetes' checkbox and click 'Apply'.

Click 'Install' on the dialog box that is entitled, “Install the Kubernetes Cluster now?” to start the installation. When it completes, Kubernetes is installed along with the `kubectl` tool that Appsody uses to deploy your applications.

Next, ensure that Kubernetes has enough resources to run your apps by selecting the Docker icon in the menu bar, click 'Preferences' and select the 'Advanced' tab. Use the sliders to ensure that you have 6 CPUs and 8.0 GB of memory that is assigned to Kubernetes and click 'Apply & Restart'.

Now use the [Installing Knative](https://knative.dev/docs/install/any-kubernetes-cluster/) guide to install Knative Serving in your Docker for Desktop based Kubernetes cluster.

### 11. Where are my application dependencies?

Appsody stacks can specify where and how the dependencies of the user's application are managed. Typically, stacks use the [`APPSODY_DEPS`](/docs/reference/environment-variables) environment variable to specify a list of locations where the application's dependencies are going to be stored within the Appsody container.

Appsody CLI creates Docker volumes for these locations and reuses the same volumes every time the user's project is executed by Appsody. This provides a caching mechanism and improves performance.

These project specific volumes are listed within the `$HOME/.appsody/project.yaml` file. It contains an entry for every project that is initialized on the local system. An example `project.yaml` file follows:

```
projects:
- id: "20200330103455.86854200"
  path: /Users/myuser/projects/test-nodejs
  volumes:
  - name: appsody-test-nodejs-20200330114100.38851500
    path: /project/user-app/node_modules
  - name: appsody-test-nodejs-20200330114100.38854000
    path: /project/tests
- id: "20200330120542.32567800"
  path: /Users/myuser/projects/myproject
  volumes:
  - name: appsody-myproject-20200330121802.54124700
    path: /project/user-app/.build
```
The example file contains information about two projects `test-nodejs` and `myproject`. The `test-nodejs` project has two Docker volumes that are associated with it `appsody-test-nodejs-20200330114100.38851500` and `appsody-test-nodejs-20200330114100.38854000`. The volumes are mounted at the following container paths `/project/user-app/node_modules` and `/project/tests`. The `myproject` project has one volume that is associated with it `appsody-myproject-20200330121802.54124700` that is mounted at `/project/user-app/.build`

The `project.yaml` file is validated when a new Appsody project is initialized. For projects that meet any of the following categories:

* no longer exist
* moved to a different directory
* are being initialized into the same directory as a previous project

The project entry is removed from the `project.yaml` file and the associated volumes are deleted. This validation ensures that volumes exist only for current projects and that volumes are not reused between different projects of the same name.

### 12. Why is the Appsody Operator failing to install?

The [Appsody Operator](/docs/reference/appsody-operator.md) is used to monitor resources of kind `AppsodyApplication` and can be installed using the `appsody operator install` command. However, there may be cases where this command fails due to permissions problems in the cluster. 

If you are working within a shared cluster, certain commands may be restricted. For example, the Appsody CLI runs `kubectl get pods --all-namespaces` as part of the `appsody operator install` command. You can use the `--no-operator-check` flag and run `appsody operator install --no-operator-check` to bypass some of these restrictions. However, this may not be enough to install the operator in clusters with stricter permissions. In this case, contact your cluster administrator.