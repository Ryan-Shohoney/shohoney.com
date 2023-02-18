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
const IndexPage: React.FC<PageProps> = (props) => (
  <Layout>
    <SEO title="Home" />
    <Grid>
      <GridCell span={12} >
        <h1 >¯\_(ツ)_/¯</h1>
        <h3>More to come.... at some point in time.</h3>
      </GridCell>
    </Grid>
  </Layout>
);

export default IndexPage;
