import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import PropTypes from "prop-types";

function AppNavbar({ favCount = 0, onOpenRequestForm }) {
  return (
    <Navbar expand="lg" fixed="top" bg="light" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">🎬 Movie Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Free Movies</Nav.Link>
            <Nav.Link as={NavLink} to="/favourites">My Favourite Movies</Nav.Link>
            <Nav.Link onClick={onOpenRequestForm}>Movie Request Form</Nav.Link>
          </Nav>
          <div className="position-relative ms-auto">
            <AiOutlineHeart size={24} aria-label="favourites" />
            <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
              {favCount}
            </Badge>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  favCount: PropTypes.number,
  onOpenRequestForm: PropTypes.func.isRequired
};

export default AppNavbar;