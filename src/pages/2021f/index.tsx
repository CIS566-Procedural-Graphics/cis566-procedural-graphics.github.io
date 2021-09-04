import { GetStaticProps } from 'next';
import BaseLayout from '../../components/Layout';
import { getNavLinks, NavLinks } from '../../util/nav';

export const courseCode = 'CIS 566';
export const courseName = 'Procedural Graphics';
export const courseSeason = 'Fall 2021';
export const brand = `${courseCode} ${courseSeason}`;
export const courseTitle = `${courseCode} ${courseName} ${courseSeason}`;

export const Layout: React.FunctionComponent<{
  title?: string;
  navLinks: NavLinks;
}> = (props) => {
  return (
    <BaseLayout
      basePath="/2021f"
      brand={brand}
      title={props.title ? `${props.title} | ${courseTitle}` : courseTitle}
      navLinks={props.navLinks}
    >
      {props.children}
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps<{ navLinks: NavLinks }> =
  async () => {
    return getNavLinks().then((navLinks) => ({ props: { navLinks } }));
  };

export const Page: React.FunctionComponent<{ navLinks: NavLinks }> = (
  props
) => {
  return (
    <Layout navLinks={props.navLinks}>
      <main>
        <h1>
          {courseCode} {courseName}
        </h1>
        <h2>{courseSeason} - University of Pennsylvania | Rachel Hwang</h2>
        <img
          width="800"
          style={{ maxWidth: '100%' }}
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/95542c19563823.562dc86805d22.png"
          alt="Pixels on Old Masters, raluca sturzu"
        />
        <p>
          (Image: raluca sturzu,{' '}
          <a href="https://www.behance.net/gallery/19563823/Pixels-on-Old-Masters">
            Pixels On Old Masters
          </a>
          )
        </p>
        <p>What do a rose and a differential equation have in common?</p>
        <p>
          It’s questions like these that allow us to approach artistic problems
          with technical mindsets, or vice versa. Better yet, it helps us see
          that traditional discipline boundaries don’t need to limit us.
        </p>
        <p>
          In this course, be an engineer and an artist as we learn to marry
          computational tools with design thinking to create complex visuals.
          We’ll learn how to approach artistic puzzles by breaking them down
          into components and generative algorithms. We’ll build up an arsenal
          of technologies and techniques for creating unique digital art, and
          hopefully have plenty of fun along the way. :)
        </p>

        <h2>Course Goals</h2>
        <ol>
          <li>
            Learn a toolkit of interesting procedural generation techniques
          </li>
          <li>Get familiar with new tools/technology for procedural artwork</li>
          <li>
            Start or continue developing a portfolio of visually and technically
            inpressive work
          </li>
          <li>Practice approaching unstructured, open-ended problems</li>
        </ol>
      </main>
    </Layout>
  );
};

export default Page;
