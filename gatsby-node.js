const path = require(`path`)
const fetch = require('node-fetch');
const fs = require('file-system');

// Add URLs to v2 indexes to this array for them to be rendered on the website
// If the index does not need to be downloaded, place the index.yaml in src/data/indexes
const indexURLs = [
  'https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml'
]

exports.onPreInit = () => {
  indexURLs.forEach(url => {
    fetch(url)
    .then(res => res.text())
    .then(body => {
        const fileName = url.split('/').reverse()[0];
        fs.writeFile(`src/data/indexes/${fileName}`, body);
      })
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  const docTemplate = path.resolve(`src/templates/docTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: docTemplate,
        context: {
            layout: "docs"
        }, // additional data can be passed via context
      })
    })
  })
}
