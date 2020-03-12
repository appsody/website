---
title: Metadata
---

# Metadata

Docker object labels in images allows easier discoverability of both Appsody applications and stacks.  When you package a stack or build an application with Appsody, several labels will be added to the resulting images which developers can access, for example to filter and organise images.

---

## Stack labels

When you package the stack by running the `stack package` command, the following labels are generated and added to the stack image:

The `org.opencontainers.image` labels are present every time a stack is packaged primarily using information from the `stack.yaml` and GitHub.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|---------------------------------------------|
| `org.opencontainers.image.authors`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `maintainer` field in `stack.yaml` | `Joe BLoggs <joebloggs@email.com>` |
| `org.opencontainers.image.created`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Timestamp when stack was packaged | `2020-03-03T16:19:59Z`|
| `org.opencontainers.image.description`   | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `description` field in `stack.yaml` | `Runnable starter stack` |
| `org.opencontainers.image.documentation` | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | https://github.com/appsody/stacks/tree/master/incubator/starter/README.md |
| `org.opencontainers.image.licenses`      | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `licenses` field in `stack.yaml` | `Apache-2.0` |
| `org.opencontainers.image.version`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `version` field in `stack.yaml`| `0.1.1` |
| `org.opencontainers.image.title`         | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `name` field in `stack.yaml` | `Starter Sample` |
| `org.opencontainers.image.revision`      | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Github | `c27fffdbe7a9443081ef6abbac2cb2d8125aeb45` |
| `org.opencontainers.image.source`        | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | https://github.com/appsody/stacks/tree/master/incubator/starter/image
| `org.opencontainers.image.url`           | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | https://github.com/appsody/stacks/tree/master/incubator/starter |

The `dev.appsody.image.commit` labels are present when a user has Git source control configured in their project.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|---------------------------------------------|
| `dev.appsody.image.commit.contextDir`    | You can use a subdirectory of your source code repository by specifying a --context-dir flag | Git | `incubator/starter` |
| `dev.appsody.image.commit.author`        | GitHub name and email of code author | Git | `Joe Bloggs <joe.bloggs@email.com` |
| `dev.appsody.image.commit.committer`     | GitHub name and email of Git committer | Git | `GitHub <noreply@github.com`|
| `dev.appsody.image.commit.date`          | Date on which Git commit was pushed | Git | `Tue Mar 3 16:16:43 2020 +0000` |
| `dev.appsody.image.commit.message`       | Message attributed to Git commit | Git | `starter - changed description text (#001)` |

The `dev.appsody.stack` labels are created from general information passed to the stack.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|---------------------------------------------|
| `dev.appsody.stack.id`                   | Stack ID | Name of directory stack is located in | `starter` |
| `dev.appsody.stack.tag`                  | Stack tag | Image namespace, image registry, stack ID and version | `docker.io/appsody/starter:0.1.1`|
| `dev.appsody.stack.deprecated`           | Stack deprecation message | Optional `deprecated` field in `stack.yaml` | `[01/01/2020] Deprecated` |

If there are additional labels present, they are inherited from the base image used by the stack.

---

## Application labels

The `build` command adds labels to the Appsody application image using information from:

- The generated application config file `.appsody-config.yaml` (prefix: `dev.appsody.app`)
- Git source control (prefix: `dev.appsody.image.commit`)
- The stack image (prefix: `dev.appsody.stack`)

The `build` command alters the [stack labels](#stack-labels) by changing the prefix of the labels from `org.opencontainers.image` to `dev.appsody.stack`.

> Labels that have an asterisk (`*`) attributed to them will only appear if the respective information has been manually added to the `.appsody-config.yaml` file (e.g. `version: 0.1.1`)

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|---------------------------------------------|
| `org.opencontainers.image.authors`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `maintainer` field in `stack.yaml` | `Joe BLoggs <joebloggs@email.com>` |
| `org.opencontainers.image.created`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Timestamp when stack was packaged | `2020-03-03T16:19:59Z`|
| `org.opencontainers.image.description`   | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `description` field in `stack.yaml` | `Runnable starter stack` |
| `org.opencontainers.image.documentation` | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | https://github.com/appsody/stacks/tree/master/incubator/starter/README.md |
| `org.opencontainers.image.licenses`      | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `licenses` field in `stack.yaml` | `Apache-2.0` |
| `org.opencontainers.image.version`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `version` field in `stack.yaml`| `0.1.1` |
| `org.opencontainers.image.title`         | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `name` field in `stack.yaml` | `Starter Sample` |
| `org.opencontainers.image.revision`      | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Github | `c27fffdbe7a9443081ef6abbac2cb2d8125aeb45` |
| `org.opencontainers.image.source`        | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | https://github.com/appsody/stacks/tree/master/incubator/starter/image
| `org.opencontainers.image.url`           | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | https://github.com/appsody/stacks/tree/master/incubator/starter |

---

## Custom Resources for Kubernetes

The `build` command generates the deployment manifest `app-deploy.yaml` using the [application labels](#application-labels) and reformats the labels to Kubernetes reverse domain notations (e.g. `dev.appsody.stack.id` becomes `stack.appsody.dev/id`).  The information is then exposed on the deployed resources in Kubernetes.

The only label that changes its prefix entirely is `dev.appsody.app.name` which becomes `app.kubernetes.io/part-of`.
