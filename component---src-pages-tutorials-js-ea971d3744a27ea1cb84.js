(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{175:function(e,t,a){"use strict";a.r(t);var s=a(0),i=a.n(s),l=a(184),n=(a(194),a(65),a(9)),r=a.n(n),o=a(286),c=a(98),u=a(287),d=a.n(u),m=function(e){var t=e.title,a=e.subtext,s=e.length,l=e.slug;return i.a.createElement(c.Link,{className:"blog-link",to:l},i.a.createElement("div",{className:"tutorial-container"},i.a.createElement("h2",{className:"blog-title"},t),i.a.createElement("p",{className:"tutorial-subtext"},a),i.a.createElement("p",{className:"tutorial-length"},i.a.createElement("img",{className:"tutorial-length-icon",src:d.a})," ~ ",s)))},p=function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var a=t.prototype;return a.generateBlogs=function(){return this.props.tutorials.map(function(e){return i.a.createElement(m,{title:e.frontmatter.title,subtext:e.excerpt.replace(e.frontmatter.title,""),length:e.frontmatter.length,slug:e.fields.slug})})},a.render=function(){return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"blog-grid"},this.generateBlogs()))},t}(s.Component),g=function(){return i.a.createElement(c.StaticQuery,{query:"3041950770",render:function(e){var t=[];return e.allMarkdownRemark.nodes.forEach(function(e){t=t.concat(e)}),i.a.createElement(p,{tutorials:t})},data:o})};a.d(t,"query",function(){return h});var h="3134450968";t.default=function(e){e.data;return i.a.createElement(l.a,{title:"Appsody - Tutorials",className:"tutorials-page"},i.a.createElement("div",{className:"container tutorials-section tutorials-page"},i.a.createElement("section",{className:"all-tutorials-section"},i.a.createElement("h2",{className:"tutorials-header"},"Tutorials"),i.a.createElement(g,null))))}},194:function(e,t,a){"use strict";var s=a(0),i=a.n(s),l=a(98);t.a=function(e){var t=e.title,a=e.subtext,s=e.author,n=e.date,r=e.slug;return i.a.createElement(l.Link,{className:"blog-link",to:r},i.a.createElement("div",{className:"wide-blog-container"},i.a.createElement("div",{className:"wide-blog-image-container"},i.a.createElement("img",{className:"wide-blog-image",src:"https://miro.medium.com/max/2800/1*AmrAV709WQFlXgs4R4zZEw.jpeg",alt:"Blog post pic"})),i.a.createElement("h2",{className:"wide-blog-title"},t),i.a.createElement("p",{className:"wide-blog-subtext"},a),i.a.createElement("p",{className:"wide-blog-author"},"by ",s),i.a.createElement("p",{className:"wide-blog-date"},"Posted ",n)))}},286:function(e){e.exports={data:{allMarkdownRemark:{nodes:[{fields:{slug:"/tutorials/ServerSideSwiftDevelopInXcode/"},frontmatter:{title:"Server-Side Swift: Develop in Xcode, continuously verify in Docker",date:"7 months ago",author:"Chris Bailey",length:"30 mins"},excerpt:"Server-Side Swift: Develop in Xcode, continuously verify in DockerDue to the availability of the Swift Language Server Protocol (LSP) library, there are now more IDEs that you can use to develop server-side Swift applications, including VSCode on Linux. Undoubtedly though, most…"},{fields:{slug:"/tutorials/BuildANewCloudNativeExpressAppWithAppsody/"},frontmatter:{title:"Build a new Cloud Native Express.js app with Appsody",date:"9 months ago",author:"Chris Bailey",length:"30 mins"},excerpt:"Build a new Cloud Native Express.js app with Appsody'The use of Appsody’s tools and provided Stacks simplifies the steps and knowledge required to build “cloud packaged”, “cloud native” and “cloud functions” based applications.Appsody’s nodejs-express Stack makes it easy to go…"}]}}}},287:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjOWI5YjliIiBmb2N1c2FibGU9ImZhbHNlIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9IndpbGwtY2hhbmdlOiB0cmFuc2Zvcm07Ij48cGF0aCBkPSJNMTYsMzBBMTQsMTQsMCwxLDEsMzAsMTYsMTQsMTQsMCwwLDEsMTYsMzBaTTE2LDRBMTIsMTIsMCwxLDAsMjgsMTYsMTIsMTIsMCwwLDAsMTYsNFoiPjwvcGF0aD48cGF0aCBkPSJNMjAuNTkgMjJMMTUgMTYuNDEgMTUgNyAxNyA3IDE3IDE1LjU4IDIyIDIwLjU5IDIwLjU5IDIyeiI+PC9wYXRoPjx0aXRsZT5UaW1lPC90aXRsZT48L3N2Zz4="}}]);
//# sourceMappingURL=component---src-pages-tutorials-js-ea971d3744a27ea1cb84.js.map