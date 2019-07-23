---
path: /docs/faq
---

#FAQ

Welcome to the FAQ. Here you will find a list of common questions and answers along with CLI issues you may face.

##CLI Issues

###1. Does Appsody support Enterprise Windows users?
Appsody does support Enterprise Windows users, however it may require a workaround. Please follow these steps.
1. Create a new project

2. Run ```appsody init --config C:\my-appsody-config-dir.appsody-config.yaml```

3. ```notepad C:\my-appsody-config-dir\.appsody-config.yaml```

4. Change the entry ```home:``` to ```C:\my-appsody-config-dir```

5. Run ```appsody run --config C:\my-appsody-config-dir\.appsody.yaml```

For more information on this issue, click [here](https://github.com/appsody/appsody/issues/24).

###2. Why am I getting a cross-device link error on Appsody extract?

This was an issue that was faced in an older version of the software. If you are experiencing this problem, navigate to our [GitHub Page](https://github.com/appsody) and ensure you are operating on the latest version. If you would like more information on this issue, please click [here](https://github.com/appsody/appsody/issues/82).
                                                                                                                
###3. Why is Appsody deploy not displaying the URL of the Knative service?

Although the Knative URL is not displaying, Appsody should have still been deployed successfully. This is a timing issue where ```kubectl apply``` finishes executing before all resources have been made available.