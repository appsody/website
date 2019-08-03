module.exports = {
  siteMetadata: {
    title: `Appsody`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-pages`,
        path: `${__dirname}/content/docs`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sidebaryaml`,
        path: `${__dirname}/content/docs`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon.svg`
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-layout`
  ]
}
