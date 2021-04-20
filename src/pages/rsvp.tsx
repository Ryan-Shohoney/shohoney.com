import React, { useState } from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Grid, GridCell } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import { RSVPForm } from '../components/rsvp-form';

const RSVPPage: React.FC<PageProps> = () => {
  const [rsvpStarted, setRsvpStarted] = useState(false);
  return (
    <Layout>
      <SEO title='RSVP' />
      <Grid>
        <GridCell span={12}>
          <Typography use='headline4'>RSVP</Typography>
        </GridCell>
        {!rsvpStarted && <GridCell span={12}>
          <Typography use="body1">We're happy you're here.  We'll walk you through all of the information we need.  Just come with your RSVP code, and we should be able to provide the rest!</Typography>
        </GridCell>}
        <GridCell span={12}>
          <RSVPForm startRsvp={setRsvpStarted} />
        </GridCell>
      </Grid>
    </Layout>
  );
}

export default RSVPPage;