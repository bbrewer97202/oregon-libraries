import { AppProps } from 'next/app';
import React from 'react';
import '../styles.css';

function OregonLibraries({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default OregonLibraries;
