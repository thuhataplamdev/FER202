import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ValidatedInput from "./ValidatedInput";

function FormWrapper() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  const handleValidChange = (valid, value) => {
    setCanSubmit(valid);
    setCurrentValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      alert("Submit thành công với giá trị: " + currentValue);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ValidatedInput label="Nhập dữ liệu" onValidChange={handleValidChange} />
      <Button variant="primary" type="submit" disabled={!canSubmit}>
        Gửi
      </Button>
    </Form>
  );
}

export default FormWrapper;
