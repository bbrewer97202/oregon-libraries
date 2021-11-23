import React from 'react';
import { GetStaticProps } from 'next';
import { Library } from '../../types';
import prisma from '../../lib/prisma';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = {
  libraries: Library[];
};

const AllLibrariesList: React.FunctionComponent<Props> = ({ libraries }: Props) => {
  return (
    <Layout title="All Libraries">
      <h1>All Libraries</h1>
      <List libraries={libraries} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const rawLibraries = await prisma.library.findMany();

  // TODO: utility fn or babel-plugin-superjson-next
  // ensure serializable data
  const libraries = rawLibraries.map((rawLibrary) => ({
    ...rawLibrary,
    createdAt: new Date(rawLibrary.createdAt).toISOString(),
  }));

  return { props: { libraries } };
};

export default AllLibrariesList;
