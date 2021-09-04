import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';

import { getMdPage, getMdPages, PageProps, PagePropsWithSlug } from './content';
import { assert } from './assert';

export type PageParams = PagePropsWithSlug['frontmatter'] & {
  slug: string;
};

export function makeContentPage(base: string): {
  getStaticPaths: GetStaticPaths<PageParams>;
  getStaticProps: GetStaticProps<PageProps, PageParams>;
} {
  const getStaticPaths: GetStaticPaths<PageParams> = async () => {
    const files = await getMdPages(path.join(process.cwd(), base));

    const paths = files.map((f) => ({
      params: {
        ...f.frontmatter,
        slug: f.slug,
      } as PageParams,
    }));

    return {
      paths,
      fallback: false,
    };
  };

  const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
    params,
  }) => {
    assert(params !== undefined);

    const { slug } = params;
    const { content, frontmatter } = await getMdPage(
      path.join(process.cwd(), base, `${slug}.md`)
    );

    return {
      props: {
        content,
        frontmatter,
      },
    };
  };

  return { getStaticProps, getStaticPaths };
}
