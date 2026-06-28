import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/auth';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    try {
      const result = loginUser(formData.email, formData.password);

      if (result.success) {
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials display
  const demoCredentials = [
    { email: 'sarah@example.com', password: 'password123' },
    { email: 'emma@example.com', password: 'password123' },
    { email: 'john@example.com', password: 'password123' }
  ];

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <i className="fas fa-sign-in-alt"></i>
            <h1>Login to BlogHub</h1>
            <p>Welcome back! Sign in to your account</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> Login
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or</span>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="demo-section">
            <h3><i className="fas fa-info-circle"></i> Demo Credentials</h3>
            <p className="demo-note">Try logging in with these test accounts:</p>
            <div className="demo-list">
              {demoCredentials.map((cred, idx) => (
                <div key={idx} className="demo-item">
                  <code>{cred.email}</code>
                  <code>{cred.password}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="auth-side">
          <div className="auth-illustration">
            <i className="fas fa-lock-open"></i>
          </div>
          <h2>Welcome Back!</h2>
          <p>Access your BlogHub account and start writing amazing posts.</p>
          <ul className="auth-benefits">
            <li><i className="fas fa-check-circle"></i> Create and publish posts</li>
            <li><i className="fas fa-check-circle"></i> Manage your content</li>
            <li><i className="fas fa-check-circle"></i> Edit and delete posts</li>
            <li><i className="fas fa-check-circle"></i> Engage with readers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
