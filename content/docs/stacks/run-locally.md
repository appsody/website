---
title: Running stack locally
path: /docs/stacks/run-locally
---

## Building a stack locally using build scripts

Using a build script (build.sh) you can build only the stack images that you want to create/modify.

Environment variable (STACKS_LIST) is used to specify which build scripts need to build, otherwise by default all the stacks images will build.

1. Set the environment variable
```
export STACKS_LIST="incubator/nodejs-loopback"
```
2. Run build.sh file
```
./ci/build.sh .
```

3. Go inside assets folder
```
 cd assets
```

4. Get your current file path using `pwd`

5. Add appsody repository by running:

```
appsody repo add <local-stack-name> file:///<current-file-path>/<local-stack-repo>
```
Note: `<local-stack-repo>` can be `incubator-local.yaml` or `experimental-local.yaml` or `stable-local.yaml`


For example:
```
appsody repo add my-repo file:///Users/foo/stacks/ci/assets/experimental-index-local.yaml
```

6. Now test your local stack
```
appsody init <local-stack>
```

7. Run the template with the new/modified stack image:
```
appsody run
```

## Building a stack image locally
To build your stack image locally follow the below steps:
1. Navigate to the `/image` directory:
2. Build stack image:
```
docker build -t <org-name>/<stack-id> -f Dockerfile-stack .
```
You can now have access to the stack image to use and test locally.

### Pointing a template to use a specific stack image
1. Navigate to template directory
```
cd /templates/<template-name>
```
2. Edit `.appsody-config.yaml` to use your stack:
```
stack: <org-name>/<stack-id>
```
3. Run the template with the new stack image:
```
appsody run
```
