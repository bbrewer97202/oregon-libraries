import React, { FunctionComponent } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { Library } from '../../types';
import prisma from '../../lib/prisma';
import Layout from '../../components/Layout';
import BranchDetail from '../../components/BranchDetail';

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
    <Layout title={`${item ? item.name : 'Branch Detail'} | Branch Detail TODO`}>
      {item && <BranchDetail branch={item} />}
    </Layout>
  );
};

export default StaticPropsDetail;

/**
 * create paths for each libary slug
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const branches = await prisma.branch.findMany();
  const paths = branches.map((branch) => ({ params: { id: branch.slug } }));
  return { paths, fallback: false };
};

/**
 * get library system and branch descriptor data
 */
export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const slug = (params?.id as string) || undefined;
  try {
    const branch = await prisma.branch.findFirst({
      where: { slug },
      select: {
        name: true,
        slug: true,
        address: true,
      },
    });

    console.log('===> branch ITEM', JSON.stringify(branch, null, 2));

    return { props: { branch } };
  } catch (error) {
    console.log('error', error);
    return { props: { errors: error } };
  }
};
