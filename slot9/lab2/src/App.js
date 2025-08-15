import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AppNavbar from "./components/AppNavbar";
import FreeMovies from "./pages/FreeMovies";
import Favourites from "./pages/Favourites";
import RequestForm from "./pages/RequestForm";

export default function App() {
  const location = useLocation();
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites") || "[]");
    } catch {
      return [];
    }
  });
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const favSet = useMemo(() => new Set(favourites), [favourites]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <AppNavbar
        favCount={favourites.length}
        onOpenRequestForm={() => setShowRequestForm(true)}
      />
      <div className="container pt-navbar">
        <Routes>
          <Route
            path="/"
            element={
              <FreeMovies
                favSet={favSet}
                onToggleFavourite={toggleFavourite}
                key={`${location.key}-free`}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                favSet={favSet}
                onToggleFavourite={toggleFavourite}
                key={`${location.key}-fav`}
              />
            }
          />
        </Routes>
      </div>

      <RequestForm
        show={showRequestForm}
        onHide={() => setShowRequestForm(false)}
      />
    </>
  );
}