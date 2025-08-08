import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FluentProvider } from '@fluentui/react-components';
import theme from '../src/styles/theme';

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../src/authConfig";
import { PageLayout } from "../src/ui-components/PageLayout";
import { CustomNavigationClient } from "../src/utils/NavigationClient";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
});

export default function MyApp({ Component, pageProps }) {
  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const router = useRouter();
  const navigationClient = new CustomNavigationClient(router);
  msalInstance.setNavigationClient(navigationClient);

  return (
    <>
      <Head>
        <title>StruggleBus MVP</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <FluentProvider theme={theme}>
        <MsalProvider instance={msalInstance}>
          <PageLayout>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <Component {...pageProps} />
            </div>
          </PageLayout>
        </MsalProvider>
      </FluentProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
