import * as React from 'react';
import styles from './LibraryDetail.module.css';
import { Library, NamedDescriptor } from '../types';
import dynamic from 'next/dynamic';

type LibraryDetail = Library & {
  city: NamedDescriptor;
  county: NamedDescriptor;
  zipCode: NamedDescriptor;
};

type ListDetailProps = {
  library: LibraryDetail;
};

const LibraryDetailView: React.FunctionComponent<ListDetailProps> = ({ library }) => {
  console.log('library: ', library);
  const LibraryMap = dynamic(() => import('./Map/Map'), { ssr: false });
  const { address, city, county, geolocation, name, zipCode } = library;
  const cityName = city?.name || '';
  const zip = zipCode?.name || '';
  const countyName = county?.name || '';

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
      <h2 className={styles.header}>{name}</h2>
      <h3 className={styles.county}>{countyName} County</h3>
      <address className={styles.location}>
        <p>{address}</p>
        {cityName && <p>{cityName}, OR</p>}
        {zip && <p>{zip}</p>}
      </address>
      <LibraryMap location={geolocation} />
    </div>
  );
};

export default LibraryDetailView;
