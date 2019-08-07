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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: false,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    `gatsby-plugin-layout`
  ]
}
