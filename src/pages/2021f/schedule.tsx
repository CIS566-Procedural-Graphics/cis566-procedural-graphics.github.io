import Layout from '../../components/Layout';
import { brand, courseTitle } from './index';

const Page: React.FunctionComponent = () => {
  return (
    <Layout basePath="/2021f" brand={brand} title={`Schedule | ${courseTitle}`}>
      <h1>Schedule</h1>
    </Layout>
  );
};

export default Page;
