---
title: "Replacing the Eclipse MicroProfile® stack"
date: "2020-04-28"
author: "Adam Wisniewski"
imagePath: "./resources/open-liberty-logo.png"
---

# Replacing the Eclipse MicroProfile® stack

![OpenLibertyLogo](./resources/open-liberty-logo.png)

Appsody's java-microprofile stack offered a great foundation for building Eclipse MicroProfile applications on Open Liberty's fast and lightweight framework. Now, with the new Open Liberty stack encompassing the same MicroProfile development experience, there is no longer a need for both stacks. As they say, all good things must come to an end.


## Why use the Open Liberty stack?

The java-microprofile stack was centered around the Eclipse MicroProfile platform leveraging the Open Liberty runtime in the background. The new Open Liberty stack reverses that, bringing the Open Liberty runtime to the forefront while preserving the MicroProfile development capabilities. This design gives developers more flexibility when creating their applications by opening up all of the features and functionality of Open Liberty. Looking to develop a pure MicroProfile application? Go right ahead! Need Jakarta EE? We got it!

Additionally, the Open Liberty stack is enhanced with faster start up times, smarter caching, and most notably, Liberty "dev mode". When you run in Liberty "dev mode," changes to your application are picked up in real time, without having to restart the server.

For a guided tour of the Open Liberty stack, check out [this tutorial](https://appsody.dev/tutorials/open-liberty-stack-tutorial/).

## Considerations when switching to Open Liberty

* Liberty Maven plugin version 3.x

The Open Liberty stack uses Liberty Maven plug-in version 3.x, which has some significant changes and improvements over the 2.x releases. More information can be found [here](https://openliberty.io/blog/2019/11/28/dev-mode-liberty-maven-plugin.html).
