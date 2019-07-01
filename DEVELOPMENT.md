# Appsody.dev Development

The Appsdy website is built with [Gatsby.Js](https://www.gatsbyjs.org/). To develop and test the website you will need to download the Gatsby cli with the following command:

```
npm install -g gatsby-cli
```

The Gatsby [quick start guide](https://www.gatsbyjs.org/docs/quick-start) highlights the key commands.

## Developing locally

To run the website developement server run the following within the website directory:

```
gatsby develop
```

This will compile your changes as you develop and host the website at http://localhost:8000. To explore GraphQL queries that Gatsby exposes, you can use http://localhost:8000/__graphql.

### Viewing documentation
Documentation will ultimately be retrieved from the [docs repository](https://github.com/appsody/docs). You can add local documentation to the docs page by doing the following:

1. Make sure the `gatsby-source-filesystem` plugin is installed.
```
npm install gatsby-source-filesystem
```
2. Add directory of local documentation within `gatsby-config.js`
```
...

{
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `docs-pages`,
        path: `${__dirname}/src/docs`,
    }
},

...
```
3. Add local documentation to the `src/docs` directory. There are 2 sample documents currently present there.

4. Run the developement server
```
gatsby develop
```
5. View documentation at http://localhost:8000/docs

Also see https://www.gatsbyjs.org/docs/adding-markdown-pages/

## Testing website ready for release

Before submitting a pull request you must have tested the website can build and run in production.

1. Build the website
```
gatsby build
```
The build needs to successful.

2. Serve the website
```
gastby serve
```

3. Access the website on http://localhost:9000 and complete any visual checks.
   
   
