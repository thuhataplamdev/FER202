import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import dishes from "./dishes";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dark, setDark] = React.useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });

  React.useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* NAVBAR */}
          <header className="topbar">
            <h1>Cart Demo</h1>
            <nav className="nav">
              <Link to="/">Home</Link>
              <Link to="/cart">Cart</Link>

              <input
                className="search"
                placeholder="Tìm món theo tên"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className="ghost" onClick={() => setDark((v) => !v)}>
                {dark ? "Light Mode" : "Dark Mode"}
              </button>
            </nav>
          </header>

          
          <main className="grid">
            <Routes>
              <Route
                path="/"
                element={<DishesList dishes={dishes} searchTerm={searchTerm} />}
              />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          <footer className="footer">© Cart Demo with Context</footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
