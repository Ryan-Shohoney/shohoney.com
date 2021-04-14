import { RouteComponentProps, Router } from "@reach/router";
import { Typography } from "@rmwc/typography";
import { PageProps } from "gatsby";
import React from "react";
import { AdminLayout } from "../../components/admin/layout";
import RSVPPage from './rsvps';
import GuestsPage from './invitees';
import { getProfile, isAuthenticated, login } from "../../services/auth";


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
  if (!isAuthenticated()) {
    login();
    return <Typography use='headline3'>Redirecting to login...</Typography>
  }

  const user = getProfile();
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

export default AdminApp;
