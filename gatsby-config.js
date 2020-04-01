module.exports = {
  siteMetadata: {
    title: `Appsody - Compose a Cloud Native Masterpiece`,
    description: `Infused with cloud native capabilities from the moment you start, Appsody provides everything you need to iteratively develop applications, ready for deployment to Kubernetes environments. Teams are empowered with sharable technology stacks, configurable and controllable through a central hub.`,
    twitterUsername: "@appsodydev",
    image: `https://i.ytimg.com/vi/CPw06Ag-Wfs/maxresdefault.jpg`,
    url: `https://appsody.dev`,
    siteUrl: `https://appsody.dev`,
    keywords: `appsody, development, microservice, kubernetes, cloud-native, cloud, java, nodejs, swift, spring, microprofile`,
    pathPrefix: `/appsody-website`
  },
  plugins: [
    `gatsby-plugin-sharp`,
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
              maxWidth: 3000,
              wrapperStyle: result => `width: 100%;margin-left: 0;`
            }
          },
          {
            resolve: `gatsby-remark-embed-youtube`,
            options: {
              width: 560,
              height: 315
            }
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-pages`,
        path: `${__dirname}/content/docs`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `indexes`,
        path: `${__dirname}/src/data/indexes`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-142751517-1",
        head: true,
        anonymize: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon.png`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `${__dirname}/content/blogs`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `${__dirname}/content/tutorials`
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://appsody.dev/`,
        policy: [{ userAgent: "Twitterbot", allow: "/" }]
      }
    },
    `gatsby-plugin-client-side-redirect`
  ]
};
