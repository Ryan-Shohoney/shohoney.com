import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import '@rmwc/grid/styles';
import Header from "./header"
import "./layout.css"
interface LayoutProps {
  timeString?: string;
}
const Layout : React.FC<LayoutProps> = (props)  => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header 
        siteTitle={data.site.siteMetadata?.title || `Title`} 
        timeString={props.timeString}/>
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>
          {props.children}
        </main>
        <footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}

export default Layout
