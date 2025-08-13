import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import RequestForm from "./pages/RequestForm";

export default function App() {
  const [favs, setFavs] = useState(new Set());
  const [toast, setToast] = useState({ show: false, msg: "" });

  const addToFav = (key) => {
    setFavs(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
    setToast({ show: true, msg: "Added to favourites" });
  };

  return (
    <>
      <AppNavbar favCount={favs.size} />
      <main>
        <Container className="pb-5">
          <Routes>
            <Route path="/" element={<Home onAddFav={addToFav} favs={favs} />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<Recipes onAddFav={addToFav} favs={favs} />} />
            <Route path="/request" element={<RequestForm />} />
          </Routes>
        </Container>
      </main>
      <Footer />

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          delay={5000}
          autohide
        >
          <Toast.Body className="text-white">{toast.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
