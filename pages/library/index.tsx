import React from 'react';
import { GetStaticProps } from 'next';
import { Library } from '../../types';
import prisma from '../../lib/prisma';
import Layout from '../../components/Layout';
import LibraryList from '../../components/LibraryList';

type Props = {
  libraries: Library[];
};

const AllLibrariesList: React.FunctionComponent<Props> = ({ libraries }: Props) => {
  return (
    <Layout title="All Libraries">
      <h1>All Libraries</h1>
      <LibraryList libraries={libraries} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const libraries = await prisma.library.findMany({
    select: {
      name: true,
      slug: true,
    },
  });

  return { props: { libraries } };
};

export default AllLibrariesList;
