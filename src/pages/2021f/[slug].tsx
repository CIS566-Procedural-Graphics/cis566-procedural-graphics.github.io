import { Layout } from './index';
import {
  makeContentPageWithNavLinks,
  PagePropsWithNavLinks,
} from '../../util/nav';

const { getStaticPaths, getStaticProps } =
  makeContentPageWithNavLinks('content/2021f');
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
