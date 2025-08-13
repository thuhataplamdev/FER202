import { Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes, onAddFav, favs }) {
  return (
    <Row>
      {recipes.map((r, idx) => (
        <Col key={idx} xs={12} sm={6} lg={4} className="mb-4">
          <RecipeCard recipe={r} onAddFav={onAddFav} isFaved={favs?.has(r.title)} />
        </Col>
      ))}
    </Row>
  );
}
