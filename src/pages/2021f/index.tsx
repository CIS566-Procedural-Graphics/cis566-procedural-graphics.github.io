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
        <h2>Course Description</h2>
        <p>
          Sprawling cities, dense vegetation, infinite worlds — procedural
          graphics empower technical artists to quickly create complex digital
          assets that would otherwise be unfeasible. This course is intended to
          introduce the algorithmic foundations of procedural modeling,
          texturing and animation techniques, and to offer hands-on experience
          designing and implementing “visual recipes” in original graphics
          projects by applying these methods. Students should have a strong
          interest in both the creative and technical aspects of computer
          graphics, as well as a solid programming background.
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
