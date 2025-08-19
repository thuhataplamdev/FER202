import React from "react";
import PropTypes from "prop-types";
import { Navbar as BsNavbar, Container, Nav, Form } from "react-bootstrap";

function Navbar({ quickQuery, onQuickQuery, onOpenProfile }) {
  return (
    <BsNavbar bg="primary" variant="dark" expand="lg" className="mb-3">
      <Container>
        <BsNavbar.Brand href="#home">🎓 StudentSite</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav" />
        <BsNavbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" active>Home</Nav.Link>
            <Nav.Link
              href="#build"
              onClick={(e) => { e.preventDefault(); onOpenProfile?.(); }}
            >
              Build your Profile
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Quick search..."
              value={quickQuery}
              onChange={(e) => onQuickQuery(e.target.value)}
            />
          </Form>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

Navbar.propTypes = {
  quickQuery: PropTypes.string.isRequired,
  onQuickQuery: PropTypes.func.isRequired,
  onOpenProfile: PropTypes.func, // optional-safe
};

export default Navbar;
