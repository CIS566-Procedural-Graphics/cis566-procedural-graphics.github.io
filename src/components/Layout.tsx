import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const Layout: React.FunctionComponent<{
  basePath: string;
  brand: string;
  title: string;
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
              <NavDropdown title="Assignments" id="assignments-dropdown">
                {/* <Link href={`${props.basePath}/assignments/proj1-noise`} passHref>
                  <NavDropdown.Item >Project 1: Noise</NavDropdown.Item>
                </Link> */}
              </NavDropdown>
              <NavDropdown title="Resources" id="resources-dropdown">
                {/* <Link href={`${props.basePath}/resources/foo`} passHref>
                  <NavDropdown.Item >Foo</NavDropdown.Item>
                </Link> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{props.children}</Container>
    </>
  );
};

export default Layout;
