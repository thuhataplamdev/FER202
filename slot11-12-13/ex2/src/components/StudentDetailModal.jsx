import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Image } from "react-bootstrap";

export default function StudentDetailModal({ open, onClose, data }) {
  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {data?.avatar ? (
          <Image
            src={data.avatar}
            alt={`${data?.name} avatar`}
            fluid
            rounded
            className="mb-3"
            onError={(e) => { e.currentTarget.src = "/images/students/placeholder.jpg"; }}
          />
        ) : (
          <div className="text-muted mb-3">No Image</div>
        )}
        <div className="d-grid gap-1">
          <div><strong>ID:</strong> #{data?.id}</div>
          <div><strong>Name:</strong> {data?.name}</div>
          <div><strong>Email:</strong> {data?.email}</div>
          <div><strong>Age:</strong> {data?.age}</div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

StudentDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
    avatar: PropTypes.string,
  }),
};
