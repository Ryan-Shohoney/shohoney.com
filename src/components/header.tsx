import React, { useLayoutEffect, useState } from "react";
import { Link } from "gatsby";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
} from "@rmwc/top-app-bar";
import { Elevation } from "@rmwc/elevation";
import "@rmwc/elevation/styles";
import "@rmwc/top-app-bar/styles";
import { Typography } from "@rmwc/typography";
import "@rmwc/typography/styles";
import { ButtonLink } from "./button-link";

interface HeaderProps {
  siteTitle: string;
  timeString: string;
}

const paddingRight1Rem = {
  paddingRight: "1rem",
};

const Header: React.FC<HeaderProps> = (props) => {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, [])

  return (
    <Elevation z={4}>
      <TopAppBar theme={['onSecondary', 'secondaryBg']}>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarTitle>
              <Link
                to="/"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Typography use="headline4" tag="h1" className="caligraphy">
                  {props.siteTitle || "Title"}
                </Typography>
              </Link>
            </TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd style={paddingRight1Rem}>
            <ButtonLink buttonText={width <= 768 ? 'RSVP' : 'RSVP for 7/17/2021'} buttonHref='/rsvp' raised outline={true} switchToSecondary switchToSecondaryBg />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </Elevation>
  );
};

export default Header;
