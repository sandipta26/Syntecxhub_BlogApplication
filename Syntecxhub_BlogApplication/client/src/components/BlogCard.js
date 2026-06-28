import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

function BlogCard({ post }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <article className="blog-card">
      {/* Image */}
      <div className="blog-card-image">
        <img src={post.image} alt={post.title} loading="lazy" />
        <div className="card-category">
          <span className="category-badge">{post.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="blog-card-content">
        <h3 className="blog-card-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h3>

        <p className="blog-card-excerpt">{post.excerpt}</p>

        {/* Meta Info */}
        <div className="blog-card-meta">
          <span className="meta-item">
            <i className="fas fa-user"></i>
            <span className="author-name">{post.author.name}</span>
          </span>
          <span className="meta-item">
            <i className="fas fa-calendar"></i>
            {formatDate(post.createdAt)}
          </span>
          <span className="meta-item">
            <i className="fas fa-clock"></i>
            {post.readingTime} min read
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="blog-card-tags">
            {post.tags.slice(0, 2).map((tag, index) => (
              <Link
                key={index}
                to={`/tag/${tag}`}
                className="tag"
              >
                #{tag}
              </Link>
            ))}
            {post.tags.length > 2 && (
              <span className="tag-more">+{post.tags.length - 2}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="blog-card-footer">
          <Link to={`/post/${post.id}`} className="read-more">
            Read Article
            <i className="fas fa-arrow-right"></i>
          </Link>
          <span className="views">
            <i className="fas fa-eye"></i> {post.views}
          </span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
