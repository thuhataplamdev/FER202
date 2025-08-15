import { Carousel } from "react-bootstrap";
import { movies } from "../movies"; // đúng path file của bạn

function HeroCarousel() {
  return (
    <Carousel className="mb-4 rounded-xl shadow-soft">
      {movies.map((m) => (
        <Carousel.Item key={m.id}>
          <img
            className="d-block w-100"
            src={m.poster} 
            alt={m.title}
            style={{ maxHeight: 360, objectFit: "cover" }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded-pill px-3">
            <h5 className="mb-0">{m.title}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;
