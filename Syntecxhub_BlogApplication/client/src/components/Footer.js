import React, { useState } from 'react';
import { subscribeEmail } from '../utils/storage';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [subscribeError, setSubscribeError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeError('');
    setSubscribeMessage('');

    if (!email) {
      setSubscribeError('Please enter your email');
      return;
    }

    const result = subscribeEmail(email);
    if (result.success) {
      setSubscribeMessage('✓ Successfully subscribed!');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 3000);
    } else {
      setSubscribeError(result.message);
      setTimeout(() => setSubscribeError(''), 3000);
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container-sm">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest articles delivered to your inbox every week</p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="form-group mb-0">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-paper-plane"></i> Subscribe
              </button>
            </div>
            {subscribeMessage && (
              <p className="success-message">{subscribeMessage}</p>
            )}
            {subscribeError && (
              <p className="error-message">{subscribeError}</p>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-section">
              <h3>
                <i className="fas fa-pen-nib"></i> BlogHub
              </h3>
              <p>
                A modern blogging platform for sharing ideas, stories, and expertise with the world. Start your blogging journey today.
              </p>
              <div className="social-links">
                <a href="#facebook" title="Facebook" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#twitter" title="Twitter" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#instagram" title="Instagram" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#linkedin" title="LinkedIn" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/create">Write Article</a></li>
                <li><a href="/about">About Us</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h4>Popular Categories</h4>
              <ul>
                <li><a href="/category/Technology">Technology</a></li>
                <li><a href="/category/Lifestyle">Lifestyle</a></li>
                <li><a href="/category/Business">Business</a></li>
                <li><a href="/category/Health">Health</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#sitemap">Sitemap</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2024 BlogHub. All rights reserved.</p>
            <p>Made with <i className="fas fa-heart" style={{color: 'var(--accent)'}}></i> by Your Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
