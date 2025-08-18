import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import StudentsPage from "./pages/StudentsPage";
import "./index.css"; 

export default function App() {
  const [quickQuery, setQuickQuery] = useState("");
  return (
    <div>
      <Navbar quickQuery={quickQuery} onQuickQuery={setQuickQuery} />
      <Hero />
      <StudentsPage initialQ={quickQuery} />
      <Footer />
    </div>
  );
}
