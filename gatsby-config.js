module.exports = {
  siteMetadata: {
    title: `Ryan and Amanda Shohoney`,
    description: `Ryan and Amanda's Wedding website, welcome!`,
    author: `Ryan Shohoney`,
    siteUrl: 'https://shohoney.com'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-cosmicjs`,
      options: {
        bucketSlug: 'shohoneycom',
        objectTypes: ['landing-pages'],
        apiAccess: {
          read_key: '6v9fpSVeZnK8hEy21d5H2VtpOj0wxo5dOyBeJdp7IzIbsW9Wed'
        },
        localMedia: true,
      }
    },
  ],
}
