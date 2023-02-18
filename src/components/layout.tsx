import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import "@rmwc/grid/styles";
import Header from "./header";
import "./layout.css";
import { Typography } from "@rmwc/typography";
import "@rmwc/typography/styles";
import DelayPrompt from './delay-prompt';
interface LayoutProps {
  timeString?: string;
}
const Layout: React.FC<LayoutProps> = (props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
          maxWidth: `1280px`,
        }}
      >
        <main>{props.children}</main>
      </div>

    </>
  );
};

export default Layout;
