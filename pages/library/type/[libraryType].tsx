import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../../components/Layout';
import prisma from '../../../lib/prisma';
import Link from 'next/link';

import React, { FunctionComponent } from 'react';
import { Library } from '../../../types';

type Props = {
  librariesByType: Library[];
};

type LibraryType = string;

// TODO: library type should be case insensitive

const sortLibraries = (a: Library, b: Library) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};

const LibraryTypeDetail: FunctionComponent<Props> = ({ librariesByType }) => {
  console.log('librariesByType: ', librariesByType);
  const sortedLibraryList = librariesByType.sort(sortLibraries);
  const list = sortedLibraryList.map((library) => {
    return (
      <li key={library.slug}>
        <Link href="/library/[id]" as={`/library/${library.slug}`}>
          <a>{library.name}</a>
        </Link>
      </li>
    );
  });
  return (
    <Layout title={`TODO title`}>
      <ul>{list}</ul>
    </Layout>
  );
};

export default LibraryTypeDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const libraryTypes = await prisma.libraryType.findMany();
  const paths = libraryTypes.map((libraryType) => ({ params: { libraryType: libraryType.name } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // TODO: how to restrict param to string
  const libraryType: LibraryType =
    params?.libraryType && typeof params?.libraryType === 'string' ? params.libraryType : '';
  console.log('libraryType', libraryType);
  try {
    const librariesByType = await prisma.library.findMany({
      where: {
        libraryType: {
          name: libraryType,
        },
      },
      select: {
        name: true,
        slug: true,
        address: true,
        geolocation: true,
        city: true,
        county: true,
        zipCode: true,
      },
    });

    return { props: { librariesByType } };
  } catch (error) {
    console.log('error', error);
    return { props: { librariesByType: [] } };
  }
};
