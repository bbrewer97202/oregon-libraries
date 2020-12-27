import { GetStaticProps } from 'next';
import Link from 'next/link';

import React from 'react';
import { Library } from '../../types';
import data from '../../data/data.json';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = {
  items: Library[];
};

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

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  // const items: Library = data;

  console.log('data.length', data.length);

  const allLibraries: Library[] = data as Library[];

  return { props: { items: allLibraries } };
};

export default WithStaticProps;
