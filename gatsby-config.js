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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `indexes`,
        path: `${__dirname}/src/data/indexes`,
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
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `header-link-icon`
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: true,
              maxWidth: 1000,
              wrapperStyle: result => `width: 100%;margin-left: 0;`,

            }
          }
        ],
      }
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-sharp`,
  ]
}