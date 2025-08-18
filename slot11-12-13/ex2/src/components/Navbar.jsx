import React from "react";
import PropTypes from "prop-types";

function Navbar({ quickQuery, onQuickQuery }) {
  return (
    <nav className="app-navbar">
      <div className="container app-navbar-inner">
        <a href="#home" className="brand">🎓 StudentSite</a>

        <ul className="nav-links">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#students">Students</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        <div className="quick">
          <span className="icon">🔍</span>
          <input
            value={quickQuery}
            onChange={(e) => onQuickQuery(e.target.value)}
            placeholder="Quick search..."
            aria-label="Quick search"
          />
        </div>
      </div>
    </nav>
  );
}
Navbar.propTypes = {
  quickQuery: PropTypes.string.isRequired,
  onQuickQuery: PropTypes.func.isRequired,
};
export default Navbar;
