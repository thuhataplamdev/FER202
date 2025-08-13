import { Card, Button, Modal } from "react-bootstrap";
import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Card className="h-100 recipe-card">
        <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Prep:</strong> {recipe.prep} mins | <strong>Cook:</strong> {recipe.cook} mins</p>
          <Button variant="primary" className="btn-cta" onClick={() => setShow(true)}>View Recipe</Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{recipe.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{recipe.description}</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Prep Time:</strong> {recipe.prep} mins</p>
          <p><strong>Cook Time:</strong> {recipe.cook} mins</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => alert("Added to cart!")}>Add to Cart</Button>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
