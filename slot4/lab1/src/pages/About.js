import { Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <Row className="gy-3">
      <Col lg={8}>
        <h2>About</h2>
        <p>
          Healthy Recipes là bộ sưu tập các công thức nấu ăn đơn giản, tốt cho sức khỏe,
          phù hợp nhịp sống bận rộn. Mục tiêu: ít nguyên liệu, thao tác nhanh, dinh dưỡng cân đối.
        </p>
        <p>
          Bài tập này giúp bạn làm quen React-Bootstrap (Navbar, Grid, Card, Form, Modal)
          và các kỹ thuật lọc/tìm kiếm, debounce, cũng như responsive 1–2–3 cột.
        </p>
      </Col>
      <Col lg={4}>
        <div className="p-3 bg-light rounded">
          <h5 className="mb-2">Tech stack</h5>
          <ul className="mb-0">
            <li>React (CRA)</li>
            <li>React Router</li>
            <li>React-Bootstrap + Bootstrap</li>
          </ul>
        </div>
      </Col>
    </Row>
  );
}
