import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-home"></i> Back to Home
            </Link>
            <Link to="/categories" className="btn btn-secondary">
              <i className="fas fa-folder"></i> Browse Categories
            </Link>
          </div>

          <div className="not-found-suggestions">
            <h3>Helpful Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/create">Create Post</Link></li>
            </ul>
          </div>
        </div>
        <div className="not-found-illustration">
          <i className="fas fa-face-confused"></i>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
