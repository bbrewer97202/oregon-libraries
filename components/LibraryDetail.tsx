import * as React from 'react';

// import Link from 'next/link';
import { useRouter } from 'next/router';
import { Library } from '../types';

import dynamic from 'next/dynamic';

// type LatLongCoordinates = [number, number];

// type LibraryDescriptor = {
//   name: string;
//   slug: string;
// };

// type BranchDescriptor = {
//   name: string;
//   slug: string;
// };

type ListDetailProps = {
  library: Library;
};

const LibraryDetail: React.FunctionComponent<ListDetailProps> = ({ library }) => {
  console.log('library: ', library);
  const Map = dynamic(() => import('./Map/Map'), { ssr: false });
  const { address, city = {}, geolocation, name, zipCode = {} } = library;
  const cityName = city?.name || '';
  const zip = zipCode?.name || '';
  //   const coordinates = typeof geolocation === 'string' && getCoordinatesFromLocation(geolocation);
  //   console.log('parent coordinates', coordinates);
  //   const router = useRouter();
  //   const { id: libraryId } = router.query;

  // website links
  //   const webLinks = website.map((site) => {
  //     if (site)
  //       return (
  //         <a href={site} key={site} target="_blank" rel="noopener noreferrer">
  //           {site}
  //         </a>
  //       );
  //   });

  //   branchName: string;
  //   address: string;
  //   city: string;
  //   county: string;
  //   zipCode: string;
  //   geolocation: string | null;
  //   phone: string | null;
  //   email: string | null;
  //   libraryType: LibraryType;
  //   membership: LibraryMembership;
  //   directorName: string | null;
  //   directorPhone: string | null;
  //   directorEmail: string | null;

  //   const branchDetailsList = branch.map((eachBranch: BranchDescriptor) => (
  //     <Link key={eachBranch.slug} href="/branch/[branchId]" as={`/branch/${eachBranch.slug}`}>
  //       <li>
  //         <a>{eachBranch.name}</a>
  //       </li>
  //     </Link>
  //   ));

  //   const branchListLabel = branch.length === 1 ? '1 Branch' : `${branch.length} Branches`;

  return (
    <div>
      <h2>{name}</h2>
      <p>{address}</p>
      {cityName && <p>{cityName}, OR</p>}
      {zip && <p>{zip}</p>}
      <p>geolocation: {geolocation}</p>
      <Map name={name} location={geolocation} />
    </div>
  );
};

export default LibraryDetail;
