import { Row, Col, Alert, Pagination } from "react-bootstrap";
import { useMemo, useState, useCallback, useEffect } from "react";
import { movies } from "../movies";
import HeroCarousel from "../components/HeroCarousel";
import SearchFilterBar from "../components/SearchFilterBar";
import MovieCard from "../components/MovieCard";
import PropTypes from "prop-types";

function FreeMovies({ favSet, onToggleFavourite }) {
  const [controls, setControls] = useState({ q: "", genre: "All", sort: "None" });
  const onChange = useCallback((c) => setControls(c), []);

  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(1);

  // Filter + search + sort
  const list = useMemo(() => {
    let arr = movies.slice();
    const q = controls.q.trim().toLowerCase();
    if (q) {
      arr = arr.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }
    if (controls.genre !== "All") {
      arr = arr.filter((m) => m.genre === controls.genre);
    }
    if (controls.sort === "Duration ↑") {
      arr.sort((a, b) => a.duration - b.duration);
    } else if (controls.sort === "Duration ↓") {
      arr.sort((a, b) => b.duration - a.duration);
    }
    return arr;
  }, [controls]);


  useEffect(() => {
    setPage(1);
  }, [controls, perPage]);

  const totalPages = Math.max(1, Math.ceil(list.length / perPage));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedList = useMemo(
    () => list.slice((page - 1) * perPage, page * perPage),
    [list, page, perPage]
  );

  return (
    <>
      <HeroCarousel />

      <SearchFilterBar
        onChange={onChange}
        showItemsPerPage
        perPage={perPage}
        onPerPageChange={(val) => setPerPage(val)}
      />

      <div className="small text-muted mb-2">
        Showing <strong>{paginatedList.length}</strong> of <strong>{list.length}</strong> found
      </div>

      {list.length === 0 ? (
        <Alert variant="warning">No movies found.</Alert>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {paginatedList.map((m) => (
              <Col key={m.id}>
                <MovieCard
                  movie={m}
                  isFaved={favSet.has(m.id)}
                  onToggleFavourite={onToggleFavourite}
                />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
              <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                return (
                  <Pagination.Item key={p} active={p === page} onClick={() => setPage(p)}>
                    {p}
                  </Pagination.Item>
                );
              })}
              <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
              <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
            </Pagination>
          </div>
        </>
      )}
    </>
  );
}

FreeMovies.propTypes = {
  favSet: PropTypes.instanceOf(Set).isRequired,
  onToggleFavourite: PropTypes.func.isRequired,
};

export default FreeMovies;
