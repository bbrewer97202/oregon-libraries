import React, { FunctionComponent } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import prisma from '../../lib/prisma';
import { Library } from '../../types';
import Layout from '../../components/Layout';
import LibraryDetail from '../../components/LibraryDetail';

type Props = {
  library?: Library;
  errors?: string;
};

const StaticPropsDetail: FunctionComponent<Props> = ({ library, errors }) => {
  if (errors) {
    return (
      <Layout title={`Error | Next.js + TypeScript Example`}>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${library ? library.name : 'Library Detail'} | Next.js + TypeScript Example`}>
      {library && <LibraryDetail library={library} />}
    </Layout>
  );
};

export default StaticPropsDetail;

/**
 * create paths for each libary slug
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const libraries = await prisma.library.findMany();
  const paths = libraries.map((library) => ({ params: { id: library.slug } }));
  return { paths, fallback: false };
};

/**
 * get library system and branch descriptor data
 */
export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const slug = (params?.id as string) || undefined;
  try {
    const library = await prisma.library.findFirst({
      where: { slug },
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

    return { props: { library } };
  } catch (error) {
    console.log('error', error);
    return { props: { errors: error } };
  }
};
