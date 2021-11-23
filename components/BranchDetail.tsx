import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Branch } from '../types';

// const Map = dynamic(() => import('./Map/Map'), { ssr: false });

type ListDetailProps = {
  branch: Branch;
};

const BranchDetail: React.FunctionComponent<ListDetailProps> = ({ branch }) => {
  console.log('got branch', branch);

  const { branchName, address = [] } = branch;
  const router = useRouter();
  const { id: branchId } = router.query;

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

  return (
    <div>
      <h2>BRANCH DETAIL: {branchName}</h2>
      {address}
      {/* <Map location={geolocation} /> */}
    </div>
  );
};

export default BranchDetail;
