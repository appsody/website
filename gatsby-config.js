module.exports = {
  siteMetadata: {
    title: `Appsody - Compose a Cloud Native Masterpiece`,
    description: `Infused with cloud native capabilities from the moment you start, Appsody provides everything you need to iteratively develop applications, ready for deployment to Kubernetes environments. Teams are empowered with sharable technology stacks, configurable and controllable through a central hub.`,
    twitterUsername: '@appsodydev',
    image: `https://i.ytimg.com/vi/CPw06Ag-Wfs/maxresdefault.jpg`,
    url: `https://appsody.dev`,
    siteUrl: `https://appsody.dev`,
    keywords: `appsody, development, microservice, kubernetes, cloud-native, cloud, java, nodejs, swift, spring, microprofile`,
    pathPrefix: `/appsody-website`,
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
        icon: `src/images/favicon.png`
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: false,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: true,
              maxWidth: 1000,
              wrapperStyle: result => `width: 100%;margin-left: 0;`,

            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `header-link-icon`
            }
          }
        ],
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: true,
              maxWidth: 1000,
              wrapperStyle: result => `width: 100%;margin-left: 0;`,

            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `header-link-icon`
            }
          }
        ]
      }
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://appsody.dev/`,
        policy: [{ userAgent: 'Twitterbot', allow: '/' }],
      }
    }
  ]
}
