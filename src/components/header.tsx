import React from "react"
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

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = (props) => (
  <Elevation z={4}>
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarTitle>
            {props.siteTitle || 'Title'}
          </TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <TopAppBarFixedAdjust/>
  </Elevation>
)

export default Header
