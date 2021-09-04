import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLinks } from '../util/nav';

const Layout: React.FunctionComponent<{
  basePath: string;
  brand: string;
  title: string;
  navLinks: NavLinks;
}> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Navbar expand="md" variant="dark" bg="dark">
        <Container>
          <Link href={props.basePath} passHref>
            <Navbar.Brand>{props.brand}</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbar-nav-collapse" />
          <Navbar.Collapse id="navbar-nav-collapse">
            <Nav>
              <Link href={`${props.basePath}/syllabus`} passHref>
                <Nav.Link>Syllabus</Nav.Link>
              </Link>
              <Link href={`${props.basePath}/schedule`} passHref>
                <Nav.Link>Schedule</Nav.Link>
              </Link>
              {props.navLinks.map((section) => {
                return (
                  <NavDropdown
                    title={section.title}
                    key={section.title}
                    id={`${section.title}-dropdown`}
                  >
                    {section.pages.map((page) => {
                      return (
                        <Link
                          key={page.slug}
                          href={`${props.basePath}/${section.dir}/${page.slug}`}
                          passHref
                        >
                          <NavDropdown.Item>
                            {page.frontmatter['title']}
                          </NavDropdown.Item>
                        </Link>
                      );
                    })}
                  </NavDropdown>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{props.children}</Container>
    </>
  );
};

export default Layout;
