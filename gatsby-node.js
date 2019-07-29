const path = require(`path`)

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