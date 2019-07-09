# Appsody.dev Development

The Appsody website is built with [Gatsby.js](https://www.gatsbyjs.org/). To develop and test the website you will need to download the Gatsby CLI with the following command:

```
npm install -g gatsby-cli
```

The Gatsby [quick start guide](https://www.gatsbyjs.org/docs/quick-start) highlights the key commands.

## Developing locally

1. Clone the respository
``` bash
git clone https://github.com/appsody/website.git
cd website
```

2. Install dependencies
``` bash
npm install
```

3. Start the development server:

``` bash
gatsby develop
```

This will compile your changes as you develop and host the website at http://localhost:8000. To explore GraphQL queries that Gatsby exposes, you can use http://localhost:8000/__graphql.

### Developing Remotely
**Note:** If you are developing remotely, use `http://<hostname>:PORT` instead of `http://localhost:PORT` as described in this doc.

## Contributing Documentation
Documentation for [Appsody](https://appsody.dev/docs) is found in `content/docs`. 

1. Clone the respository
``` bash
git clone https://github.com/appsody/website.git
cd website
```

2. Install dependencies
``` bash
npm install
```

3. Add documentation to the `content/docs` directory.
    
The documentation should follow the rough structure of the sidebar so that the docs are easy to find. The quick start guide, for example, is located in `content/docs/getting-started/quick-start`.

At the top of each documentation page you should include frontmatter so that the website can render the page correctly. Include the following:

```
---
title: This is what will be shown in the sidebar
path: This is the route to the page that all links will be created from.
section: This is the section that the doc will be created under in the sidebar.
---
```
For example:
```
---
title: "Installation"
path: /docs/getting-started/installation
section: Getting Started
---
```


4. Run the developement server
```
gatsby develop
```
5. View documentation at http://localhost:8000/docs

For more information on adding markdown pages with Gatsby, see https://www.gatsbyjs.org/docs/adding-markdown-pages/

## Testing website ready for release

Before submitting a pull request you must have tested the website can build and run in production.

1. Build the website
```
gatsby build
```
This build needs to successful before continuing to serve the website.

2. Serve the website
```
gatsby serve
```

3. Access the website on http://localhost:9000 and complete any visual checks.
   
   
