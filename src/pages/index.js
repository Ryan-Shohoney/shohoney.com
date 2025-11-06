import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo";
import favicon from '../images/favicon.ico'

const IndexPage = () => (<Layout />)

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
