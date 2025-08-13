import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

export default function AppNavbar({ favCount = 0 }) {
  return (
    <Navbar expand="lg" className="mb-4 nav-elevated">
      <Container>
        <Navbar.Brand as={Link} to="/">🍽 Healthy Recipes</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/recipes">Recipes</Nav.Link>
            <Nav.Link as={NavLink} to="/request">Recipe Request Form</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <AiOutlineHeart size={22} />
              <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
                {favCount}
              </Badge>
            </div>
            <Button variant="success" className="btn-cta" as={Link} to="/recipes">
              Browse Recipes
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
