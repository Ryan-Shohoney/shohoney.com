/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import { RMWCProvider } from '@rmwc/provider';
import { Theme } from '@rmwc/theme';
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

import '@fontsource/josefin-sans';
import '@fontsource/italianno';
import '@fontsource/material-icons';
import 'normalize.css'
import '@rmwc/theme/styles';

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || '/', { replace: true });
};
export const wrapPageElement = ({ element, props }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENTID}
      redirectUri={process.env.GATSBY_AUTH0_CALLBACK}
      onRedirectCallback={onRedirectCallback}
    >
      <RMWCProvider {...props}>
        <Theme />
        {element}
      </RMWCProvider>
    </Auth0Provider>
  );
}
