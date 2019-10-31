module.exports = {
  siteMetadata: {
    title: `Appsody - Compose a Cloud Native Masterpiece`,
    description: `Infused with cloud native capabilities from the moment you start, Appsody provides everything you need to iteratively develop applications, ready for deployment to Kubernetes environments. Teams are empowered with sharable technology stacks, configurable and controllable through a central hub.`,
    twitterUsername: '@appsodydev',
    image: `https://pbs.twimg.com/profile_images/1143103337610534913/Wg5u3Vme_400x400.jpg`,
    url: `https://appsody.dev`,
    keywords: `appsody, development, microservice, kubernetes, cloud-native, cloud, java, nodejs, swift, spring, microprofile`,
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
    `gatsby-plugin-sharp`,
  ]
}
