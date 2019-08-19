---
title: Running stack locally
path: /docs/stacks/run-locally
---

## Testing a stack locally using build scripts

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

   can be `incubator-local.yaml` or `experimental-local.yaml` or `stable-local.yaml`

```
file:///<current-file-path>/<local-stack-repo>
```

6. Add appsody repo e.g.
```
appsody repo add <local-stack-name> file://(absolute local path)
```

7. Now test your local stack
```
appsody init <local-stack>
```
