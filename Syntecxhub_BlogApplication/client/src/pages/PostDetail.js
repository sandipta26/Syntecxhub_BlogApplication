import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getPostById,
  getComments,
  addComment,
  deleteComment,
  incrementPostViews,
  getPosts,
  deletePost,
} from "../utils/storage";
import { getCurrentUser } from "../utils/auth";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const post = getPostById(id);
    const currentUser = getCurrentUser();

    if (post) {
      setPost(post);
      setIsAuthor(currentUser && currentUser.id === post.userId);
      incrementPostViews(id);

      const postComments = getComments(id);
      setComments(postComments);

      // Get related posts
      const allPosts = getPosts();
      const related = allPosts
        .filter((p) => p.category === post.category && p.id !== id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
    setLoading(false);
  }, [id, navigate]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!commentForm.name || !commentForm.email || !commentForm.content) {
      setSubmitStatus("Please fill in all fields");
      return;
    }

    const newComment = addComment(id, {
      author: commentForm.name,
      email: commentForm.email,
      text: commentForm.content,
    });

    setComments([...comments, newComment]);
    setCommentForm({ name: "", email: "", content: "" });
    setSubmitStatus("Comment posted successfully!");
    setTimeout(() => setSubmitStatus(""), 3000);
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  const handleDeletePost = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone.",
      )
    ) {
      deletePost(id);
      navigate("/");
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="empty-state">
          <i className="fas fa-file-slash"></i>
          <h3>Article not found</h3>
          <p>The article you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="post-detail">
      {/* Featured Image */}
      {post.image && (
        <div className="post-hero">
          <img src={post.image} alt={post.title} />
        </div>
      )}

      {/* Main Content */}
      <div className="post-main">
        <div className="container-sm">
          {/* Header */}
          <header className="post-header">
            <div className="post-category">
              <Link to={`/category/${post.category}`}>{post.category}</Link>
            </div>

            <h1 className="post-title">{post.title}</h1>

            <div className="post-meta">
              {isAuthor && (
                <div className="post-actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => navigate(`/edit/${id}`)}
                    style={{ display: "none" }}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button
                    style={{
                      background: "#dc3545",
                      color: "white",
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    onClick={handleDeletePost}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              )}
              <div className="meta-left">
                <span className="meta-item">
                  <i className="fas fa-user-circle"></i>
                  <strong>{post.author.name}</strong>
                  {post.author.bio && (
                    <span className="author-bio">{post.author.bio}</span>
                  )}
                </span>
                <span className="meta-item">
                  <i className="fas fa-calendar"></i>
                  {formatDate(post.createdAt)}
                </span>
                <span className="meta-item">
                  <i className="fas fa-clock"></i>
                  {post.readingTime} min read
                </span>
                <span className="meta-item">
                  <i className="fas fa-eye"></i>
                  {post.views} views
                </span>
              </div>

              {/* Social Sharing */}
              <div className="share-buttons">
                <button className="share-btn" title="Share on Facebook">
                  <i className="fab fa-facebook"></i>
                </button>
                <button className="share-btn" title="Share on Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="share-btn" title="Share on LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </button>
                <button className="share-btn" title="Copy Link">
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="post-body">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <Link key={index} to={`/tag/${tag}`} className="tag">
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Author Bio */}
          <div className="author-section">
            <h3>About the Author</h3>
            <div className="author-card">
              <div className="author-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="author-info">
                <h4>{post.author.name}</h4>
                <p>
                  {post.author.bio || "Passionate writer and content creator."}
                </p>
                <a href="#follow" className="btn btn-sm btn-secondary">
                  <i className="fas fa-user-plus"></i> Follow
                </a>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <section className="comments-section">
            <h2>
              <i className="fas fa-comments"></i> Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <div className="comment-form-container">
              <h3>Leave a Comment</h3>
              <form className="comment-form" onSubmit={handleCommentSubmit}>
                {submitStatus && (
                  <div className="form-status">{submitStatus}</div>
                )}

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={commentForm.name}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={commentForm.email}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <textarea
                    placeholder="Your comment..."
                    rows="5"
                    value={commentForm.content}
                    onChange={(e) =>
                      setCommentForm({
                        ...commentForm,
                        content: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-comment-dots"></i> Post Comment
                </button>
              </form>
            </div>

            {/* Comments List */}
            <div className="comments-list">
              {comments.length === 0 ? (
                <p className="no-comments">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-avatar">
                      <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <strong>{comment.author}</strong>
                        <span className="comment-date">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                      <button
                        className="comment-delete"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-posts">
          <div className="container">
            <h2>
              <i className="fas fa-bookmark"></i> Related Articles
            </h2>
            <div className="related-grid">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/post/${relatedPost.id}`}
                  className="related-item"
                >
                  <img src={relatedPost.image} alt={relatedPost.title} />
                  <h4>{relatedPost.title}</h4>
                  <p>{relatedPost.readingTime} min read</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="post-cta">
        <div className="container-sm">
          <h2>Ready to Write Your Own Article?</h2>
          <p>Share your knowledge and insights with our community</p>
          <Link to="/create" className="btn btn-primary btn-lg">
            <i className="fas fa-pen-nib"></i> Start Writing
          </Link>
        </div>
      </section>
    </article>
  );
}

export default PostDetail;
