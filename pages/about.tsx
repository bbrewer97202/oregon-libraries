import * as React from 'react';
import Layout from '../components/Layout';

const AboutPage: React.FunctionComponent = () => (
  <Layout title="About | Oregon Libraries">
    <h1>About</h1>
    <p>
      Directory of Oregon libraries with content extraced from{' '}
      <a href="https://catalog.data.gov/dataset/oregon-library-directory">data.gov</a> and reconstituted into queryable
      form.
    </p>
  </Layout>
);

export default AboutPage;
