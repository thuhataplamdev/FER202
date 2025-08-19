import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import FormWrapper from "./components/FormWrapper";

function App() {
  return (
    <Container className="mt-4">
      <h2 className="text-center">Bài tập Form Validation</h2>
      <FormWrapper />
    </Container>
  );
}

export default App;
