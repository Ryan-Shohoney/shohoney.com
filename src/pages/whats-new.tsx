import React from 'react';
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { toContentPageData } from '../services/content-page-service';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Grid, GridCell } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import { Card, CardMedia } from '@rmwc/card';
import { ButtonLink } from '../components/button-link';
import '@rmwc/card/styles';

const WhatsNewPage: React.FC<PageProps> = () => {
  const data = useStaticQuery(graphql`
    query WhatsNewQuery {
        cosmicjsContentPages(slug: {eq: "whats-new"}) {
          slug
          metadata {
            page_title
            page_content
          }
          metafields {
            title
            object_type
            objects {
              metadata {
                card_title
                card_body
                card_image {
                  imgix_url
                  local {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `);
  const pageData = toContentPageData(data);
  const canvas = {
    width: '100%',
    height: '100%',
  }
  return (
    <Layout >
      <SEO title="What's New" />
      <Grid>
        <GridCell span={12}>
          <Typography use="headline4">
            {pageData.metaData.pageTitle}
          </Typography>
          <br />
          <Typography use="body1">
            {pageData.metaData.pageContent}
          </Typography>
        </GridCell>
        {pageData.metaFields.map(c => (
          <GridCell span={4} key={c.cardTitle}>
            <Card style={canvas}>
              <CardMedia
                sixteenByNine
                style={{
                  backgroundImage: `url(${c.cardImage.imgixUrl})`
                }}
              />
              <div style={{ padding: '1rem' }}>
                <Typography use="headline5">
                  {c.cardTitle}
                </Typography>
                <Typography use="body1" tag="p">
                  {c.cardBody}
                </Typography>
              </div>
            </Card>
          </GridCell>
        ))}
        <GridCell>
          <ButtonLink
            buttonHref='/'
            buttonText='Go Back'
            switchToSecondaryBg
            switchToSecondary
            raised
            outline
          />
        </GridCell>
      </Grid>
    </Layout>
  );
}

export default WhatsNewPage