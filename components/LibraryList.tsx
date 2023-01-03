import * as React from 'react';
import Link from 'next/link';
import { Library } from '../types';

type Props = {
  libraries: Library[];
};

const LibraryList: React.FunctionComponent<Props> = ({ libraries }) => {
  console.log('ALL LIBRARIES', libraries);
  const libraryList = libraries.map((library) => (
    <li key={library.slug}>
      <Link href="/library/[id]" as={`/library/${library.slug}`}>
        <a>{library.name}</a>
      </Link>
    </li>
  ));

  return <ul>{libraryList}</ul>;
};

export default LibraryList;
