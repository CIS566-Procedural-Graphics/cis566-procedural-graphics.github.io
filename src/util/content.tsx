import path from 'path';
import { promises as fs } from 'fs';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { renderToStaticMarkup } from 'react-dom/server';
import matter from 'gray-matter';

export type PageProps = {
  frontmatter: {
    title: string | undefined;
    rank: number | undefined;
    href: string | undefined;
  } & {
    [key: string]: string | undefined;
  };
  content: string;
};

export type PagePropsWithSlug = PageProps & {
  slug: string;
};

export async function getMdPage(filePath: string): Promise<PageProps> {
  const mdWithMetadata = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(mdWithMetadata.toString());

  return {
    content: renderToStaticMarkup(
      <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
        {content}
      </ReactMarkdown>
    ),
    frontmatter: data as PageProps['frontmatter'],
  };
}

export async function getMdPages(
  contentPath: string
): Promise<PagePropsWithSlug[]> {
  const dirents = await fs.readdir(contentPath, { withFileTypes: true });
  const files = dirents.filter(
    (dirent) => dirent.isFile() && dirent.name.endsWith('.md')
  );

  const mdPages = await Promise.all(
    files.map(async (file) => {
      const { frontmatter, content } = await getMdPage(
        path.join(contentPath, file.name)
      );

      return {
        slug: file.name.replace('.md', ''),
        frontmatter,
        content,
      };
    })
  );

  return mdPages;
}
