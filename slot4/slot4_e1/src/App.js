import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";

export default function App() {
  return (
    <>
      <AppNavbar />
      <main>
        <Container className="pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}
