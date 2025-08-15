import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { allGenres } from "../movies";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";

function SearchFilterBar({
  onChange,
  showItemsPerPage = false,
  perPage = 4,
  onPerPageChange
}) {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("None");

  useEffect(() => {
    const t = setTimeout(() => onChange({ q, genre, sort }), 200);
    return () => clearTimeout(t);
  }, [q, genre, sort, onChange]);

  return (
    <Row className="g-3 mb-3">
      <Col md={6}>
        <InputGroup>
          <InputGroup.Text aria-hidden="true"><FiSearch /></InputGroup.Text>
          <Form.Control
            placeholder="Search by title…"
            aria-label="Search by title"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </InputGroup>
      </Col>

      <Col md={3}>
        <Form.Select
          aria-label="Filter by genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {allGenres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Form.Select>
      </Col>

      <Col md={3}>
        <Form.Select
          aria-label="Sort by duration"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option>None</option>
          <option>Duration ↑</option>
          <option>Duration ↓</option>
        </Form.Select>
      </Col>

      {showItemsPerPage && (
        <Col xs={12} className="mt-2">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">Items per page:</span>
            <Form.Select
              aria-label="Items per page"
              style={{ maxWidth: 80 }}
              value={perPage}
              onChange={(e) => onPerPageChange?.(Number(e.target.value))}
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
            </Form.Select>
          </div>
        </Col>
      )}
    </Row>
  );
}

SearchFilterBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  showItemsPerPage: PropTypes.bool,
  perPage: PropTypes.number,
  onPerPageChange: PropTypes.func
};

export default SearchFilterBar;