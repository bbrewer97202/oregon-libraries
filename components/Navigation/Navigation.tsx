import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation: FunctionComponent = () => {
  return (
    <nav className={styles.container}>
      <Link href="/">
        <a className={styles.navItem}>Home</a>
      </Link>
      <Link href="/about">
        <a className={styles.navItem}>About</a>
      </Link>
      <Link href="/library">
        <a className={styles.navItem}>library List</a>
      </Link>
      <a className={styles.navItem} href="/api/library">
        libraries API
      </a>
    </nav>
  );
};

export default Navigation;
