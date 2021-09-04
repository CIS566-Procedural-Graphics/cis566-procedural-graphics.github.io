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
              <Link href={`${props.basePath}/logistics`} passHref>
                <Nav.Link>Logistics</Nav.Link>
              </Link>
              <Link href={`${props.basePath}/content`} passHref>
                <Nav.Link>Content</Nav.Link>
              </Link>
              {props.navLinks.map((section) => {
                section.pages.sort((a, b) => {
                  const ra = a.frontmatter['rank'];
                  const rb = b.frontmatter['rank'];
                  const rav = ra ?? 0;
                  const rbv = rb ?? 0;
                  return rav - rbv;
                });
                return (
                  <NavDropdown
                    title={section.title}
                    key={section.title}
                    id={`${section.title}-dropdown`}
                  >
                    {section.pages.map((page) => {
                      if (page.frontmatter['type'] === 'link') {
                        return (
                          <Link
                            key={page.frontmatter['title']}
                            href={page.frontmatter['href'] as string}
                            passHref
                          >
                            <NavDropdown.Item>
                              {page.frontmatter['title']}
                            </NavDropdown.Item>
                          </Link>
                        );
                      }
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
