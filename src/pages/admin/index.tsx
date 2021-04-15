import { RouteComponentProps, Router } from "@reach/router";
import { Typography } from "@rmwc/typography";
import { PageProps } from "gatsby";
import React from "react";
import { AdminLayout } from "../../components/admin/layout";
import RSVPPage from './rsvps';
import GuestsPage from './invitees';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


const AdminPage: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <Typography use="headline1">
        Admin
      </Typography>
    </div>
  );
};

const AdminApp: React.FC<PageProps> = () => {
  const { user } = useAuth0();
  return (
    <AdminLayout user={user}>
      <Router>
        <AdminPage path='/admin' />
        <RSVPPage path='/admin/rsvp' />
        <GuestsPage path='/admin/invitees' />
      </Router>
    </AdminLayout>
  )
}

export default withAuthenticationRequired(AdminApp);
