import { Grid, GridCell } from "@rmwc/grid";
import { graphql, Link, PageProps, useStaticQuery } from "gatsby";
import React from "react";
import FAQCard from "../components/faq-card";
import Layout from "../components/layout";
import SEO from "../components/seo";
import './faq.css';
import { mapToFAQs } from "../cosmic-data/faq";
import { Typography } from "@rmwc/typography";

const FAQPage: React.FC<PageProps> = () => {
    const data = useStaticQuery(graphql`
      query FAQs {
        allCosmicjsFaqs {
          edges {
            node {
              id
              metadata {
                answer
                question
              }
            }
          }
        }
      }
    `);
  console.warn(data);
  return (
    <Layout>
      <SEO title="FAQs" />
      <Grid>
        <GridCell span={12}>
          <Typography use="headline3">
            Frequently Asked Questions
          </Typography>
          <br/>
          <Typography use="body1" style={{paddingLeft: '1rem'}}>
            If you're looking for a schedule of events, it can be found <Link to={'/schedule-of-events'}>here</Link>
          </Typography>
        </GridCell>
        <GridCell span={12}>
        {mapToFAQs(data).map(faq => (
          <FAQCard key={faq.question} className={'faq-card'} {...faq} />
        ))}
        </GridCell>
      </Grid>
    </Layout>
  )
};

export default FAQPage;
export { FAQPage };