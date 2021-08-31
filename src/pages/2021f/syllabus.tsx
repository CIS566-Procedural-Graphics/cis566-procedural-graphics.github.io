import Layout from '../../components/Layout';
import { brand, courseTitle } from './index';

const Page: React.FunctionComponent = () => {
  return (
    <Layout basePath="/2021f" brand={brand} title={`Syllabus | ${courseTitle}`}>
      <h1>Syllabus</h1>
    </Layout>
  );
};

export default Page;
