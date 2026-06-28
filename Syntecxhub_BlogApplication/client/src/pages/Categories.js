import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories, getPostsByCategory } from "../utils/storage";
import BlogCard from "../components/BlogCard";
import "./Categories.css";

function Categories() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(name || null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const allCategories = getCategories();
    setCategories(allCategories);

    if (name) {
      setSelectedCategory(name);
    } else if (!selectedCategory && allCategories.length > 0) {
      setSelectedCategory(allCategories[0]);
    }
  }, [name, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      const categoryPosts = getPostsByCategory(selectedCategory);
      setPosts(categoryPosts);
    }
  }, [selectedCategory]);

  const getCategoryPostCount = (category) => {
    return getPostsByCategory(category).length;
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      Technology: "fa-laptop-code",
      Lifestyle: "fa-heart",
      Business: "fa-briefcase",
      Travel: "fa-globe",
      Food: "fa-utensils",
      Health: "fa-heartbeat",
      Education: "fa-book",
      Entertainment: "fa-film",
    };
    return iconMap[category] || "fa-folder";
  };

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>
          <i className="fas fa-list"></i> Blog Categories
        </h1>
        <p>Explore our content organized by topic</p>
      </div>

      <div className="categories-container">
        <aside className="categories-sidebar">
          <h3>Categories</h3>
          <div className="category-list">
            {categories.map((category) => (
              <div
                key={category}
                className={`category-item ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="category-info">
                  <i className={`fas ${getCategoryIcon(category)}`}></i>
                  <span className="category-name">{category}</span>
                </div>
                <span className="category-count">
                  {getCategoryPostCount(category)}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <main className="categories-main">
          {selectedCategory && (
            <>
              <div className="category-header-section">
                <h2>
                  <i className={`fas ${getCategoryIcon(selectedCategory)}`}></i>
                  {selectedCategory}
                </h2>
                <p>{posts.length} articles in this category</p>
              </div>

              {posts.length > 0 ? (
                <div className="posts-grid">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-inbox"></i>
                  <h3>No posts yet</h3>
                  <p>There are no posts in this category.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/create")}
                  >
                    <i className="fas fa-plus"></i> Create First Post
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Categories;
