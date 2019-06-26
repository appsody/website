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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-142751517-1",
        head: true,
        anonymize: true,
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-layout`
  ]
}
