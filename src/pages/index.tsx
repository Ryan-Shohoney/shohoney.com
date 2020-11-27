import React, { useEffect, useState } from "react"
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { Grid, GridRow, GridCell } from '@rmwc/grid';
import '@rmwc/grid/styles';
import { HeroSlider } from '../components/hero-slider';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { heroImageService } from '../services/hero-image-service';
import { EVENT_DATE } from "../util/constants";
import { timeUntil } from '../services/timer';
import { PageProps } from "gatsby";
import { timer } from "../effects/interval-effect";

const PAGE_NAME = 'home-page';

const IndexPage: React.FC<PageProps> = (props) => {
  const [timeString, setTimeString] = useState(timeUntil(EVENT_DATE)); 
  
  useEffect((): any => {
    const interval = setInterval(_ => {
      setTimeString(timeUntil(EVENT_DATE));
    }, 1000);
    return _ => clearInterval(interval);
  }, [timeString]);
  const heroImages = heroImageService(PAGE_NAME)[0];
  const textCenter = {
    textAlign: 'center' as const
  }
  
  return <Layout timeString={timeString}>
    <SEO title="Home" />
    <HeroSlider srcs={heroImages.images} />
    <Grid>
      <GridCell span={12} >
        <GridRow >
          <GridCell align="middle" span={12} style={textCenter}>
            <Typography use="headline1">The Countdown has Begun!</Typography>
            <br/>
            <Typography use="headline2">
              {timeString}
            </Typography>
          </GridCell>
        </GridRow>
      </GridCell>
      <GridCell span={12} tablet={8} >
        <Typography use="headline3" >
          Thanks for stopping by!
        </Typography>
        <br/>
        <Typography use="body1" >
          We are carefully planning a weekend of outdoor wedding celebrations in the Madison area.  Mark your calendar, and we hope to celebrate with you in July!
        </Typography>
      </GridCell>
    </Grid>
  </Layout>
}

export default IndexPage
