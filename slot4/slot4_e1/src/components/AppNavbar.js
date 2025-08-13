import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar expand="lg" className="mb-4 nav-elevated">
      <Container>
        <Navbar.Brand as={Link} to="/">🍽 Healthy Recipes</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
          </Nav>
          <Button variant="success" className="btn-cta" as={Link} to="/recipes">
            Browse Recipes
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
