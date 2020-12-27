import * as React from 'react';
import dynamic from 'next/dynamic';
import { Library } from '../types';

const Map = dynamic(() => import('./Map/Map'), { ssr: false });

type ListDetailProps = {
  item: Library;
};

const ListDetail: React.FunctionComponent<ListDetailProps> = ({ item: library }) => {
  const { branchName, fullAddress, libraryName, website = [], geolocation } = library;

  // website links
  const webLinks = website.map((site) => {
    if (site)
      return (
        <a href={site} key={site} target="_blank" rel="noopener noreferrer">
          {site}
        </a>
      );
  });
  return (
    <div>
      <h2>{libraryName}</h2>
      {branchName ? <h3>{branchName}</h3> : null}
      <div>{fullAddress}</div>
      {webLinks}

      <Map location={geolocation} />
    </div>
  );
};

export default ListDetail;
