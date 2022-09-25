import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation: FunctionComponent = () => {
  return (
    <nav className={styles.container}>
      <Link href="/about">
        <a className={styles.navItem}>About</a>
      </Link>
      <Link href="/library">
        <a className={styles.navItem}>All Libraries</a>
      </Link>
    </nav>
  );
};

export default Navigation;
