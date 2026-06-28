import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, getCategories } from "../utils/storage";
import BlogCard from "../components/BlogCard";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize data
    const allPosts = getPosts();
    const allCategories = getCategories();

    setPosts(allPosts);
    setCategories(allCategories);
    setFilteredPosts(allPosts);
    setLoading(false);
  }, []);

  // Filter posts by category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === category));
    }
  };

  const featuredPosts = filteredPosts.slice(0, 2);
  const otherPosts = filteredPosts.slice(2);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BlogHub</h1>
          <p>
            Discover insightful articles, expert tips, and inspiring stories
            from writers worldwide
          </p>
          <Link to="/create" className="btn btn-primary btn-lg">
            <i className="fas fa-pen-nib"></i> Start Writing
          </Link>
        </div>
        <div className="hero-background">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-star"></i> Featured Articles
              </h2>
              <p>Must-read stories from our community</p>
            </div>

            <div className="featured-grid">
              {featuredPosts.map((post) => (
                <article key={post.id} className="featured-post">
                  <Link to={`/post/${post.id}`} className="featured-image">
                    <img src={post.image} alt={post.title} />
                  </Link>
                  <div className="featured-content">
                    <Link
                      to={`/category/${post.category}`}
                      className="featured-category"
                    >
                      {post.category}
                    </Link>
                    <h3>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="featured-excerpt">{post.excerpt}</p>
                    <div className="featured-meta">
                      <span>
                        <i className="fas fa-user"></i> {post.author.name}
                      </span>
                      <span>
                        <i className="fas fa-calendar"></i>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="category-section">
        <div className="container">
          <div className="category-header">
            <h2>Browse by Category</h2>
            <p>Find articles in your areas of interest</p>
          </div>

          <div className="category-list">
            <button
              className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => handleCategoryFilter("All")}
            >
              <i className="fas fa-th"></i> All Posts
              <span className="count">{posts.length}</span>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryFilter(category)}
              >
                <i className="fas fa-folder"></i> {category}
                <span className="count">
                  {posts.filter((p) => p.category === category).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="articles-section">
        <div className="container">
          <div className="section-header">
            <h2>
              {selectedCategory === "All"
                ? "All Articles"
                : `${selectedCategory} Articles`}
            </h2>
            <p>{filteredPosts.length} articles found</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <h3>No articles found</h3>
              <p>Be the first to contribute to this category</p>
              <Link to="/create" className="btn btn-primary">
                <i className="fas fa-pen-nib"></i> Write Article
              </Link>
            </div>
          ) : (
            <>
              <div className="articles-grid">
                {otherPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {filteredPosts.length > 6 && (
                <div className="pagination">
                  <button className="btn btn-secondary">
                    <i className="fas fa-chevron-left"></i> Previous
                  </button>
                  <div className="page-numbers">
                    <button className="page-btn active">1</button>
                    {Math.ceil(filteredPosts.length / 6) > 1 && (
                      <>
                        <button className="page-btn">2</button>
                        {Math.ceil(filteredPosts.length / 6) > 2 && (
                          <button className="page-btn">3</button>
                        )}
                      </>
                    )}
                  </div>
                  <button className="btn btn-secondary">
                    Next <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container-sm">
          <h2>Ready to Share Your Story?</h2>
          <p>
            Join thousands of writers sharing their knowledge, experiences, and
            expertise
          </p>
          <Link to="/create" className="btn btn-primary btn-lg">
            <i className="fas fa-pen-fancy"></i> Write Your First Article
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{posts.length}</div>
              <p>Articles Published</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {new Set(posts.map((p) => p.author.name)).size}
              </div>
              <p>Active Authors</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">{categories.length}</div>
              <p>Categories</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {posts.reduce((sum, p) => sum + (p.views || 0), 0)}
              </div>
              <p>Total Views</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
