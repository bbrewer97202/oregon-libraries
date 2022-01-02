import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Navigation from './Navigation/Navigation';

type Props = {
  title?: string;
};

const Layout: FunctionComponent<Props> = ({ children, title = 'Oregon Libraries' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* TODO: bundle leaflet css */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <header>
        <h1>Oregon Libraries</h1>
        <Navigation />
      </header>
      {children}
      <footer style={{ marginTop: '100px' }}>
        <span>footer</span>
      </footer>
    </div>
  );
};

export default Layout;
