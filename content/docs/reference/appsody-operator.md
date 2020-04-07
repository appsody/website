---
title: Appsody Operator
---

# How the Appsody operator works
Before we delve into the details of `appsody deploy` and `appsody operator`, we need to spend a few words on how the Appsody operator works.

An operator monitors certain resources - it can detect when resource definition instances are added, removed, or changed, and take the appropriate action.

The Appsody operator monitors instances of the **AppsodyApplication** resource. It does so by "watching" a certain namespace, which is defined when the Appsody operator is installed. The operator can watch a single namespace, or all the namespaces in the cluster.

The operator itself, however, can be installed in its own namespace, which not necessarily coincides with the namespace it is watching. You can have an Appsody operator in namespace "abc" watching namespace "xyz".

You can also have multiple Appsody operators in a cluster, but only one operator can watch a certain namespace. Also, only one operator can be installed in any given namespace.

Lastly, if you have an Appsody operator that watches the entire cluster, that can be the only Appsody operator in the cluster.

## Using `appsody deploy` with the Appsody operator
When you run `appsody deploy` on a project that is based on a stack that is enabled for the Appsody operator, this command will do the following:
- It will check whether there is an Appsody operator in the target namespace that watches that same namespace
- If there isn't one, it attempts to install it. If there's already an operator, the command will move to the next step.
- The command will then proceed to install the AppsodyApplication (your app)

The command can be run with or without a `--namespace` or `-n` flag. If that flag is omitted, you are targeting the `default` namespace.

The command also accepts an optional `--knative` flag, which instructs Appsody to deploy your application as a Knative service. More on this option [in this section](#deployment-as-a-knative-service)

When you want to remove your application, you can run:

```
appsody deploy delete
```
This command must be run from your Appsody project directory. It will attempt to remove the application you installed, but it will not touch the Appsody operator.

## Using the `appsody operator` commands
In certain cases, you may want to deploy one or more Appsody operators on your cluster ahead of time, and let developers deploy their applications to the cluster without them having to meddle with operator deployments.

The `appsody operator` commands can be used to install or uninstall those operators. They take this form:
```
appsody operator install --namespace <operator namespace> --watchspace <watched namespace>
appsody operator uninstall --namespace <operator namespace>
```
The first command attempts to install an Appsody operator in `operator namespace`, watching the `watched namespace`. If the `--watchspace` flag is omitted, the watched namespace will default to the operator namespace. If both flags are omitted, both namespaces will be assumed to be the `default` namespace.

The second command attempts to remove the Appsody operator installed in the `operator namespace`, if there is one. When you run that command, the Appsody CLI will check whether there are Appsody applications that are present in the watched namespace associated with that operator. If there are any, the command will take no action and produce a message that suggests using the `--force` flag to force the removal of the apps, as shown below:
```
appsody operator uninstall --namespace <operator namespace> --force
```

You can also install an Appsody operator that watches the entire cluster, using the following command:
```
appsody operator install --namespace <operator namespace> --watch-all
```

### RBAC considerations for the use of `appsody deploy` and `appsody operator` commands

The `appsody deploy` and `appsody operator` commands involve the lookup and creation of a number of different resources, both in specific namespaces and at the cluster level.

In a typical local testing scenario, developers have full administrative rights on the entire cluster. In that case, no specific provisions need to be made in terms of granting permissions.

However, if a single cluster is shared across many development groups, it is common practice to restrict full access to resources by limiting it to a single namespace. An individual developer or a group of developers would have the ability to create, modify, and delete resources only in a certain namespace.

The use of `appsody deploy` and `appsody operator` commands, however, requires granting the following permissions:
1) Querying Appsody operator instances across namespaces
2) Creating the `AppsodyApplication` CRDs
3) Querying `RoleBindings` across namespaces
4) Creating instances of the Appsody operator in a namespace
5) Full access to resources in the watched namespace of the operator, if different from the namespace where the operator is installed

In a shared cluster scenario, with developers limited to access their own namespace, we expect the most common pattern of usage will be the following:

1) Developers can use `appsody deploy -n <namespace>` to target their own namespace. The first time `appsody deploy` is used, the operator is installed and it watches the namespace of choice.

2) Only cluster administrators can use `appsody operator install -n <namespace> --watchspace <another namespace>` to enable operators to watch across namespaces.

Under these assumptions, developers need to be granted the following permissions:
1) First, through a Role:
```
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: $NAMESPACE-user-full-access
  namespace: $NAMESPACE
rules:
- apiGroups: ["", "extensions", "apps", "autoscaling", "appsody.dev", "rbac.authorization.k8s.io"]
  resources: ["*"]
  verbs: ["*"]
- apiGroups: ["batch"]
  resources:
  - jobs
  - cronjobs
  verbs: ["*"]
```
This role grants full access to resources in a certain namespace (substitute the `$NAMESPACE` placeholder with the namespace name), including the Appsody operator resources.

2) Second, through a ClusterRole:
```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: $NAMESPACE-user-node-readonly-access
rules:
- apiGroups: ["", "apps", "autoscaling", "extensions"]
  resources: ["*"]
  verbs: ["get", "watch", "list"]
- apiGroups: ["apiextensions.k8s.io"]
  resources: ["customresourcedefinitions"]
  verbs: ["*"]
- apiGroups: ["rbac.authorization.k8s.io"]
  resources: ["rolebindings"]
  verbs: ["get", "watch", "list"]  
  ```
  This ClusterRole allows users to lookup the necessary resources across namespaces, and to create CRDs anywhere in the cluster (which is required by the installation of the operator, in certain cases).

  Once you have these roles in place, you need to create the appropriate RoleBinding and ClusterRoleBinding to bind your users or groups to them.


### Considerations on Appsody operators not installed via the Appsody CLI
Appsody operators can be installed through different means - the Appsody CLI is one of the ways to get them installed.
- The Appsody CLI assumes you have at most one Appsody operator per namespace. If you install the operator with the Appsody CLI, this constraint is enforced by the CLI itself. If you use different techniques to install the operator, make sure you do not install multiple operators in the same namespace.

- The Appsody operators created by `appsody operator install` or `appsody deploy` watch only one namespace.  However, the Appsody CLI operations `appsody operator install` and `appsody deploy` can tolerate an Appsody operator created by a different mechanism which watches multiple namespaces.