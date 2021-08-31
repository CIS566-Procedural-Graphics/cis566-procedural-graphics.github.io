import path from 'path';
import { promises as fs } from 'fs';
import ReactMarkdown from 'react-markdown';
import { renderToStaticMarkup } from 'react-dom/server';
import matter from 'gray-matter';

import { assert } from './assert';

export type PageProps = {
  frontmatter: {
    title: string;
    [key: string]: string;
  };
  content: string;
};

export type PagePropsWithSlug = PageProps & {
  slug: string;
};

export async function getMdPage(filePath: string): Promise<PageProps> {
  const mdWithMetadata = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(mdWithMetadata.toString());

  assert('title' in data);
  assert(typeof data['title'] === 'string');

  const frontmatter = {
    ...data,
    title: data.title,
  };

  return {
    content: renderToStaticMarkup(<ReactMarkdown>{content}</ReactMarkdown>),
    frontmatter,
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
