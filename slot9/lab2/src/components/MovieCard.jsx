import { Card, Badge, Button, Modal, Toast, ToastContainer } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

function MovieCard({ movie, isFaved, onToggleFavourite }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFav = () => {
    onToggleFavourite(movie.id);
    setShowToast(true);
  };

  const shortDesc =
    movie.description.length > 90
      ? movie.description.slice(0, 90) + "…"
      : movie.description;

  return (
    <>
      <Card className="h-100 movie-card">
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.title}</Card.Title>
          <div className="mb-2 small text-muted">
            {movie.year} • {movie.country} • {movie.duration}m
          </div>
          <Badge bg="secondary" className="mb-2">{movie.genre}</Badge>
          <Card.Text className="flex-grow-1">{shortDesc}</Card.Text>
          <div className="d-flex gap-2 mt-2">
            <Button
              variant={isFaved ? "outline-danger" : "danger"}
              onClick={handleFav}
            >
              {isFaved ? "Remove Favourite" : "Add to Favourites"}
            </Button>
            <Button variant="outline-dark" onClick={() => setShowModal(true)}>
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Country:</strong> {movie.country}</p>
          <p><strong>Duration:</strong> {movie.duration} minutes</p>
          <p>{movie.description}</p>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-center" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={1200}
          autohide
        >
          <Toast.Body className="text-white">
            {isFaved ? "Removed from favourites." : "Added to favourites!"}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  isFaved: PropTypes.bool,
  onToggleFavourite: PropTypes.func.isRequired
};

export default MovieCard;
