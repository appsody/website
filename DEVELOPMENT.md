# Appsody.dev Development

The Appsody website is built with [Gatsby.js](https://www.gatsbyjs.org/). To develop and test the website you will need to download the Gatsby CLI with the following command:

```
npm install -g gatsby-cli
```

The Gatsby [quick start guide](https://www.gatsbyjs.org/docs/quick-start) highlights the key commands.

## Developing locally

Make sure to run the following steps in the website directory.

1. Install dependencies
```
npm install
```

2. Start the development server:

```
gatsby develop
```

This will compile your changes as you develop and host the website at http://localhost:8000. To explore GraphQL queries that Gatsby exposes, you can use http://localhost:8000/__graphql.

### Viewing documentation
Documentation will ultimately be retrieved from the [docs repository](https://github.com/appsody/docs). You can add local documentation to the docs page by doing the following:

1. Add documentation to the `src/docs` directory. There are 2 sample documents currently present there.

2. Install dependencies
```
npm install 
```

3. Run the developement server
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
   
   
