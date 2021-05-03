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
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        timeString={props.timeString}
      />
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
          maxWidth: `1280px`,
        }}
      >
        <main>{props.children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          <Typography use="body2">
            Questions? &nbsp;
            <a href="mailto:shohoneywedding@gmail.com" target="_blank">
              Email us.
            </a>
          </Typography>
          <br />
        </footer>
      </div>
      <DelayPrompt
        title={'Need to RSVP?'}
        text={'We recently updated the website to allow you to RSVP.  If you are here to do that, just follow the link below and we can get you started!'}
        duration={5000}
        cookieName='rsvpprompt'
        dismissals={3}
      />
    </>
  );
};

export default Layout;
