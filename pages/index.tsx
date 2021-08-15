import React from 'react';
import Layout from '../components/Layout';
import HeroLink from '../components/HeroLink/HeroLink';
import OregonMap from '../components/OregonMap/OregonMap';

const IndexPage = () => (
  <Layout title="Oregon Libraries">
    <nav style={{ margin: '1rem' }}>
      <HeroLink href="/type/Academic" label="Academic" icon="academic" />
      <HeroLink href="/type/Public" label="Public" icon="public" />
      <HeroLink href="/type/Tribal" label="Tribal" icon="tribal" />
      <HeroLink href="/type/Special" label="Special" icon="special" />
      <HeroLink href="/type/Volunteer" label="Volunteer" icon="volunteer" />
    </nav>
    <div>
      <OregonMap />
    </div>
  </Layout>
);

export default IndexPage;
