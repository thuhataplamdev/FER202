import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const questions = [
  "What is your first pet’s name?",
  "What is your mother’s maiden name?",
  "In which city were you born?",
  "Who was your favorite teacher?"
];

function AccountForm({ value, onChange, onNext, onPrev, setValid, toggleShowPwd }) {
  const pwdOk = useMemo(() => {
    const s = value.password || "";
    return s.length >= 8 && /[A-Z]/.test(s) && /\d/.test(s) && /[^A-Za-z0-9]/.test(s);
  }, [value.password]);

  const userOk = useMemo(() => (value.username || "").length >= 6, [value.username]);
  const confirmOk = useMemo(() => value.password && value.password === value.confirm, [value.password, value.confirm]);
  const qaOk = useMemo(() => Boolean(value.question) && Boolean((value.answer || "").trim()), [value.question, value.answer]);
  const allOk = userOk && pwdOk && confirmOk && qaOk;

  useEffect(() => setValid(allOk), [allOk, setValid]);

  return (
    <Form className="p-3">
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={value.username}
            onChange={(e) => onChange("username", e.target.value)}
            isInvalid={value.username && !userOk}
            required
            placeholder="at least 6 characters"
          />
          <Form.Control.Feedback type="invalid">Minimum 6 characters.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={value.showPwd ? "text" : "password"}
              value={value.password}
              onChange={(e) => onChange("password", e.target.value)}
              isInvalid={Boolean(value.password) && !pwdOk}
              required
              placeholder="Min 8 chars, upper, number, special"
            />
            <Button variant="outline-secondary" onClick={toggleShowPwd} aria-label="Toggle password visibility">
              {value.showPwd ? <FaEyeSlash /> : <FaEye />}
            </Button>
            <Form.Control.Feedback type="invalid">Use ≥8 chars, include uppercase, number, special char.</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type={value.showPwd ? "text" : "password"}
            value={value.confirm}
            onChange={(e) => onChange("confirm", e.target.value)}
            isInvalid={Boolean(value.confirm) && !confirmOk}
            required
          />
          <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Secret question</Form.Label>
          <Form.Select value={value.question} onChange={(e) => onChange("question", e.target.value)} required>
            <option value="">-- Select a question --</option>
            {questions.map((q) => <option key={q} value={q}>{q}</option>)}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Answer</Form.Label>
          <Form.Control type="text" value={value.answer} onChange={(e) => onChange("answer", e.target.value)} required />
        </Form.Group>
      </Row>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onPrev}>Previous</Button>
        <Button type="button" variant={allOk ? "success" : "secondary"} onClick={onNext} disabled={!allOk}>Next</Button>
      </div>
    </Form>
  );
}

AccountForm.propTypes = {
  value: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    showPwd: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  setValid: PropTypes.func.isRequired,
  toggleShowPwd: PropTypes.func.isRequired
};
export default AccountForm;