import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../utils/auth";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.searchInput.value;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* LEFT: Logo + Search */}
          <div className="navbar-left">
            <Link to="/" className="navbar-brand">
              <i className="fas fa-pen-nib"></i>
              <span>BlogHub</span>
            </Link>

            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="search"
                name="searchInput"
                placeholder="Search articles..."
                className="search-input"
              />
              <button type="submit" className="search-btn" aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* CENTER: Nav Links */}
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-home"></i> Home
            </Link>

            <Link
              to="/categories"
              className={`nav-link ${location.pathname === "/categories" ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-folder"></i> Categories
            </Link>

            <Link
              to="/about"
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-info-circle"></i> About
            </Link>

            <Link
              to="/contact"
              className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-envelope"></i> Contact
            </Link>
          </div>

          {/* RIGHT: Auth */}
          <div className="nav-right">
            {user ? (
              <div className="nav-auth">
                <span className="nav-user">{user.name}</span>
                <Link to="/create" className="btn btn-primary">
                  <i className="fas fa-plus"></i> Write
                </Link>
                <button className="btn btn-logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <div className="nav-auth">
                <Link to="/login" className="btn btn-text">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  <i className="fas fa-user-plus"></i> Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="nav-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <form className="mobile-search" onSubmit={handleSearch}>
            <input
              type="search"
              name="searchInput"
              placeholder="Search articles..."
              autoFocus
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
