/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import 'fontsource-josefin-sans';
import 'fontsource-italianno';
import 'fontsource-material-icons';
import 'normalize.css'
import { RMWCProvider } from '@rmwc/provider';
import { Theme } from '@rmwc/theme';
import '@rmwc/theme/styles';

export const wrapPageElement = ({ element, props }) => {
    return <RMWCProvider {...props}>
        <Theme></Theme>
        {element}
    </RMWCProvider>
}
