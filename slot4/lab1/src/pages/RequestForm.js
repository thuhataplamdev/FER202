import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { FiSend } from "react-icons/fi";

export default function RequestForm() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true); // sau khi bấm submit mới hiện feedback
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={7}>
        <Card className="p-4 rounded-xl shadow-soft">
          <h3 className="mb-3">Recipe Request Form</h3>
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ingredient">
              <Form.Label>Desired Ingredient</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="tự cho chi tiết cụ thể…."
              />
              <Form.Control.Feedback type="invalid">
                Please specify an ingredient
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="maxprep">
              <Form.Label>Max Prep Time</Form.Label>
              <Form.Select required defaultValue="">
                <option value="">Select…</option>
                <option value="5">5 phút</option>
                <option value="10">10 phút</option>
                <option value="15">15 phút</option>
                <option value="30">30 phút</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose a prep time
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Any notes or preferences…"
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="btn-cta">
              <FiSend className="me-2" /> Submit Request
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
