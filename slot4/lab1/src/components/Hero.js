import { Container } from "react-bootstrap";

export default function Hero() {
  return (
    <div className="hero">
      <Container>
        <h1 className="hero-title">Explore our simple, healthy recipes</h1>
         <p className="hero-lead">
          Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. Use the search bar to find a recipe by name or ingredient, or simply scroll the list and let something delicious catch your eye.
        </p>
      </Container>
    </div>
  );
}
