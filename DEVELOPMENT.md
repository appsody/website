# Appsody.dev Development

The Appsody website is built with [Gatsby.js](https://www.gatsbyjs.org/). See the Gatsby [quick start guide](https://www.gatsbyjs.org/docs/quick-start) for the basics.

## Prerequisites

- **Node 10+**
  You can download Node.js from https://nodejs.org/en/
  
- [**Gatsby.js**](https://www.gatsbyjs.org)
  Once you have Node installed run the following to install Gatsby.js:
  ``` bash
    npm install -g gatsby-cli
  ```
- **Clone website** and **install Node dependencies**
  ``` bash
    git clone https://github.com/appsody/website.git
    cd website

    npm install
  ```

## Developing locally

1. Run the development server:

``` bash
gatsby develop
```

This will compile your changes as you develop and host the website at http://localhost:8000. To explore GraphQL queries that Gatsby exposes, you can use http://localhost:8000/__graphql.

### Clear Caching
Sometimes when developing locally, the website shows cached content from previous versions of the website. You can clear the cache before developing by running:

``` bash
gatsby clean
```

### Developing Remotely
**Note:** If you are developing remotely, use `http://<hostname>:PORT` instead of `http://localhost:PORT` as described in this doc.

## Contributing Documentation

Any documentation needs to be added to the `content/docs` directory. This is where the documentation for [Appsody](https://appsody.dev/docs) is stored. Put any associated images in the `content/docs/images` directory.

The documentation should follow the rough structure of the sidebar so that the docs are easy to find. The quick start guide, for example, is located in `content/docs/getting-started/quick-start`.

At the top of each documentation page you should include frontmatter so that the website can render the page correctly. Include the following:

```
---
path: This is the route to the page that all links will be created from.
---
```
For example:
```
---
path: /docs/getting-started/quick-start
---
```

To add the doc to the side menu you must add it to the `sidebar.yaml` in `content/docs`. A section is defined as followed:
```
- title (optional): Getting Started
  items:
    - title: Installation
      path: /docs/getting-started/installation
    - title: Quick Start
      path: /docs/getting-started/quick-start
```
**Note:** `title` for the section is optional but the `title` for each menu item is required.

Images can help explain concepts better than words, and make for more exciting and digestible content. To add an inline image to a doc, first place the image inside `content/docs/images` and use the following syntax:

```
![Alt Text](../images/my-awesome-image.png)
```

A helpful image could show a window that a user is expected to see. Make sure to replace `[Alt Text]` with some text describing what the image shows, as this text is used for screen readers, or for when the image does not load.

**Note:** relative paths must be used to reference image locations. If an image does not render properly, you might be pointing to the wrong directory. Only use images of type `.png` or `.jpg`.

2. Run the development server
```
gatsby develop
```
3. View documentation at http://localhost:8000/docs

For more information on adding Markdown pages with Gatsby, see https://www.gatsbyjs.org/docs/adding-markdown-pages/

## Testing website ready for release

Before submitting a pull request you must have tested the website can build and run in production.

1. Build the website
```
gatsby build
```
This build needs to be successful before continuing to serve the website.

2. Serve the website
```
gatsby serve
```

3. Access the website on http://localhost:9000 and complete any visual checks.
   
## Need help?
If you have a question that you can't find an answer to, we would also like to hear about that too. You can reach out to the community for assistance on [Slack](https://appsody-slack.eu-gb.mybluemix.net/).
