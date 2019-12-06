---
title: Installing OpenShift locally using Red Had CodeReadyContainers
---

# Installing OpenShift locally using Red Hat CodeReady Containers

Red Hat CodeReady Containers provides a minimum OpenShift cluster for your local workstation. Supported operating systems are Windows, macOS and Linux. The Red Hat install instructions can be found [here](https://cloud.redhat.com/openshift/install/crc/installer-provisioned). The Red Hat "Getting Started" instructions can be found [here](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.0/html/getting_started_guide/getting-started-with-codeready-containers_gsg).

## Installing Red Hat CodeReady on Red Hat Enterprise Linux 7.7
### Assumptions:
1. User must have permission to use `sudo` command.
1. Minimum hardware and required software requirements are fulfilled. See the sections [here](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.0/html/getting_started_guide/getting-started-with-codeready-containers_gsg).
### Steps:
1. Navigate [here](https://cloud.redhat.com/openshift/install/crc/installer-provisioned) and click on the link `Linux: Download (Libvirt)` to download the crc tar file.
1. Extract:
    ```
    tar -xvf crc-linux-amd.tar.xz
    ```
1. Move the binary to your `$PATH`. Example:
    ```
    sudo mv crc-linux-1.0.0-amd64/crc /usr/local/bin/
    ```
1. Setup crc:
    ```
    crc setup
    ```
1. Copy pull secret by clicking `Copy Pull Secret` [here](https://cloud.redhat.com/openshift/install/crc/installer-provisioned).
1. Start crc and paste in secret when prompted:
    ```
    crc start
    ```
    Note the provided user names and passwords
1. Get the command needed to add the cached `oc` binary to your `$PATH`:
    ```
    crc oc-env
    ```
    Insert the command into /etc/profile. Example: `export PATH="$HOME/.crc.bin:$PATH"`
### kubectl
kubectl is required for deploying Appsody applications to OpenShift. To see if you have kubectl installed run `kubectl version`

To install kubectl follow these steps:
1. Get the code:
    ```
    curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
    ```
    ```
    curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.16.0/bin/linux/amd64/kubectl
    ```
1. Make the binary executable:
    ```
    chmod +x ./kubectl
    ```
1. Move the binary to your `$PATH`
    ```
    sudo mv ./kubectl /usr/local/bin/kubectl
    ```



