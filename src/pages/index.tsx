import React, { useEffect, useState } from "react";
import { Typography } from "@rmwc/typography";
import "@rmwc/typography/styles";
import { Grid, GridCell } from "@rmwc/grid";
import "@rmwc/grid/styles";
import { HeroSlider } from "../components/hero-slider";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { heroImageService } from "../services/hero-image-service";
import { EVENT_DATE } from "../util/constants";
import { timeUntil } from "../services/timer";
import { PageProps } from "gatsby";
import { ButtonLink } from "../components/button-link";

const PAGE_NAME = "home-page";
export const cheaterMargin = {
  margin: "0.25rem",
};
const IndexPage: React.FC<PageProps> = (props) => {
  const [timeString, setTimeString] = useState(timeUntil(EVENT_DATE));

  useEffect((): any => {
    const interval = setInterval((_) => {
      setTimeString(timeUntil(EVENT_DATE));
    }, 1000);
    return (_) => clearInterval(interval);
  }, [timeString]);
  const heroImages = heroImageService(PAGE_NAME)[0];

  return (
    <Layout timeString={timeString}>
      <SEO title="Home" />
      <HeroSlider srcs={heroImages.images} />
      <Grid>
        <GridCell span={12}>
          <Typography use="headline4">Thanks for stopping by!</Typography>
          <br />
          <Typography use="body1" tag="p">
            We are carefully planning a weekend of outdoor wedding celebrations
            in the Madison area. Mark your calendar, and we hope to celebrate
            with you in July!
          </Typography>
          <ButtonLink
            style={cheaterMargin}
            buttonHref="/faq"
            buttonText="Read Our FAQ"
            outline
            raised
            switchToSecondary
            switchToSecondaryBg
          />
          <ButtonLink
            style={cheaterMargin}
            buttonHref="/schedule-of-events"
            buttonText="Schedule of Events"
            outline
            raised
          />
        </GridCell>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
