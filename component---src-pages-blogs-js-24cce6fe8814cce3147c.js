(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{175:function(e,t,a){"use strict";a.r(t);a(65);var r=a(0),o=a.n(r),n=a(183),l=a(98),s=function(e){var t=e.title,a=e.subtext,r=e.author,n=e.date,s=e.slug;return o.a.createElement(l.Link,{className:"blog-link",to:s},o.a.createElement("div",{className:"wide-blog-container"},o.a.createElement("div",{className:"wide-blog-image-container"},o.a.createElement("img",{className:"wide-blog-image",src:"https://miro.medium.com/max/2800/1*AmrAV709WQFlXgs4R4zZEw.jpeg",alt:"Blog post pic"})),o.a.createElement("h2",{className:"wide-blog-title"},t),o.a.createElement("p",{className:"wide-blog-subtext"},a),o.a.createElement("p",{className:"wide-blog-author"},"by ",r),o.a.createElement("p",{className:"wide-blog-date"},"Posted ",n)))},i=a(9),c=a.n(i),m=a(271),u=function(e){var t=e.title,a=e.subtext,r=e.author,n=e.date,s=e.slug;return o.a.createElement(l.Link,{className:"blog-link",to:s},o.a.createElement("div",{className:"blog-container"},o.a.createElement("h2",{className:"blog-title"},t),o.a.createElement("p",{className:"blog-subtext"},a),o.a.createElement("p",{className:"blog-author"},"by ",r),o.a.createElement("p",{className:"blog-date"},"Posted ",n)))},d=function(e){function t(){return e.apply(this,arguments)||this}c()(t,e);var a=t.prototype;return a.generateBlogs=function(){return this.props.blogs.map(function(e){return o.a.createElement(u,{title:e.frontmatter.title,subtext:e.excerpt.replace(e.frontmatter.title,"").replace("By "+e.frontmatter.author,"").replace("Posted",""),author:e.frontmatter.author,date:e.frontmatter.date,slug:e.fields.slug})})},a.render=function(){return o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"blog-grid"},this.generateBlogs()))},t}(r.Component),p=function(){return o.a.createElement(l.StaticQuery,{query:"3520700645",render:function(e){var t=[];return e.allMarkdownRemark.nodes.forEach(function(e){t=t.concat(e)}),o.a.createElement(d,{blogs:t})},data:m})};a.d(t,"query",function(){return g});var g="1515353985";t.default=function(e){var t=e.data;return o.a.createElement(n.a,{title:"Appsody - Blogs"},o.a.createElement("div",{className:"container"},o.a.createElement("section",{className:"blog-card-section"},o.a.createElement("h2",null,"Latest Blog"),o.a.createElement(s,{image:t.allMarkdownRemark.nodes[0].frontmatter.imagePath,title:t.allMarkdownRemark.nodes[0].frontmatter.title,subtext:t.allMarkdownRemark.nodes[0].excerpt.replace(t.allMarkdownRemark.nodes[0].frontmatter.title,""),author:t.allMarkdownRemark.nodes[0].frontmatter.author,date:t.allMarkdownRemark.nodes[0].frontmatter.date,slug:t.allMarkdownRemark.nodes[0].fields.slug}))),o.a.createElement("div",{className:"container"},o.a.createElement("section",{className:"all-blogs-section"},o.a.createElement("h2",null,"All Blogs"),o.a.createElement(p,null))))}},271:function(e){e.exports={data:{allMarkdownRemark:{nodes:[{fields:{slug:"/blogs/AutumnUpdate/"},frontmatter:{title:"Appsody in Autumn: project update",date:"5 months ago",author:"David Harris"},excerpt:"Appsody in Autumn: project updateIt’s been a busy couple of months since we publicly launched as an open source project, full of…"},{fields:{slug:"/blogs/BohemianAppsody/"},frontmatter:{title:"Bohemian Appsody — a song for Kubernetes",date:"8 months ago",author:"David Harris"},excerpt:"Bohemian Appsody — a song for KubernetesHow can you have an open source project without a theme tune? An anthem for collaborators…"},{fields:{slug:"/blogs/BuildingCloudNativeAppsWithAppsody/"},frontmatter:{title:"Building Cloud-Native Apps with Appsody",date:"8 months ago",author:"Chris Bailey"},excerpt:"Building Cloud-Native Apps with AppsodyAppsody provides a set of open source tools and capabilities that simplifies the process of…"}]}}}}}]);
//# sourceMappingURL=component---src-pages-blogs-js-24cce6fe8814cce3147c.js.map