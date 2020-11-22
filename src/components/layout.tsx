import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import '@rmwc/grid/styles';
import Header from "./header"
import "./layout.css"

const Layout : React.FC = ({ children })  => {
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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>
          {children}
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
