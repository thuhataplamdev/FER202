import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

// Hàm validate
const validateInput = (value) => {
  return value.length >= 5;
};

function ValidatedInput({ label = "Nhập một giá trị", onValidChange }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);

    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }

    // báo ra ngoài nếu cần
    if (onValidChange) onValidChange(isValidInput, value);
  }, [value, onValidChange]);

  return (
    <Form.Group controlId="validatedInput" className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        isValid={isValid}
        isInvalid={!isValid}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default ValidatedInput;
