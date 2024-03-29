import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from './Navigation/Navigation';
import styles from './Layout.module.css';

type Props = {
  children: React.ReactNode | React.ReactNode[]; // TODO one layout component only
  title?: string;
};

const Layout: FunctionComponent<Props> = ({ children, title = 'Oregon Libraries' }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/*
        TODO: bundle leaflet css
        Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"). Use Document instead.
        See more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component
        */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <Link href="/">Oregon Libraries</Link>
        </h1>
        <Navigation />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
