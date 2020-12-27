import React, { FunctionComponent } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { Library } from '../../types';
import data from '../../data/data.json';
import Layout from '../../components/Layout';
import ListDetail from '../../components/ListDetail';

type Props = {
  item?: Library;
  errors?: string;
};

const StaticPropsDetail: FunctionComponent<Props> = ({ item, errors }) => {
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
    <Layout title={`${item ? item.libraryName : 'Library Detail'} | Next.js + TypeScript Example`}>
      {item && <ListDetail item={item} />}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = data.map((library) => ({
    // params: { id: library.id.toString() },
    params: { id: library.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('getStaticProps=== : ', JSON.stringify(params, null, 2));
  try {
    const id = params?.id;
    const item = data.find((library) => id === library.slug);
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
