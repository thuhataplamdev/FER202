import { Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }) {
  return (
    <Row>
      {recipes.map((r, idx) => (
        <Col key={idx} xs={12} sm={6} lg={4} className="mb-4">
          <RecipeCard recipe={r} />
        </Col>
      ))}
    </Row>
  );
}
