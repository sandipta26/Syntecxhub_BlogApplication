// LocalStorage utility for managing blog data

const STORAGE_KEYS = {
  POSTS: "bloghub_posts",
  USER: "bloghub_user",
  COMMENTS: "bloghub_comments",
  CATEGORIES: "bloghub_categories",
  SUBSCRIBERS: "bloghub_subscribers",
};

// Initialize default categories
const DEFAULT_CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Business",
  "Travel",
  "Food",
  "Health",
  "Education",
  "Entertainment",
];

// Sample posts with all required fields
const SAMPLE_POSTS = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence in 2024",
    excerpt:
      "Exploring how AI is reshaping industries and creating new opportunities for innovation.",
    content:
      "<h2>Introduction</h2><p>Artificial Intelligence has become one of the most transformative technologies of our time. In this comprehensive guide, we explore the trends, challenges, and opportunities that lie ahead.</p><h2>Key Trends</h2><p>From machine learning to neural networks, AI continues to evolve rapidly. Organizations worldwide are investing heavily in AI research and development.</p><h2>Conclusion</h2><p>The future of AI is bright, with endless possibilities for innovation and improvement.</p>",
    author: { name: "Sarah Tech", bio: "AI enthusiast and tech blogger" },
    category: "Technology",
    tags: ["AI", "Machine Learning", "Future Tech"],
    image:
      "https://images.unsplash.com/photo-1677442d019e157be52e1cbb41897933?w=800&h=500&fit=crop",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 8,
    views: 1250,
  },
  {
    id: "2",
    title: "Healthy Living: 10 Tips for Better Wellness",
    excerpt:
      "Simple lifestyle changes that can significantly impact your health and happiness.",
    content:
      "<h2>Introduction</h2><p>Achieving better health starts with small, sustainable changes to your daily routine. Here are 10 proven tips that can transform your wellbeing.</p><h2>Physical Health</h2><p>Regular exercise, proper nutrition, and adequate sleep are fundamental pillars of good health.</p><h2>Mental Wellness</h2><p>Mental health is just as important as physical health. Practice mindfulness, meditation, and stress management techniques.</p><h2>Conclusion</h2><p>Start implementing these tips today and notice the positive changes in your life.</p>",
    author: { name: "Emma Wellness", bio: "Health and wellness expert" },
    category: "Health",
    tags: ["Health", "Wellness", "Lifestyle"],
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop&q=60",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 6,
    views: 890,
  },
  {
    id: "3",
    title: "Digital Marketing Strategies for Small Businesses",
    excerpt:
      "Practical approaches to grow your online presence and attract more customers.",
    content:
      "<h2>Introduction</h2><p>Small businesses need smart marketing strategies to compete in the digital landscape. Learn effective techniques that deliver results.</p><h2>Social Media Marketing</h2><p>Leverage platforms like Instagram, Facebook, and LinkedIn to reach your target audience.</p><h2>Content Marketing</h2><p>Create valuable content that educates and engages your audience, building trust and authority.</p><h2>Conclusion</h2><p>With the right strategies, even small businesses can achieve remarkable growth.</p>",
    author: { name: "John Business", bio: "Digital marketing consultant" },
    category: "Business",
    tags: ["Marketing", "Business", "Digital"],
    image:
      "https://images.unsplash.com/photo-1460925895917-adf4e565e479?w=800&h=500&fit=crop&q=60",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 10,
    views: 1540,
  },
  {
    id: "4",
    title: "Top Travel Destinations You Must Visit This Year",
    excerpt:
      "Discover breathtaking locations around the world perfect for your next adventure.",
    content:
      "<h2>Introduction</h2><p>Travel enriches our lives with new experiences and perspectives. Here are the top destinations to add to your bucket list.</p><h2>Europe</h2><p>From the romantic streets of Paris to the historic ruins of Rome, Europe offers unforgettable experiences.</p><h2>Asia</h2><p>Explore the vibrant cultures, stunning landscapes, and delicious cuisines of Asian countries.</p><h2>Conclusion</h2><p>Start planning your adventure today and create memories that last a lifetime.</p>",
    author: { name: "Lisa Adventure", bio: "Travel blogger and explorer" },
    category: "Travel",
    tags: ["Travel", "Adventure", "Destinations"],
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop&q=60",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 7,
    views: 2100,
  },
  {
    id: "5",
    title: "Web Development Best Practices in 2024",
    excerpt: "Modern techniques and tools every developer should know.",
    content:
      "<h2>Introduction</h2><p>Web development is constantly evolving. Stay updated with the latest best practices and technologies.</p><h2>Frontend Development</h2><p>Modern JavaScript frameworks like React, Vue, and Angular continue to dominate the landscape.</p><h2>Backend Development</h2><p>APIs, microservices, and cloud computing are reshaping how we build applications.</p><h2>Conclusion</h2><p>Continuous learning is essential to stay ahead in web development.</p>",
    author: { name: "Dev Master", bio: "Full-stack developer and mentor" },
    category: "Technology",
    tags: ["Web Development", "Programming", "Best Practices"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&q=60",
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 9,
    views: 1680,
  },
  {
    id: "6",
    title: "The Art of Food Photography",
    excerpt: "Techniques to make your food photos look restaurant-worthy.",
    content:
      "<h2>Introduction</h2><p>Food photography is an art form that requires skill, creativity, and the right techniques.</p><h2>Lighting</h2><p>Natural light is your best friend. Shoot near windows for the most flattering results.</p><h2>Composition</h2><p>Use the rule of thirds and experiment with different angles to create compelling images.</p><h2>Conclusion</h2><p>With practice and patience, anyone can become a great food photographer.</p>",
    author: { name: "Chef Photographer", bio: "Food blogger and photographer" },
    category: "Food",
    tags: ["Photography", "Food", "Lifestyle"],
    image:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=500&fit=crop&q=60",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    views: 950,
  },
];

// Initialize storage
export const initializeStorage = () => {
  // Check if posts already exist
  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(SAMPLE_POSTS));
  }

  // Check if categories already exist
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(
      STORAGE_KEYS.CATEGORIES,
      JSON.stringify(DEFAULT_CATEGORIES),
    );
  }

  // Initialize empty comments and subscribers if not present
  if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify([]));
  }
};

// Post operations
export const getPosts = () => {
  const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
  return posts ? JSON.parse(posts) : [];
};

export const getPostById = (id) => {
  const posts = getPosts();
  return posts.find((post) => post.id === id);
};

export const addPost = (post) => {
  const posts = getPosts();
  const newPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
  };
  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  return newPost;
};

export const updatePost = (id, updatedData) => {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts[index] = {
      ...posts[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return posts[index];
  }
  return null;
};

export const deletePost = (id) => {
  const posts = getPosts();
  const filtered = posts.filter((post) => post.id !== id);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(filtered));
  return true;
};

export const incrementPostViews = (id) => {
  const post = getPostById(id);
  if (post) {
    post.views = (post.views || 0) + 1;
    updatePost(id, { views: post.views });
  }
};

// Comment operations
export const getComments = (postId) => {
  const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
  const allComments = comments ? JSON.parse(comments) : [];
  return allComments.filter((comment) => comment.postId === postId);
};

export const addComment = (postId, comment) => {
  const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
  const allComments = comments ? JSON.parse(comments) : [];
  const newComment = {
    id: Date.now().toString(),
    postId,
    ...comment,
    createdAt: new Date().toISOString(),
  };
  allComments.push(newComment);
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
  return newComment;
};

export const deleteComment = (commentId) => {
  const comments = localStorage.getItem(STORAGE_KEYS.COMMENTS);
  const allComments = comments ? JSON.parse(comments) : [];
  const filtered = allComments.filter((comment) => comment.id !== commentId);
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(filtered));
  return true;
};

// Category operations
export const getCategories = () => {
  const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return categories ? JSON.parse(categories) : DEFAULT_CATEGORIES;
};

export const getPostsByCategory = (category) => {
  const posts = getPosts();
  return posts.filter((post) => post.category === category);
};

// Search operations
export const searchPosts = (query) => {
  const posts = getPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
};

// Email subscription
export const subscribeEmail = (email) => {
  const subscribers = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
  const allSubscribers = subscribers ? JSON.parse(subscribers) : [];

  // Check if already subscribed
  if (allSubscribers.some((sub) => sub.email === email)) {
    return { success: false, message: "Already subscribed" };
  }

  allSubscribers.push({
    email,
    subscribedAt: new Date().toISOString(),
  });

  localStorage.setItem(
    STORAGE_KEYS.SUBSCRIBERS,
    JSON.stringify(allSubscribers),
  );
  return { success: true, message: "Subscribed successfully" };
};

export const getSubscribers = () => {
  const subscribers = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
  return subscribers ? JSON.parse(subscribers) : [];
};

// User operations (for future auth)
export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};
