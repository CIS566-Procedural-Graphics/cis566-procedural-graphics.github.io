import { GetStaticProps } from 'next';
import { getMdPages, PageProps, PagePropsWithSlug } from './content';
import { makeContentPage, PageParams } from './contentPage';

let mdPagesResult:
  | {
      resources: ReturnType<typeof getMdPages>;
      assignments: ReturnType<typeof getMdPages>;
    }
  | undefined = undefined;

export interface NavLinkSection {
  title: string;
  dir: string;
  pages: PagePropsWithSlug[];
}

export type NavLinks = NavLinkSection[];

export async function getNavLinks(): Promise<NavLinks> {
  if (mdPagesResult === undefined) {
    mdPagesResult = {
      resources: getMdPages('content/2021f/resources'),
      assignments: getMdPages('content/2021f/assignments'),
    };
  }

  return [
    {
      title: 'Assignments',
      dir: 'assignments',
      pages: await mdPagesResult.assignments,
    },
    {
      title: 'Resources',
      dir: 'resources',
      pages: await mdPagesResult.resources,
    },
  ];
}

export type PagePropsWithNavLinks = PageProps & {
  navLinks: NavLinks;
};

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export function makeContentPageWithNavLinks(base: string) {
  const { getStaticProps: getContentStaticProps, getStaticPaths } =
    makeContentPage(base);
  const getStaticProps: GetStaticProps<PagePropsWithNavLinks, PageParams> =
    async (context) => {
      const contentProps = getContentStaticProps(context) as Promise<{
        props: PageProps;
      }>;
      const { props } = await contentProps;
      return {
        props: {
          ...props,
          navLinks: await getNavLinks(),
        },
      };
    };
  return {
    getStaticProps,
    getStaticPaths,
  };
}
