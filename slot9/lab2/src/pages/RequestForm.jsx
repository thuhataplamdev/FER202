import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function RequestForm({ show, onHide }) {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    year: "",
    duration: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.genre) e.genre = "Genre is required.";
    const year = Number(form.year);
    if (!year || year <= 1900) e.year = "Year must be > 1900.";
    const duration = Number(form.duration);
    if (!duration || duration <= 0) e.duration = "Duration must be > 0.";
    if (!form.description.trim() || form.description.trim().length < 30)
      e.description = "Description must be at least 30 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onHide();
    }, 1500);
    setForm({ title: "", genre: "", year: "", duration: "", description: "" });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Movie Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitted && (
          <Alert variant="success">Request submitted. Thank you!</Alert>
        )}

        <Form noValidate onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={onChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              name="genre"
              value={form.genre}
              onChange={onChange}
              isInvalid={!!errors.genre}
            >
              <option value="">-- Select genre --</option>
              {["Action","Animation","Comedy","Drama","Fantasy","Horror","Romance","Sci-Fi","Thriller"].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.genre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              name="year"
              type="number"
              value={form.year}
              onChange={onChange}
              isInvalid={!!errors.year}
            />
            <Form.Control.Feedback type="invalid">
              {errors.year}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              name="duration"
              type="number"
              value={form.duration}
              onChange={onChange}
              isInvalid={!!errors.duration}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duration}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={form.description}
              onChange={onChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">Submit request</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

RequestForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default RequestForm;
