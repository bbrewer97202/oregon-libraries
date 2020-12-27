import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Navigation from './Navigation/Navigation';

type Props = {
  title?: string;
};

const Layout: FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />
      </Head>
      <header>
        <h1>Oregon Libraries</h1>
        <Navigation />
      </header>
      {children}
      <footer>
        <span>footer</span>
      </footer>
    </div>
  );
};

export default Layout;
