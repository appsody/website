---
path: /docs/using-appsody/installing-knative-locally
---


## Setting up Knative Serving for Local Kubernetes Development

In order to work with Kuberentes locally, it is recommended that you enable Kubernetes in Docker for Desktop. To do that, first make sure that Docker is running by running the Docker app which launches Docker and adds the Docker icon to the menu bar.

Select the Docker icon in the Menu bar, click **Preferences** and select the **Kubernetes** tab. Here select the **Enable Kubernetes** checkbox and click **Apply**.

Click **Install** on the dialog box asking, “Install the Kubernetes Cluster now?” to start the install. When it’s complete it will have installed Kubernetes along with the `kubectl` command line tool which `appsody` will use to deploy your applications.

Next ensure that Kubernetes has enough resources to run your apps by selecting the Docker icon in the Menu bar, click **Preferences** and select the **Advanced** tab. Use the sliders to ensure that you have **6 CPUs** and **8.0 GiB** of memory assigned to Kubernetes and click **Apply & Restart**.

You can now use the following commands to install Knative Serving 0.7.1 (currently the latest version) and its Istio dependency using the following commands:

1. Install Istio:

	```sh
	curl -L https://raw.githubusercontent.com/knative/serving/v0.5.2/third_party/istio-1.0.7/istio.yaml \
	  | kubectl apply --filename -
	```
	
	Next, label the default namespace with *istio-injection=enabled* using the following .
	
	```sh
	kubectl label namespace default istio-injection=enabled
	```
	
2. Verify the STATUS of the Istio components:

	```sh
	kubectl get pods --namespace istio-system --watch
	```
	
	Once all of the components have reached `Running` or `COMPLETED` you can stop watching the status using `Ctrl-C`.
	
3. Install Knative Serving 0.7.1:

	```sh
	curl -L https://github.com/knative/serving/releases/download/v0.7.1/serving.yaml \
	  | kubectl apply --selector networking.knative.dev/certificate-provider!=cert-manager --filename -
	```
4. Verify the STATUS of the Knative Serving components:

	```sh
	kubectl get pods --namespace knative-serving --watch
	```
	
	Once all of the components have reached `Running` you can stop watching the status using `Ctrl-C`.
	
5. Edit the `config-deployment` config map to enable the use of the local Docker Cache:

   ```sh
   kubectl edit -n knative-serving cm config-deployment
   ```
   
   Add `registriesSkippingTagResolving: "dev.local"` under `data` so that the top of your file becomes:
   
   ```sh
   apiVersion: v1
   data:
     registriesSkippingTagResolving: "dev.local"
   ```
   and use `ESCAPE` followed by `:wq` to save your changes.
   
6. Discover the "nip.io" address for your local machine:

   ```sh
   echo $(ifconfig | grep "inet 9." | cut -d ' ' -f2).nip.io
   ```
   This will print an address that you will use to set a config domain in the next step.
   
7. Edit your `config-domain` config map to set up the use of your "nip.io" domain:

	```sh
	kubectl edit cm config-domain -n knative-serving
	```
	
	Add and entry under `data` for your "nip.io" address so that the top of your file is similar to:
   
   ```sh
	apiVersion: v1
	data:
  	  9.174.18.28.nip.io: ""
   ```
   and use `ESCAPE` followed by `:wq` to save your changes.

You should now have Knative Serving installed in your Docker for Desktop based Kubernetes cluster.


