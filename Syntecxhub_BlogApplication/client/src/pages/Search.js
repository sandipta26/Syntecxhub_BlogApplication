import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchPosts } from '../utils/storage';
import BlogCard from '../components/BlogCard';
import './Search.css';

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const found = searchPosts(query);
      setResults(found);
      setSearched(true);
    }
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1><i className="fas fa-search"></i> Search Results</h1>
        {searched && (
          <p>
            {results.length} result{results.length !== 1 ? 's' : ''} found
            {query && <span> for "<strong>{query}</strong>"</span>}
          </p>
        )}
      </div>

      <div className="search-container">
        {searched && results.length > 0 ? (
          <div className="search-results">
            {results.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : searched ? (
          <div className="empty-state">
            <i className="fas fa-search"></i>
            <h3>No posts found</h3>
            <p>Try searching with different keywords or browse by category.</p>
            <div className="empty-actions">
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                <i className="fas fa-home"></i> Back to Home
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/categories')}>
                <i className="fas fa-folder"></i> Browse Categories
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <i className="fas fa-magnifying-glass"></i>
            <h3>Start Searching</h3>
            <p>Use the search bar to find posts by title, content, or tags.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
