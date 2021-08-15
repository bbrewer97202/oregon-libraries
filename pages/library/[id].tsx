import React, { FunctionComponent } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import prisma from '../../lib/prisma';
import Layout from '../../components/Layout';

type Props = {
  branch: Branch;
  library: Library;
};

type Branch = {
  address: string;
  branchName: string;
  city: string;
  county: string;
  library: string;
};

type Library = {
  id: number;
  name: string;
};

const BranchDetail: FunctionComponent<Props> = ({ branch, library }) => {
  const { address, branchName, city, county } = branch;
  return (
    <Layout>
      <h2>
        {library.name} / {branchName}
      </h2>
      <h3>
        <span style={{ display: 'block' }}>{address}</span>
        <span>{city}, OR</span>
      </h3>
      <p>{county}</p>
    </Layout>
  );
};

export default BranchDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // get all branches
  const branches = await prisma.branch.findMany({
    select: { id: true, name: true },
  });

  const paths = branches.map((branch) => {
    return {
      params: {
        id: branch.id.toString(),
      },
    };
  });
  //   console.log('getStaticPaths: ', JSON.stringify(paths));
  // TODO: Don't forget to include the respective types for any props passed into
  // the component.

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const id: string = params.id || 'todo';
  if (typeof id !== 'string') return { notFound: true };

  const branch = await prisma.branch.findUnique({
    where: { id: parseInt(id) },
    include: { county: true, city: true, library: true },
  });

  // todo error check branch
  //   if (typeof branch !== 'object') return { notFound: true };
  const props = {
    id: branch?.id,
    library: {
      id: branch?.library?.id,
      name: branch?.library?.name,
    },
    branch: {
      address: branch?.address,
      branchName: branch?.name,
      city: branch?.city?.name,
      county: branch?.county?.name,
      libraryName: branch?.library?.name,
    },
  };

  return { props, notFound: false };
};
