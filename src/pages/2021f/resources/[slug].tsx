import { Layout } from '../index';
import {
  makeContentPageWithNavLinks,
  PagePropsWithNavLinks,
} from '../../../util/nav';
import { PageParams } from '../../../util/contentPage';
import { GetStaticPathsResult } from 'next';

const { getStaticPaths: getPaths, getStaticProps } =
  makeContentPageWithNavLinks('content/2021f/resources');
const getStaticPaths: typeof getPaths = async (context) => {
  const { paths, fallback } = (await getPaths(
    context
  )) as GetStaticPathsResult<PageParams>;
  return {
    paths: paths.filter(
      (path) => typeof path === 'object' && path.params['type'] !== 'link'
    ),
    fallback,
  };
};
export { getStaticPaths, getStaticProps };

const Page: React.FunctionComponent<PagePropsWithNavLinks> = (props) => {
  return (
    <Layout title={props.frontmatter.title} navLinks={props.navLinks}>
      <main
        dangerouslySetInnerHTML={{
          __html: props.content,
        }}
      />
    </Layout>
  );
};

export default Page;
