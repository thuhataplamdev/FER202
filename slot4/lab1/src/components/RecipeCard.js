import { Card, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function RecipeCard({ recipe, onAddFav, isFaved }) {
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

          <div className="d-flex gap-2">
            <Button
              variant="outline-success"
              className="btn-cta"
              onClick={() => onAddFav?.(recipe.title)}
            >
              {isFaved ? <AiFillHeart className="me-1" /> : <AiOutlineHeart className="me-1" />}
              Add to Favourite
            </Button>
            <Button variant="primary" className="btn-cta" onClick={() => setShow(true)}>
              View Recipe
            </Button>
          </div>
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
          <Button variant="success" onClick={() => onAddFav?.(recipe.title)}>Add to Favourite</Button>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
