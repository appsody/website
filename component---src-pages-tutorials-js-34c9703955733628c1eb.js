(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{175:function(e,t,a){"use strict";a.r(t);var o=a(0),s=a.n(o),i=a(184),n=(a(194),a(65),a(9)),l=a.n(n),r=a(286),p=a(98),d=a(287),c=a.n(d),u=function(e){var t=e.title,a=e.subtext,o=e.length,i=e.slug;return s.a.createElement(p.Link,{className:"blog-link",to:i},s.a.createElement("div",{className:"tutorial-container"},s.a.createElement("h2",{className:"blog-title"},t),s.a.createElement("p",{className:"tutorial-subtext"},a),s.a.createElement("p",{className:"tutorial-length"},s.a.createElement("img",{className:"tutorial-length-icon",src:c.a})," ~ ",o)))},m=function(e){function t(){return e.apply(this,arguments)||this}l()(t,e);var a=t.prototype;return a.generateBlogs=function(){return this.props.tutorials.map(function(e){return s.a.createElement(u,{title:e.frontmatter.title,subtext:e.excerpt.replace(e.frontmatter.title,""),length:e.frontmatter.length,slug:e.fields.slug})})},a.render=function(){return s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"blog-grid"},this.generateBlogs()))},t}(o.Component),h=function(){return s.a.createElement(p.StaticQuery,{query:"3041950770",render:function(e){var t=[];return e.allMarkdownRemark.nodes.forEach(function(e){t=t.concat(e)}),s.a.createElement(m,{tutorials:t})},data:r})};a.d(t,"query",function(){return g});var g="3134450968";t.default=function(e){e.data;return s.a.createElement(i.a,{title:"Appsody - Tutorials",className:"tutorials-page"},s.a.createElement("div",{className:"container tutorials-section tutorials-page"},s.a.createElement("section",{className:"all-tutorials-section"},s.a.createElement("h2",{className:"tutorials-header"},"Tutorials"),s.a.createElement(h,null))))}},194:function(e,t,a){"use strict";var o=a(0),s=a.n(o),i=a(98);t.a=function(e){var t=e.title,a=e.subtext,o=e.author,n=e.date,l=e.slug;return s.a.createElement(i.Link,{className:"blog-link",to:l},s.a.createElement("div",{className:"wide-blog-container"},s.a.createElement("div",{className:"wide-blog-image-container"},s.a.createElement("img",{className:"wide-blog-image",src:"https://miro.medium.com/max/2800/1*AmrAV709WQFlXgs4R4zZEw.jpeg",alt:"Blog post pic"})),s.a.createElement("h2",{className:"wide-blog-title"},t),s.a.createElement("p",{className:"wide-blog-subtext"},a),s.a.createElement("p",{className:"wide-blog-author"},"by ",o),s.a.createElement("p",{className:"wide-blog-date"},"Posted ",n)))}},286:function(e){e.exports={data:{allMarkdownRemark:{nodes:[{fields:{slug:"/tutorials/open-liberty-stack-tutorial/"},frontmatter:{title:"Using the Open Liberty stack",date:"6 days ago",author:"Adam Wisniewski",length:"30 mins"},excerpt:'Using the Open Liberty stackOpen Liberty is a lightweight, open framework for building fast and efficient cloud-native microservices.\nBlazingly fast startup times and seamless "dev mode" integration means you can focus less on\nadministration and more on writing code.Appsody takes…'},{fields:{slug:"/tutorials/DevelopAndDeployLoopbackAppsWithAppsody/"},frontmatter:{title:"Developing and Deploying LoopBack Applications with Appsody",date:"5 months ago",author:"Dominique Emond",length:"20 mins"},excerpt:"Developing and Deploying LoopBack Applications with AppsodyAppsody helps developers build containerized applications for the cloud that are ready to be deployed to Kubernetes without the user needing to be an expert on the underlying container technology.The LoopBack team has…"},{fields:{slug:"/tutorials/ServerSideSwiftDevelopInXcode/"},frontmatter:{title:"Server-Side Swift: Develop in Xcode, continuously verify in Docker",date:"8 months ago",author:"Chris Bailey",length:"30 mins"},excerpt:"Server-Side Swift: Develop in Xcode, continuously verify in DockerDue to the availability of the Swift Language Server Protocol (LSP) library, there are now more IDEs that you can use to develop server-side Swift applications, including VSCode on Linux. Undoubtedly though, most…"},{fields:{slug:"/tutorials/MakeYourExpressNodeJSAppCloudNativeWithAppsody0319/"},frontmatter:{title:"Make your Express.js app Cloud-Native with Appsody",date:"9 months ago",author:"Chris Bailey",length:"30 mins"},excerpt:"Make your Express.js app Cloud-Native with AppsodyThis tutorial shows you how to take an existing Express.js application, and make it cloud-native, by enabling it to work with the nodejs-express Appsody Stack.PrerequisitesTo follow this tutorial, you need to install both the…"},{fields:{slug:"/tutorials/PackageAJaxRSAppWithAppsody/"},frontmatter:{title:"REST on a cloud: easily package a JAX-RS application to deploy to Kubernetes with Appsody",date:"9 months ago",author:"David Harris",length:"15 mins"},excerpt:"REST on a cloud: easily package a JAX-RS application to deploy to Kubernetes with AppsodyThis tutorial shows you how to use Appsody to take care of packaging applications for the cloud so that you can focus on writing code. The tutorial uses the application provided in the Open…"},{fields:{slug:"/tutorials/PackageYourNodeJSAppForCloudWithAppsody/"},frontmatter:{title:"Package your Node.js app for Cloud with Appsody",date:"9 months ago",author:"Chris Bailey",length:"20 mins"},excerpt:'Package your Node.js app for Cloud with AppsodyThe use of Appsody\'s tools and provided Stacks simplifies the steps and knowledge required to build "cloud packaged", "cloud native" and "cloud functions" based applications.Appsody\'s nodejs Stack makes it easy to take any existing…'},{fields:{slug:"/tutorials/BuildANewCloudNativeExpressAppWithAppsody/"},frontmatter:{title:"Build a new Cloud Native Express.js app with Appsody",date:"9 months ago",author:"Chris Bailey",length:"30 mins"},excerpt:"Build a new Cloud Native Express.js app with AppsodyThe use of Appsody’s tools and provided Stacks simplifies the steps and knowledge required to build “cloud packaged”, “cloud native” and “cloud functions” based applications.Appsody’s nodejs-express Stack makes it easy to go…"}]}}}},287:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjOWI5YjliIiBmb2N1c2FibGU9ImZhbHNlIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9IndpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Ij48cGF0aCBkPSJNMTYsMzBBMTQsMTQsMCwxLDEsMzAsMTYsMTQsMTQsMCwwLDEsMTYsMzBaTTE2LDRBMTIsMTIsMCwxLDAsMjgsMTYsMTIsMTIsMCwwLDAsMTYsNFoiPjwvcGF0aD48cGF0aCBkPSJNMjAuNTkgMjJMMTUgMTYuNDEgMTUgNyAxNyA3IDE3IDE1LjU4IDIyIDIwLjU5IDIwLjU5IDIyeiI+PC9wYXRoPjx0aXRsZT5UaW1lPC90aXRsZT48L3N2Zz4="}}]);
//# sourceMappingURL=component---src-pages-tutorials-js-34c9703955733628c1eb.js.map