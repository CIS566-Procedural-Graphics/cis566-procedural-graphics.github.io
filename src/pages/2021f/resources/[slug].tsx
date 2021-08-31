import { PageProps } from '../../../util/content';
import { makeContentPage } from '../../../util/contentPage';
import { Layout } from '../index';

const { getStaticPaths, getStaticProps } = makeContentPage('content/2021f');
export { getStaticPaths, getStaticProps };

const Page: React.FunctionComponent<PageProps> = (props) => {
  return (
    <Layout title={props.frontmatter.title}>
      <main
        dangerouslySetInnerHTML={{
          __html: props.content,
        }}
      />
    </Layout>
  );
};

export default Page;
