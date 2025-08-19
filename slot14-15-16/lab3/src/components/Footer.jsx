import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light py-3 mt-4">
      <Container>
        <p className="mb-0 text-center">&copy; {new Date().getFullYear()} Healthy Recipes. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
