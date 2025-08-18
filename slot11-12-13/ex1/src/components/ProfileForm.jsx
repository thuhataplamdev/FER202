import React from "react";
import PropTypes from "prop-types";
import { Form, Toast, ToastContainer, Button, Modal, Card,Row,Col } from "react-bootstrap";

function ProfileForm({ onSubmit, initialValues }) {
  const [name, setName] = React.useState(initialValues.name || "");
  const [email, setEmail] = React.useState(initialValues.email || "");
  const [age, setAge] = React.useState(
    initialValues.age !== undefined && initialValues.age !== null
      ? String(initialValues.age)
      : ""
  );

  const [touched, setTouched] = React.useState({
    name: false,
    email: false,
    age: false,
  });

  const [showToast, setShowToast] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // Validate từng trường
  const validate = React.useCallback(
    (v) => {
      const errs = {};
      if (!v.name.trim()) errs.name = "Name is required.";
      if (!v.email.trim()) errs.email = "Email is required.";
      else if (!v.email.includes("@")) errs.email = "Email must contain '@'.";
      if (v.age === "") errs.age = "Age is required.";
      else if (Number.isNaN(Number(v.age))) errs.age = "Age must be a number.";
      else if (Number(v.age) < 1) errs.age = "Age must be at least 1.";
      return errs;
    },
    []
  );

  const values = { name, email, age };
  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // đánh dấu đã chạm để hiển thị lỗi nếu có
    setTouched({ name: true, email: true, age: true });
    if (!isValid) return;

    // gọi callback và hiển thị toast + modal
    onSubmit?.({ name: name.trim(), email: email.trim(), age: Number(age) });
    setShowToast(true);
    setShowModal(true);
  };

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="pf-name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            isInvalid={touched.name && !!errors.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="pf-email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            isInvalid={touched.email && !!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="pf-age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onBlur={() => handleBlur("age")}
            min={1}
            isInvalid={touched.age && !!errors.age}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button type="submit" variant="primary" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </Form>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Row className="mb-2">
                <Col xs={4} className="fw-semibold">
                  Name:
                </Col>
                <Col xs={8}>{name.trim()}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4} className="fw-semibold">
                  Email:
                </Col>
                <Col xs={8}>{email.trim()}</Col>
              </Row>
              <Row>
                <Col xs={4} className="fw-semibold">
                  Age:
                </Col>
                <Col xs={8}>{Number(age)}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func, 
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

ProfileForm.defaultProps = {
  onSubmit: () => {},
  initialValues: { name: "", email: "", age: "" },
};

export default ProfileForm;