import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import StudentsPage from "./pages/StudentsPage";
import ProfileWizardModal from "./components/modal/ProfileWizardModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export default function App() {
  const [quickQuery, setQuickQuery] = useState("");
  const [showWizard, setShowWizard] = useState(false);

  const openWizard = useCallback(() => setShowWizard(true), []);
  const closeWizard = useCallback(() => setShowWizard(false), []);

  return (
    <div>
      <Navbar
        quickQuery={quickQuery}
        onQuickQuery={setQuickQuery}
        onOpenProfile={openWizard}
      />
      <Hero />
      <StudentsPage initialQ={quickQuery} />
      <Footer />
      <ProfileWizardModal show={showWizard} onClose={closeWizard} />
    </div>
  );
}
