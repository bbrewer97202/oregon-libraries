import * as React from 'react';
import Link from 'next/link';
import styles from './HeroLink.module.css';
import { ImBook, ImBooks, ImLibrary, ImPower, ImUsers } from 'react-icons/im';

interface Props {
  label: string;
  href: string;
  icon?: string;
}

// enum IconTypes { academic, public, special, tribal, volunteer }

const IconType: Record<string, Function> = {
  academic: ImLibrary,
  public: ImBooks,
  special: ImBook,
  tribal: ImPower,
  volunteer: ImUsers,
};


// const IconType: Map<string, Function> = new Map([
//   ['academic', ImLibrary],
//   ['public', ImBooks],
//   ['special', ImBook],
//   ['tribal', ImPower],
//   ['volunteer', ImUsers],
// ]);

const HeroLink: React.FunctionComponent<Props> = ({ label, href, icon }) => {
  const LinkIcon = icon && IconType[icon] ? <div className={styles.icon}>{IconType[icon]()}</div> : null;

  return (
    <Link href={href}>
      <a className={styles.link}>
        {LinkIcon}
        <span className={styles.label}>{label}</span>
      </a>
    </Link>
  );
};

export default HeroLink;
