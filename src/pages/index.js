import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo";
import favicon from '../images/favicon.ico'

const IndexPage = () => (    <Layout >
  <div style={{
    position: 'relative',
    width: '100%',
    height: `calc(100vh - var(--size-gutter) - (var(--space-5) * 3) - 5px)`,
    overflow: 'hidden'
  }}>
    <iframe 
      src="https://docs.google.com/forms/d/e/1FAIpQLSdm-kSljS4rTVErC8-Hwcep0uvAe32Gq9rHbQnhWUzwhLLVoA/viewform?embedded=true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none'
      }}
      title="Google Form"
    >
      Loading…
    </iframe>
  </div>
</Layout>)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => (<>
  <link rel='icon' href={favicon} type='image/x-icon'/>
  <Seo title="Home" description="Home page of the site" />
</>)

export default IndexPage
