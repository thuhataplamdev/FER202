import { Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Filters({ onFilterChange, showItemsPerPage=false, perPage=6, onPerPageChange }) {
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      onFilterChange({ maxPrep, maxCook, searchTerm, sortBy });
    }, 300);
    return () => clearTimeout(t);
  }, [maxPrep, maxCook, searchTerm, sortBy, onFilterChange]);

  return (
    <Row className="mb-4 filters">
      <Col md={3} sm={6} className="mb-2">
        <Form.Select value={maxPrep} onChange={(e) => setMaxPrep(e.target.value)}>
          <option value="">Max Prep Time</option>
          <option value="5">≤ 5 mins</option>
          <option value="10">≤ 10 mins</option>
          <option value="15">≤ 15 mins</option>
          <option value="30">≤ 30 mins</option>
        </Form.Select>
      </Col>

      <Col md={3} sm={6} className="mb-2">
        <Form.Select value={maxCook} onChange={(e) => setMaxCook(e.target.value)}>
          <option value="">Max Cook Time</option>
          <option value="5">≤ 5 mins</option>
          <option value="10">≤ 10 mins</option>
          <option value="15">≤ 15 mins</option>
          <option value="20">≤ 20 mins</option>
          <option value="30">≤ 30 mins</option>
        </Form.Select>
      </Col>

      <Col md={3} sm={6} className="mb-2">
        <Form.Select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="name-asc">Name A→Z</option>
          <option value="name-desc">Name Z→A</option>
          <option value="prep-asc">Prep ↑</option>
          <option value="prep-desc">Prep ↓</option>
          <option value="cook-asc">Cook ↑</option>
          <option value="cook-desc">Cook ↓</option>
        </Form.Select>
      </Col>

      <Col md={3} sm={6} className="mb-2">
        <Form.Control
          type="text"
          placeholder="Search by name or ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>

      {showItemsPerPage && (
        <Col xs={12} className="mt-2">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">Items per page:</span>
            <Form.Select style={{maxWidth: 120}} value={perPage} onChange={e=>onPerPageChange?.(Number(e.target.value))}>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </Form.Select>
          </div>
        </Col>
      )}
    </Row>
  );
}
