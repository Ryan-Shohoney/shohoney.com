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
        {!rsvpStarted && <GridCell span={12} style={{ textAlign: 'center' }}>
          <Typography use="headline6" style={{ maxWidth: '45rem', textAlign: 'center', display: 'inline-block' }}>
            We're happy you're here.  We'll walk you through all of the information we need.
            Before you start, you'll want to have your RSVP code, your lodging information,
            and the meal selections for everyone in your party
          </Typography>
        </GridCell>}
        <GridCell span={12}>
          <RSVPForm startRsvp={setRsvpStarted} />
        </GridCell>
      </Grid>
    </Layout>
  );
}

export default RSVPPage;