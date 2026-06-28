import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPost, getCategories } from "../utils/storage";
import { getCurrentUser } from "../utils/auth";
import "./CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Technology",
    tags: "",
    image: "",
    author: { name: "", bio: "" },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  if (!user) {
    return null;
  }

  const categories = getCategories();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("author.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        author: { ...formData.author, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.excerpt.trim()) {
      setError("Excerpt is required");
      return;
    }
    if (!formData.content.trim()) {
      setError("Content is required");
      return;
    }

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const newPost = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      tags: tags.length > 0 ? tags : ["General"],
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&q=60",
      author: { name: user.name, bio: user.bio },
      userId: user.id,
      readingTime: Math.ceil(formData.content.split(" ").length / 200),
    };

    try {
      const post = addPost(newPost);
      setSuccess("Post created successfully! Redirecting...");
      setTimeout(() => {
        navigate(`/post/${post.id}`);
      }, 1500);
    } catch (err) {
      setError("Failed to create post");
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h1>
          <i className="fas fa-pen-fancy"></i> Create New Post
        </h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. React, JavaScript, Web"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of your post..."
              rows="3"
              className="form-input"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Cover Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="form-input"
            />
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here. You can use basic HTML tags."
              rows="12"
              className="form-input"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-paper-plane"></i> Publish Post
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
