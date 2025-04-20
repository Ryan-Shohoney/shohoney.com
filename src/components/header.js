import * as React from "react"
import { Link } from "gatsby"
import favicon from '../images/favicon.ico';
const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
    }}
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
        display: `flex`,
      }}
    >
      <img src={favicon} style={{
        height: `var(--space-5)`,
        width: `var(--space-5)`,
        margin: 0,
        marginRight: 'var(--space-2)',
      }}/>
      <h1 style={{ margin: '0', color: 'var(--color-text)'}}>Shohoney</h1>
    </Link>

  </header>
)

export default Header
