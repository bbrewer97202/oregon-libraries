import React from 'react';
import Layout from '../components/Layout';
import HeroLink from '../components/HeroLink/HeroLink';

const IndexPage = () => (
  <Layout title="Oregon Libraries">
    <HeroLink href="/library/type/Academic" label="Academic" icon="academic" />
    <HeroLink href="/library/type/Public" label="Public" icon="public" />
    <HeroLink href="/library/type/Tribal" label="Tribal" icon="tribal" />
    <HeroLink href="/library/type/Special" label="Special" icon="special" />
    <HeroLink href="/library/type/Volunteer" label="Volunteer" icon="volunteer" />
  </Layout>
);

export default IndexPage;
