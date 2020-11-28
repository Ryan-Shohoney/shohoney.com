import React from 'react';
import { 
  TopAppBar, 
  TopAppBarRow, 
  TopAppBarSection, 
  TopAppBarTitle, 
  TopAppBarFixedAdjust,
} from '@rmwc/top-app-bar';
import { Elevation } from '@rmwc/elevation';
import '@rmwc/elevation/styles';
import '@rmwc/top-app-bar/styles';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';

interface HeaderProps {
  siteTitle: string;
  timeString: string;
}

const paddingRight1Rem = {
  paddingRight: '1rem'
}

const Header: React.FC<HeaderProps> = (props) => {
  return (  
    <Elevation z={4}>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarTitle >
              <Typography use="headline4" tag="h1" className="caligraphy">
                {props.siteTitle || 'Title'}
              </Typography>
            </TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <Typography use="headline5" className="caligraphy" style={paddingRight1Rem}>
              7/17/2021
            </Typography>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust/>
    </Elevation>
  );
}

export default Header
