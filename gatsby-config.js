module.exports = {
  siteMetadata: {
    title: `Appsody`
  },
  pathPrefix: "/website",
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-pages`,
        path: `${__dirname}/src/docs`,
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-layout`
  ]
}
