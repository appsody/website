---
title: Traceability Metadata
---

# Traceability Metadata

Appsody enables end-to-end traceability from development to deployment by injecting metadata in the form of labels and annotations on container images and Kubernetes resources.

---

## Stack labels

When you package the stack by running the `stack package` command, the following labels are generated and added to the stack image:

The `dev.appsody.image.commit` labels are created when Git source control is configured in a user's project.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|-------|
| `dev.appsody.image.commit.author`        | GitHub name and email of code author          |  Git| `Joe Bloggs <joe.bloggs@email.com`>|
| `dev.appsody.image.commit.committer`     | GitHub name and email of Git committer | Git | `GitHub <noreply@github.com`|
| `dev.appsody.image.commit.contextDir`    | You can use a subdirectory of your source code repository by specifying a --context-dir flag | Git | `incubator/starter` |
| `dev.appsody.image.commit.date`          | Date on which Git commit was pushed | Git | `Tue Mar 3 16:16:43 2020 +0000` |
| `dev.appsody.image.commit.message`       | Message attributed to Git commit | Git | `starter - changed description text (#001)` |

The `dev.appsody.stack` labels are created from general information that is passed to the stack.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `dev.appsody.stack.id`                   | Stack ID | Name of directory stack is located in | `starter` |
| `dev.appsody.stack.tag`                  | Stack tag | Image namespace, image registry, stack ID and version | `docker.io/appsody/starter:0.1.1`|
| `dev.appsody.stack.deprecated`           | **OPTIONAL** - Stack deprecation message if stack is deprecated | `deprecated` field in `stack.yaml` | `[01/01/2020] -  Deprecated` |

The `org.opencontainers.image` labels are created every time that a stack is packaged, primarily by using information from the `stack.yaml` and GitHub.

`<GitHub Stack URl>` = https://github.com/appsody/stacks/tree/master/incubator/starter

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|----------|
| `org.opencontainers.image.authors`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `maintainer` field in `stack.yaml`| `Joe BLoggs <joebloggs@email.com>` |
| `org.opencontainers.image.created`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  Created by the `stack package` command| `2020-03-03T16:19:59Z`|
| `org.opencontainers.image.description`   | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  `description` field in `stack.yaml`| `Runnable starter stack`|
| `org.opencontainers.image.documentation` | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  GitHub | `<GitHub Stack URl>/README.md`
| `org.opencontainers.image.licenses`      | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  `licenses` field in `stack.yaml` |  `Apache-2.0`|
| `org.opencontainers.image.revision`      | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  Github |  `c27fffdbe7a9443081ef6abbac2cb2d8125aeb45` |
| `org.opencontainers.image.source`        | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  GitHub |  `<GitHub Stack URl>/image` |
| `org.opencontainers.image.title`         | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  `name` field in `stack.yaml`|  `Starter Sample` |
| `org.opencontainers.image.url`           | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  GitHub |  `<GitHub Stack URl>` |
| `org.opencontainers.image.version`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)|  `version` field in `stack.yaml`|  `0.1.1`                                            |

If there are additional labels present, they are inherited from the base image used by the stack.

---

## Application labels

The `build` command adds labels to the Appsody application image using information from:

- The generated application config file `.appsody-config.yaml` (prefix: `dev.appsody.app`)
- Git source control (prefix: `dev.appsody.image.commit`)
- The stack image (prefix: `dev.appsody.stack`)

The `dev.appsody.app` labels are created using information from the `.appsody-config.yaml`

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|---------------------------------------------|
| `dev.appsody.app.name`       | Application name | `application-name` field in `.appsody-config.yaml` | `hello-world` |

The `dev.appsody.image.commit` labels are created when Git source control is configured in a user's project.

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `dev.appsody.image.commit.author`        | GitHub name and email of code author | Git | `Joe Bloggs <joe.bloggs@email.com` |
| `dev.appsody.image.commit.committer`     | GitHub name and email of Git committer | Git | `GitHub <noreply@github.com`|
| `dev.appsody.image.commit.contextDir`    | You can use a subdirectory of your source code repository by specifying a --context-dir flag | Git | `incubator/starter` |
| `dev.appsody.image.commit.date`          | Date on which Git commit was pushed | Git | `Tue Mar 3 16:16:43 2020 +0000` |
| `dev.appsody.image.commit.message`       | Message attributed to Git commit | Git | `hello-world - fixes (#001)` |

The `dev.appsody.stack` labels are inherited from the stack image. The `build` command changes the prefix for each of the [stack labels](#stack-labels) from `org.opencontainers.image` to `dev.appsody.stack`.

`<GitHub URl>` = https://github.com/appsody/stacks/tree/master/incubator/starter

| Labels                                   | Description  | Origin  | Example  |
|------------------------------------------|-----------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `dev.appsody.stack.authors`       | Stack maintainers names and emails | `authors` field in `stack.yaml` | `Joe BLoggs <joebloggs@email.com>`            |
| `dev.appsody.stack.configured`       | Version of stack used for project |  `configured` field in `.appsody-config.yaml` | `2020-03-03T16:19:59Z`                         |
| `dev.appsody.stack.created`       | Timestamp of when stack was packaged |  Created by the `stack package` command | `2020-03-03T16:19:59Z`                         |
| `dev.appsody.stack.deprecated`           | **OPTIONAL** - Stack deprecation message if stack is deprecated | `deprecated` field in `stack.yaml` | `[01/01/2020] Deprecated` |
| `dev.appsody.stack.description`   | Stack description| `description` field in `stack.yaml`| `Runnable starter stack`                     |
| `dev.appsody.stack.documentation` | Stack `README`| GitHub | `<GitHub Stack URl>/README.md` |
| `dev.appsody.stack.id`            | Stack ID | Name of directory stack is located in | `starter` |
| `dev.appsody.stack.licenses`      | Licenses attributed to stack | `licenses` field in `stack.yaml` | `Apache-2.0`                                    |
| `dev.appsody.stack.version`       | Stack version | `version` field in `stack.yaml`| `0.1.1`                                            |
| `dev.appsody.stack.tag`           | Stack tag | Image namespace, image registry, stack ID and version | `docker.io/appsody/starter:0.1.1`|
| `dev.appsody.stack.title`         | Stack title | `name` field in `stack.yaml` | `Starter Sample` |
| `dev.appsody.stack.revision`      | Git commit hash of when stack was pushed to Github | Github | `c27fffdbe7a9443081ef6abbac2cb2d8125aeb45` |
| `dev.appsody.stack.source`        | Image directory of Stack GitHub repo | GitHub | `<GitHub Stack URl>/image` |
| `dev.appsody.stack.url`           | URL of stack in GitHub rerpo | GitHub | <GitHub Stack URl> |
| `dev.appsody.stack.commit.author`        | GitHub name and email of code author | Git | `Joe Bloggs <joe.bloggs@email.com` |
| `dev.appsody.stack.commit.committer`     | GitHub name and email of Git committer | Git | `GitHub <noreply@github.com`|
| `dev.appsody.stack.commit.contextDir`    | You can use a subdirectory of your source code repository by specifying a --context-dir flag | Git | `incubator/starter` |
| `dev.appsody.stack.commit.date`          | Date on which Git commit was pushed | Git | `Tue Mar 3 16:16:43 2020 +0000` |
| `dev.appsody.stack.commit.message`       | Message attributed to Git commit | Git | `starter - changed description text (#001)` |

The `org.opencontainers.image` labels are created every time that a stack is packaged, primarily by using information from the `.appsody-config.yaml` and GitHub.

`<GitHub Project URL>` = https://github.com/JoeBlogg/tree/master/HelloWorld

| Labels                                   | Description  | Origin | Example |
|------------------------------------------|-----------------------------------------------|--------------------------------|---------------------------------------------|
| `org.opencontainers.image.authors`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `authors` field in `.appsody-config.yaml` | `Joe BLoggs <joebloggs@email.com>` |
| `org.opencontainers.image.created`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Timestamp when application was built | `2020-03-03T16:19:59Z`|
| `org.opencontainers.image.description`   | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `description` field in `.appsody-config.yaml` | `Simple "Hello, World!" application` |
| `org.opencontainers.image.documentation` | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | `<GitHub Project URL>/README.md` |
| `org.opencontainers.image.licenses`      | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `licenses` field in `.appsody-config.yaml` | `Apache-2.0` |
| `org.opencontainers.image.revision`      | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Github | `c27fffdbe7a9443081ef6abbac2cb2d8125aeb45` |
| `org.opencontainers.image.source`        | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | `<GitHub Project URL>` |
| `org.opencontainers.image.title`         | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| Application directory name | `hello-world` |
| `org.opencontainers.image.url`           | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| GitHub | `<GitHub Project URL>` |
| `org.opencontainers.image.version`       | [Opencontainer Spec](https://github.com/opencontainers/image-spec/blob/master/annotations.md#pre-defined-annotation-keys)| `version` field in `.appsody-config.yaml`| `0.1.1` |

---

## Custom Resources for Kubernetes

The `build` command generates the deployment manifest `app-deploy.yaml` using the [application labels](#application-labels) and reformats the labels to Kubernetes reverse domain notations (e.g. `dev.appsody.stack.id` becomes `stack.appsody.dev/id`).  The information is then exposed on the deployed resources in Kubernetes.

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
