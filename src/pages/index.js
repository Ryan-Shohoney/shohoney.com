import React from "react"
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { Grid, GridRow, GridCell } from '@rmwc/grid';
import '@rmwc/grid/styles';
import { HeroSlider } from '../components/hero-slider';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { heroImageService } from '../services/hero-image-service';

const PAGE_NAME = 'home-page';

const IndexPage = () => {
  const heroImages = heroImageService(PAGE_NAME)[0];
  
  return <Layout>
    <SEO title="Home" />
    <HeroSlider srcs={heroImages.images} />
    <Grid>
      <GridRow>
        <GridCell span={12}>
          <Typography use="headline1">Hi people</Typography>
        </GridCell>
        <GridCell span={12}>
          <Typography use="body1">
            Welcome to our website. More to come soon, but while you're here check out some cool stuff!
          </Typography>
        </GridCell>
      </GridRow>
    </Grid>
  </Layout>
}

export default IndexPage
