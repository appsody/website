---
title: Traceability Metadata
---

# Traceability Metadata

Appsody enables end-to-end traceability from development to deployment by injecting metadata, in the form of labels and annotations, on container images and Kubernetes resources.

---

## Stack labels

When you package the stack by running the `stack package` command, the following labels are generated and added to the stack image:

Labels with the prefix: `dev.appsody.image.commit` are created when Git source control is configured for stack source code.

`<GitHub Stack URL>` = https://github.com/appsody/stacks/tree/master/incubator/starter

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|-------|
| `dev.appsody.image.commit.author`        | GitHub name and email of code author          |  Git | `Joe Bloggs <joe.bloggs@email.com>`|
| `dev.appsody.image.commit.committer`     | GitHub name and email of Git committer | Git | `GitHub <noreply@github.com>`|
| `dev.appsody.image.commit.contextDir`    | Subdirectory specifying the source code for the stack | Git | `incubator/starter` |
| `dev.appsody.image.commit.date`          | Date for commit creation or push | Git | `Tue Mar 3 16:16:43 2020 +0000` |
| `dev.appsody.image.commit.message`       | Message attributed to Git commit | Git | `starter - changed description text (#001)` |

Labels with the prefix: `dev.appsody.stack` are created from general information that is passed to the stack.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `dev.appsody.stack.id`                   | Stack ID | Identifier for stack | `starter` |
| `dev.appsody.stack.tag`                  | Stack tag | Tag for stack image | `docker.io/appsody/starter:0.1.1`|
| `dev.appsody.stack.deprecated`           | Optional - The reason for deprecating the stack | `deprecated` field in `stack.yaml` | `[01/01/2020] -  Deprecated` |

Appsody adds labels described by OCI Image specification while building stack container images, primarily by using information from the `stack.yaml` and GitHub.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|----------|
| `org.opencontainers.image.authors`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `maintainers` field in `stack.yaml`| `Joe BLoggs <joebloggs@email.com>` |
| `org.opencontainers.image.created`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  Created by the `stack package` command| `2020-03-03T16:19:59Z`|
| `org.opencontainers.image.description`   | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  `description` field in `stack.yaml`| `Runnable starter stack`|
| `org.opencontainers.image.documentation` | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  GitHub | `<GitHub Stack URL>/README.md`
| `org.opencontainers.image.licenses`      | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  `license` field in `stack.yaml` |  `Apache-2.0`|
| `org.opencontainers.image.revision`      | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  Github |  `c27fffdbe7a9443081ef6abbac2cb2d8125aeb45` |
| `org.opencontainers.image.source`        | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  GitHub |  `<GitHub Stack URL>/image` |
| `org.opencontainers.image.title`         | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  `name` field in `stack.yaml`|  `Starter Sample` |
| `org.opencontainers.image.url`           | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  GitHub |  `<GitHub Stack URL>` |
| `org.opencontainers.image.version`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  `version` field in `stack.yaml`|  `0.1.1`                                            |

If there are additional labels present, they are inherited from the base image used by the stack.

---

## Application labels

The `build` command adds labels to the Appsody application image using information from:

- The generated application config file `.appsody-config.yaml` (prefix: `dev.appsody.app`)
- Git source control (prefix: `dev.appsody.image.commit`)
- The stack image (prefix: `dev.appsody.stack`)

Labels with the prefix: `dev.appsody.app` are created using information from the `.appsody-config.yaml`

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|---------------------------------------------|
| `dev.appsody.app.name`       | Application your project is part of | `application-name` field in `.appsody-config.yaml` | `hello-world` |

Labels with the prefix: `dev.appsody.image.commit` are created when Git source control is configured in a user's project.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `dev.appsody.image.commit.author`        | GitHub name and email of code author | Git | `Joe Bloggs <joe.bloggs@email.com>` |
| `dev.appsody.image.commit.committer`     | GitHub name and email of Git committer | Git | `GitHub <noreply@github.com>`|
| `dev.appsody.image.commit.contextDir`    | Subdirectory specifying the source code for the application | Git | `incubator/starter` |
| `dev.appsody.image.commit.date`          | Date on which Git commit was created | Git | `Tue Mar 3 16:16:43 2020 +0000` |
| `dev.appsody.image.commit.message`       | Message attributed to Git commit | Git | `hello-world - fixes (#001)` |

Labels with the prefix: `dev.appsody.stack` are inherited from the stack image. The `build` command changes the prefix for each of the [stack labels](#stack-labels) from `org.opencontainers.image` to `dev.appsody.stack` and adds some more by inspecting the stack image.

`<GitHub Stack URL>` = https://github.com/appsody/stacks/tree/master/incubator/starter

| Labels                                   | Description  | Origin  | Example  |
|------------------------------------------|-----------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `dev.appsody.stack.authors`       | Stack maintainers names and emails | `authors` field in `stack.yaml` | `Joe BLoggs <joebloggs@email.com>`            |
| `dev.appsody.stack.configured`       | The version of the stack your application is configured to use |  `stack` field in `.appsody-config.yaml` | `docker.io/appsody/starter:0.1`                         |
| `dev.appsody.stack.created`       | Timestamp of when stack was packaged |  Created by the `stack package` command | `2020-03-03T16:19:59Z`                         |
| `dev.appsody.stack.deprecated`           | **OPTIONAL** - Stack deprecation message if stack is deprecated | `deprecated` field in `stack.yaml` | `[01/01/2020] Deprecated` |
| `dev.appsody.stack.description`   | Stack description| `description` field in `stack.yaml`| `Runnable starter stack`                     |
| `dev.appsody.stack.documentation` | Stack `README`| Location for stack documentation | `<GitHub Stack URL>/README.md` |
| `dev.appsody.stack.id`            | ID of the stack that was used to build the application | Name of directory stack is located in | `starter` |
| `dev.appsody.stack.licenses`      | Licenses attributed to stack | `license` field in `stack.yaml` | `Apache-2.0`                                    |
| `dev.appsody.stack.version`       | The version of the stack that was used to build the application.  This can be a specific version. | `version` field in `stack.yaml`| `0.1.1`                                            |
| `dev.appsody.stack.tag`           | Stack tag | Full tag for the stack image including registry, namespace, id an version | `docker.io/appsody/starter:0.1.1`|
| `dev.appsody.stack.title`         | Stack title | Name of the stack used | `Starter Sample` |
| `dev.appsody.stack.revision`      | Revision for the source code for the version of the stack | Github | `c27fffdbe7a9443081ef6abbac2cb2d8125aeb45` |
| `dev.appsody.stack.source`        | URL for the source code for the image of the stack version | GitHub | `<GitHub Stack URL>/image` |
| `dev.appsody.stack.url`           | URL for the source code for this version of the stack | GitHub | <GitHub Stack URL> |
| `dev.appsody.stack.commit.author`        | GitHub name and email of code author | Git | `Joe Bloggs <joe.bloggs@email.com` |
| `dev.appsody.stack.commit.committer`     | GitHub name and email of Git committer | Git | `GitHub <noreply@github.com`|
| `dev.appsody.stack.commit.contextDir`    | Directory in GitHub repo that points to source code of the stack | Git | `incubator/starter` |
| `dev.appsody.stack.commit.date`          | Date on which Git commit was created | Git | `Tue Mar 3 16:16:43 2020 +0000` |
| `dev.appsody.stack.commit.message`       | Message attributed to Git commit | Git | `starter - changed description text (#001)` |

Labels with the prefix: `org.opencontainers.image` are created every time that a stack is packaged, primarily by using information from the `.appsody-config.yaml` and GitHub.

`<GitHub Project URL>` = https://github.com/JoeBlogg/tree/master/HelloWorld

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|---------------------------------------------|
| `org.opencontainers.image.authors`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `authors` field in `.appsody-config.yaml` | `Joe BLoggs <joebloggs@email.com>` |
| `org.opencontainers.image.created`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Timestamp when application was built | `2020-03-03T16:19:59Z`|
| `org.opencontainers.image.description`   | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `description` field in `.appsody-config.yaml` | `Simple "Hello, World!" application` |
| `org.opencontainers.image.documentation` | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | `<GitHub Project URL>/README.md` |
| `org.opencontainers.image.licenses`      | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `license` field in `.appsody-config.yaml` | `Apache-2.0` |
| `org.opencontainers.image.revision`      | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Github | `c27fffdbe7a9443081ef6abbac2cb2d8125aeb45` |
| `org.opencontainers.image.source`        | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | `<GitHub Project URL>` |
| `org.opencontainers.image.title`         | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Application directory name | `hello-world` |
| `org.opencontainers.image.url`           | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | `<GitHub Project URL>` |
| `org.opencontainers.image.version`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `version` field in `.appsody-config.yaml`| `0.1.1` |

---

## Custom Resources for Kubernetes

The `build` command injects all the traceability information from the [stack](#stack-labels) and the [application](#application-labels) into the deployment manifest (`app-deploy.yaml`). While adding this information, it reformats the label names to adhere to the Kubernetes reverse domain notation.

When the application is deployed, the traceability information is made available to Kubernetes resources (deployments, services etc.) that represent the application.

| Original Label | Kubernetes Custom Resource |
|----------------|----------------------------|
| `dev.appsody.app.name` | `app.kubernetes.io/part-of` |
| `dev.appsody.image.commit.author`        | `commit.image.appsody.dev/author` |
| `dev.appsody.image.commit.committer`     | `commit.image.appsody.dev/committer` |
| `dev.appsody.image.commit.contextDir`    | `commit.image.appsody.dev/contextDir` |
| `dev.appsody.image.commit.date`          | `commit.image.appsody.dev/date` |
| `dev.appsody.image.commit.message`       | `commit.image.appsody.dev/message` |
| `dev.appsody.stack.authors`              | `stack.appsody.dev/authors` |
| `dev.appsody.stack.created`              | `stack.appsody.dev/created` |
| `dev.appsody.stack.deprecated`           | `stack.appsody.dev/deprecated` |
| `dev.appsody.stack.description`          | `stack.appsody.dev/description` |
| `dev.appsody.stack.documentation`        | `stack.appsody.dev/documentation` |
| `dev.appsody.stack.id`                   | `stack.appsody.dev/id` |
| `dev.appsody.stack.licenses`             | `stack.appsody.dev/licenses` |
| `dev.appsody.stack.version`              | `stack.appsody.dev/version` |
| `dev.appsody.stack.title`                | `stack.appsody.dev/title` |
| `dev.appsody.stack.revision`             | `stack.appsody.dev/revision` |
| `dev.appsody.stack.source`               | `stack.appsody.dev/source` |
| `dev.appsody.stack.tag`                  | `stack.appsody.dev/tag` |
| `dev.appsody.stack.url`                  | `stack.appsody.dev/url` |
| `dev.appsody.stack.commit.author`        | `commit.stack.appsody.dev/author` |
| `dev.appsody.stack.commit.committer`     | `commit.stack.appsody.dev/committer` |
| `dev.appsody.stack.commit.contextDir`    | `commit.stack.appsody.dev/contextDir` |
| `dev.appsody.stack.commit.date`          | `commit.stack.appsody.dev/date` |
| `dev.appsody.stack.commit.message`       | `commit.stack.appsody.dev/message` |
| `org.opencontainers.image.authors`       | `image.opencontainers.org/authors` |
| `org.opencontainers.image.created`       | `image.opencontainers.org/created` |
| `org.opencontainers.image.description`   | `image.opencontainers.org/description` |
| `org.opencontainers.image.documentation` | `image.opencontainers.org/documentation` |
| `org.opencontainers.image.licenses`      | `image.opencontainers.org/licenses` |
| `org.opencontainers.image.revision`      | `image.opencontainers.org/revision` |
| `org.opencontainers.image.source`        | `image.opencontainers.org/source` |
| `org.opencontainers.image.title`         | `image.opencontainers.org/title` |
| `org.opencontainers.image.url`           | `image.opencontainers.org/url` |
| `org.opencontainers.image.version`       | `image.opencontainers.org/version` |
