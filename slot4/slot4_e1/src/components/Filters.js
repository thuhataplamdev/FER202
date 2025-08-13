import { Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Filters({ onFilterChange }) {
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ maxPrep, maxCook, searchTerm });
    }, 300);
    return () => clearTimeout(timer);
  }, [maxPrep, maxCook, searchTerm, onFilterChange]);

  return (
    <Row className="mb-4 filters">
      <Col md={3} sm={6} className="mb-2">
        <Form.Select
          value={maxPrep}
          onChange={(e) => setMaxPrep(e.target.value)}
        >
          <option value="">Max Prep Time</option>
          <option value="5">≤ 5 mins</option>
          <option value="10">≤ 10 mins</option>
          <option value="15">≤ 15 mins</option>
        </Form.Select>
      </Col>
      <Col md={3} sm={6} className="mb-2">
        <Form.Select
          value={maxCook}
          onChange={(e) => setMaxCook(e.target.value)}
        >
          <option value="">Max Cook Time</option>
          <option value="5">≤ 5 mins</option>
          <option value="10">≤ 10 mins</option>
          <option value="15">≤ 15 mins</option>
          <option value="20">≤ 20 mins</option>
        </Form.Select>
      </Col>
      <Col md={6} sm={12} className="mb-2">
        <Form.Control
          type="text"
          placeholder="Search by name or ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>
    </Row>
  );
}
