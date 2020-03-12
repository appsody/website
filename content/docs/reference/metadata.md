---
title: Metadata
---

# Metadata

Docker object labels in images allows easier discoverability of both Appsody applications and stacks.  When you package a stack or build an application with Appsody, several labels will be added to the resulting images which developers can access, for example to filter and organise images.

---

## Stack labels

The following metadata is generated when using the `stack package` command, and then added to the stack image.

| Labels                                   | Description                                                                                                                  |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `org.opencontainers.image.created`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.authors`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.version`       | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.licenses`      | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.title`         | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.description`   | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.url`           | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.documentation` | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.source`        | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.revision`      | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `dev.appsody.image.commit.contextDir`    | Parent directories of stack (e.g. `/incubator/starter`)                                                                      |
| `dev.appsody.image.commit.author`        | GitHub username of code author                                                                                               |
| `dev.appsody.image.commit.committer`     | GitHub username of committer                                                                                                 |
| `dev.appsody.image.commit.date`          | Date on which Git commit was pushed                                                                                          |
| `dev.appsody.image.commit.message`       | Message attributed to Git commit                                                                                             |
| `dev.appsody.stack.id`                   | Name of directory stack is located in                                                                                        |
| `dev.appsody.stack.tag`                  | Image namespace, image registry, stack ID and version (e.g. `appsody/docker.io/nodejs:0.1.1`)                                |
| `dev.appsody.stack.deprecated`           | Optional value included in `stack.yaml` to indicate stack is deprecated                                                      |

If there are additional labels present they are inherited from the base image used by the stack.

---

## Application labels

The `build` command adds metadata to the Appsody application image using information from:

- The generated application config file `.appsody-config.yaml` (prefix: `dev.appsody.app`)
- Git source control (prefix: `dev.appsody.image.commit`)
- The stack image (prefix: `dev.appsody.stack`)

The `build` command alters the [stack labels](#stack-labels) by changing the prefix of the labels from `org.opencontainers.image` to `dev.appsody.stack`.

> Metadata that has an asterisk (`*`) attributed to them will only appear if the respective information has been manually added to the `.appsody-config.yaml` file (e.g. `version: 0.1.1`)

| Labels                                      | Description                                                                                                                  |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `org.opencontainers.image.created`          | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.authors`*         | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.version`*         | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.licenses`*        | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.title`            | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.description`*     | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.url`              | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.documentation`    | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.source`           | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `org.opencontainers.image.revision`         | [Annotation definitions](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|
| `dev.appsody.image.commit.contextDir`       | Parent directories of application                                                                                            |
| `dev.appsody.image.commit.author`           | GitHub username of code author                                                                                               |
| `dev.appsody.image.commit.committer`        | GitHub username of committer                                                                                                 |
| `dev.appsody.image.commit.date`             | Date on which Git commit was pushed                                                                                          |
| `dev.appsody.image.commit.message`          | Message attributed to Git commit                                                                                             |
| `dev.appsody.app.name`*                     | Application name defined in `.appsody-config.yaml`                                                                           |

---

## Custom Resources for Kubernetes

The `build` command generates the deployment manifest `app-deploy.yaml` using the [application labels](#application-labels) and reformats the metadata to Kubernetes reverse domain notations (e.g. `dev.appsody.stack.id` becomes `stack.appsody.dev/id`).  The information is then exposed on the deployed resources in Kubernetes.

The only label that changes its prefix entirely is `dev.appsody.app.name` which becomes `app.kubernetes.io/part-of`.
