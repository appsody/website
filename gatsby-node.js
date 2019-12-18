const path = require(`path`);
const fetch = require("node-fetch");
const fs = require("file-system");

// Add URLs to v2 indexes to this array for them to be rendered on the website
// If the index does not need to be downloaded, place the index.yaml in src/data/indexes
// Note: this is only for developement add URLs to /ci/get-indexes.sh to affect production
const indexURLs = [
  "https://github.com/appsody/stacks/releases/latest/download/stable-index.yaml",
  "https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml",
  "https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml"
];

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  // Redirects section

  // The modify doc was merged with the create doc to form a develop doc
  createRedirect({
    fromPath: `/docs/stacks/modify`,
    toPath: `/docs/stacks/develop`,
    isPermanent: true
  });

  // The create doc was merged with the modify doc to form a develop doc
  createRedirect({
    fromPath: `/docs/stacks/create`,
    toPath: `/docs/stacks/develop`,
    isPermanent: true
  });

  // The stack structure doc was merged into the stack overview doc
  createRedirect({
    fromPath: `/docs/stacks/stack-structure`,
    toPath: `/docs/stacks/stacks-overview`,
    isPermanent: true
  });

  const docTemplate = path.resolve(`src/templates/docTemplate.js`);

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.fields.slug == "/docs/overview/") {
        node.fields.slug = "/docs";
      }
      createPage({
        path: node.fields.slug,
        component: docTemplate,
        context: {
          pagePath: node.fields.slug
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    if (slug == "/overview/") {
      createNodeField({
        node,
        name: `slug`,
        value: `/docs`
      });
    } else {
      createNodeField({
        node,
        name: `slug`,
        value: `/docs${slug}`
      });
    }
  }
};

exports.onPreInit = () => {
  indexURLs.forEach(url => {
    fetch(url)
      .then(res => res.text())
      .then(body => {
        const fileName = url.split("/").reverse()[0];
        fs.writeFile(`src/data/indexes/${fileName}`, body);
      });
  });
};
