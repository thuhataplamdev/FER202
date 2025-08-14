import React from "react";
import { Card, Button } from "react-bootstrap";

export default function StudentCard({ student = {} }) {
  const { name = "Unknown", age = "N/A", avatar } = student;

  return (
    <Card style={{ width: "18rem" }} className="mb-4 student-card">
      <Card.Img
        variant="top"
        src={avatar}
        alt={`${name}'s avatar`}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Age: {age}</Card.Text>
        <Button variant="primary">Edit</Button>
      </Card.Body>
    </Card>
  );
}
