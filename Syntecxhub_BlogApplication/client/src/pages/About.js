import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1><i className="fas fa-info-circle"></i> About BlogHub</h1>
      </div>

      <div className="about-container">
        <section className="about-section">
          <div className="about-content">
            <h2>Welcome to BlogHub</h2>
            <p>
              BlogHub is a modern, user-friendly blogging platform designed to help writers,
              entrepreneurs, and enthusiasts share their ideas with the world. Whether you're
              passionate about technology, lifestyle, business, or any other topic, BlogHub
              provides the perfect space to publish and engage with your audience.
            </p>
          </div>
          <div className="about-image">
            <div className="placeholder-image">
              <i className="fas fa-blog"></i>
            </div>
          </div>
        </section>

        <section className="about-section reversed">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              We believe that everyone has a story to tell and valuable insights to share.
              BlogHub's mission is to democratize content publishing by providing a simple,
              elegant, and powerful platform that requires no technical expertise. We're
              committed to fostering a vibrant community of writers and readers.
            </p>
          </div>
          <div className="about-image">
            <div className="placeholder-image">
              <i className="fas fa-rocket"></i>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2>Why Choose BlogHub?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-pencil-alt"></i>
              <h3>Easy to Write</h3>
              <p>Intuitive editor makes creating and publishing posts effortless.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-folder-open"></i>
              <h3>Organized Content</h3>
              <p>Categorize and tag your posts for better discoverability.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-comments"></i>
              <h3>Community Engagement</h3>
              <p>Readers can comment and interact with your content directly.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-share-alt"></i>
              <h3>Social Sharing</h3>
              <p>Easily share posts across social media platforms.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-search"></i>
              <h3>Powerful Search</h3>
              <p>Help readers find exactly what they're looking for.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-bell"></i>
              <h3>Email Newsletter</h3>
              <p>Build an audience with email subscriptions.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-content">
            <h2>Get Started Today</h2>
            <p>
              Ready to share your voice with the world? Start creating posts right now
              and build your audience. No sign-up required, just start writing and let
              your ideas flourish.
            </p>
            <div className="cta-buttons">
              <a href="/create" className="btn btn-primary">
                <i className="fas fa-pen"></i> Write Your First Post
              </a>
              <a href="/" className="btn btn-secondary">
                <i className="fas fa-home"></i> Back to Home
              </a>
            </div>
          </div>
          <div className="about-image">
            <div className="placeholder-image">
              <i className="fas fa-star"></i>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
