import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import React from 'react';
import { Branch, LibraryType } from '../../types';
import prisma from '../../lib/prisma';
import Layout from '../../components/Layout';
// import List from '../../../components/List';
// import library from '../../api/library';

interface todo {
  id: number;
  name: string;
}

type Props = {
  branches: todo[];
  libraryType: LibraryType;
};

const WithStaticProps: React.FunctionComponent<Props> = ({ branches, libraryType }: Props) => {
  const debug = branches.map((branch, index) => (
    <div key={index}>
      <Link href={`/library/${branch.id}`}>{branch.name}</Link>
    </div>
  ));

  return (
    <Layout title={`${libraryType} library branches`}>
      <h1>{libraryType} Library Branches</h1>
      {debug}
      {/* <List items={branches} /> */}
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const libraryTypes = await prisma.libraryType.findMany({ select: { name: true } });
  const paths = libraryTypes.map((libraryType) => ({ params: { libraryType: libraryType.name } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  // library type is required parameter
  const { libraryType: libraryTypeName } = params;
  if (typeof libraryTypeName !== 'string') return { notFound: true };

  // find id associated with library type
  const libraryTypeId = await prisma.libraryType.findFirst({
    where: { name: libraryTypeName },
    select: { id: true },
  });
  if (!libraryTypeId || typeof libraryTypeId.id !== 'number') return { notFound: true };

  // get all branches associated with library type id
  const branches = await prisma.branch.findMany({
    where: { libraryTypeId: libraryTypeId.id },
    select: { id: true, name: true },
  });

  // TODO: Don't forget to include the respective types for any props passed into
  // the component.

  return { props: { branches, libraryType: libraryTypeName }, notFound: false };
};

export default WithStaticProps;
