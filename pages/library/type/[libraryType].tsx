import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import React from 'react';
import { Library } from '../../../types';
import data from '../../../data/data.json';
import Layout from '../../../components/Layout';
import List from '../../../components/List';

type Props = {
  items: Library[];
};

type LibraryType = string;

const WithStaticProps: React.FunctionComponent<Props> = ({ items }: Props) => {
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Library List</h1>
      <p>
        Example fetching data from inside <code>getStaticProps()</code>.
      </p>
      <p>You are currently on: /Library</p>
      <List items={items} />
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data.map((library) => ({
    params: { libraryType: library.libraryType },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  // const items: Library = data;

  // TODO: how to restrict param to string
  const libraryType: LibraryType =
    params?.libraryType && typeof params?.libraryType === 'string' ? params.libraryType : '';
  console.log('libraryType', libraryType);

  const allLibraries: Library[] = data as Library[];
  const items = allLibraries.filter((library) => {
    // console.log(`compare ${library.libraryType.toLowerCase()} to ${libraryType}`);
    return library.libraryType.toLowerCase() === libraryType.toLowerCase();
  });

  return { props: { items } };
};

export default WithStaticProps;
