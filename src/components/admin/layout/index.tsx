import React, { useCallback, useState } from "react";
import { Drawer, DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle } from '@rmwc/drawer';
import '@rmwc/drawer/styles';
import { TopAppBar, TopAppBarFixedAdjust, TopAppBarNavigationIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@rmwc/top-app-bar';
import '@rmwc/top-app-bar/styles';
import { Elevation } from "@rmwc/elevation";
import '@rmwc/elevation/styles';
import { List, ListItem } from '@rmwc/list';
import '@rmwc/list/styles';
import { Link } from "gatsby";
import { logout, SessionCheck } from "../../../services/auth";
import { Icon } from "@rmwc/icon";
import './layout.css';
interface IOwnProps {
  user: any;
}

export const AdminLayout: React.FC<IOwnProps> = ({ user, children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <SessionCheck />
      <div>
        <Drawer modal open={drawerOpen} onClose={() => setDrawerOpen(false)} className='admin-drawer'>
          <DrawerHeader>
            <DrawerTitle>
              Admin
            </DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <ListItem>
                <Link to='/admin'>Admin Home</Link>
              </ListItem>
              <ListItem>
                <Link to='/admin/invitees'>Guests</Link>
              </ListItem>
              <ListItem>
                <Link to='/admin/rsvp'>RSVP's</Link>
              </ListItem>
              <ListItem onClick={logout}>
                <Link to='/'>
                  Logout
                  <Icon icon='logout' />
                </Link>
              </ListItem>
            </List>
            <div style={{ alignSelf: 'flex-end' }}>other things</div>
          </DrawerContent>
        </Drawer>
        <DrawerAppContent>
          <Elevation z={4}>
            <TopAppBar fixed>
              <TopAppBarRow>
                <TopAppBarSection>
                  <TopAppBarNavigationIcon icon='menu' onClick={() => setDrawerOpen(true)} />
                  <TopAppBarTitle>Admin</TopAppBarTitle>
                </TopAppBarSection>
                <TopAppBarSection style={{ justifyContent: 'flex-end', paddingRight: '1rem' }}>
                  <TopAppBarTitle>
                    Hello, {user.name}
                  </TopAppBarTitle>
                </TopAppBarSection>
              </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust />
          </Elevation>
          <div style={{ padding: '1rem' }}>
            {children}
          </div>
        </DrawerAppContent>
      </div>
    </>
  );
};
