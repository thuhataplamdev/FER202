import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Button } from "react-bootstrap";

const COUNTRIES = ["Viet Nam", "Korea", "Italy", "Japan", "Thailand", "USA", "France"];

function AddressForm({ value = {}, onChange, onNext, onPrev, setValid }) {
  const v = {
    streetName:   value.streetName   ?? "",
    streetNumber: value.streetNumber ?? "",
    city:         value.city         ?? "",
    country:      value.country      ?? "Viet Nam",
  };

  const valid = useMemo(
    () => v.streetName.trim() !== "" &&
          v.streetNumber.trim() !== "" &&
          v.city.trim() !== "" &&
          !!v.country,
    [v.streetName, v.streetNumber, v.city, v.country]
  );

  useEffect(() => setValid(valid), [valid, setValid]);

  return (
    <Form className="p-3">
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Control
            type="text"
            placeholder="Street Name"
            value={v.streetName}
            onChange={(e) => onChange("streetName", e.target.value ?? "")}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Control
            type="text"
            placeholder="Street Number"
            value={v.streetNumber}
            onChange={(e) => onChange("streetNumber", e.target.value ?? "")}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <Form.Group as={Col} md="6">
          <Form.Control
            type="text"
            placeholder="City"
            value={v.city}
            onChange={(e) => onChange("city", e.target.value ?? "")}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Select
            value={v.country}
            onChange={(e) => onChange("country", e.target.value ?? "")}
            required
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onPrev}>Previous</Button>
        <Button
          type="button"
          variant={valid ? "success" : "secondary"} 
          onClick={onNext}
          disabled={!valid}
        >
          Finish
        </Button>
      </div>
    </Form>
  );
}

AddressForm.propTypes = {
  value: PropTypes.shape({
    streetName: PropTypes.string,
    streetNumber: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  setValid: PropTypes.func.isRequired,
};
export default AddressForm;