import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Button } from "react-bootstrap";

function AboutForm({ value, onChange, onNext, setValid }) {
  const ok = useMemo(() =>
    Boolean(value.fullName.trim()) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) &&
    String(value.age).trim() !== ""
  , [value.fullName, value.email, value.age]);

  useEffect(() => setValid(ok), [ok, setValid]);

  return (
    <Form noValidate className="p-3">
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            value={value.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            required
            placeholder="Nguyen Van A"
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={value.email}
            onChange={(e) => onChange("email", e.target.value)}
            required
            placeholder="you@example.com"
            isInvalid={Boolean(value.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)}
          />
          <Form.Control.Feedback type="invalid">Invalid email format.</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={value.age}
            onChange={(e) => onChange("age", e.target.value)}
            required
            min={1}
          />
        </Form.Group>
        <Form.Group as={Col} md="8">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => onChange("avatarFile", e.target.files?.[0] ?? null)}
          />
          {value.avatarUrl && (
            <div className="mt-2 d-flex gap-2 align-items-center">
              <img src={value.avatarUrl} alt="avatar" style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover" }} />
              <small className="text-muted">{value.avatar?.name}</small>
            </div>
          )}
        </Form.Group>
          </Row>

          <div className="d-flex justify-content-end">
              <Button
                  type="button"
                  onClick={onNext}
                  disabled={!ok}
                  className={ok ? "btn btn-success" : "btn btn-secondary"}
              >
                  Next
              </Button>
          </div>
      </Form>
  );
}

AboutForm.propTypes = {
  value: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    avatarUrl: PropTypes.string,
    avatar: PropTypes.any
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  setValid: PropTypes.func.isRequired,
};
export default AboutForm;