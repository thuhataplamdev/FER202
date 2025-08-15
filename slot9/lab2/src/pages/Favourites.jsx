import { Row, Col, Alert } from "react-bootstrap";
import { movies } from "../movies";
import MovieCard from "../components/MovieCard";
import PropTypes from "prop-types";

function Favourites({ favSet, onToggleFavourite }) {
  const favMovies = movies.filter((m) => favSet.has(m.id));

  return (
    <>
      <h3 className="mb-3">My Favourite Movies</h3>
      {favMovies.length === 0 ? (
        <Alert variant="secondary">No favourites yet.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favMovies.map((m) => (
            <Col key={m.id}>
              <MovieCard movie={m} isFaved onToggleFavourite={onToggleFavourite} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

Favourites.propTypes = {
  favSet: PropTypes.instanceOf(Set).isRequired,
  onToggleFavourite: PropTypes.func.isRequired
};

export default Favourites;
