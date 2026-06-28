// Authentication utility using localStorage

const AUTH_KEY = "bloghub_auth_user";

// User registration
export const registerUser = (userData) => {
  const users = getAllUsers();

  // Check if email already exists
  if (users.some((user) => user.email === userData.email)) {
    return { success: false, message: "Email already registered" };
  }

  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    bio: userData.bio || "",
    avatar:
      userData.avatar ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=60",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("bloghub_users", JSON.stringify(users));

  // Auto login after registration
  setCurrentUser(newUser);

  return { success: true, message: "Registration successful", user: newUser };
};

// User login
export const loginUser = (email, password) => {
  const users = getAllUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { success: false, message: "Email not found" };
  }

  // Verify password (simple comparison for this demo)
  if (!user.password || user.password !== password) {
    return { success: false, message: "Incorrect password" };
  }

  setCurrentUser(user);
  return { success: true, message: "Login successful", user };
};

// Get current logged in user
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

// Set current user
export const setCurrentUser = (user) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Get all users (for admin/demo purposes)
export const getAllUsers = () => {
  const users = localStorage.getItem("bloghub_users");
  return users ? JSON.parse(users) : [];
};

// Get user by ID
export const getUserById = (id) => {
  const users = getAllUsers();
  return users.find((user) => user.id === id);
};

// Update user profile
export const updateUserProfile = (userId, updates) => {
  const users = getAllUsers();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return { success: false, message: "User not found" };
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    id: users[userIndex].id,
    createdAt: users[userIndex].createdAt,
  };

  localStorage.setItem("bloghub_users", JSON.stringify(users));

  // Update current user if logged in
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[userIndex]);
  }

  return { success: true, message: "Profile updated", user: users[userIndex] };
};

// Initialize default users (for demo)
export const initializeAuth = () => {
  if (!localStorage.getItem("bloghub_users")) {
    const defaultUsers = [
      {
        id: "1",
        name: "Sarah Tech",
        email: "sarah@example.com",
        password: "password123",
        bio: "AI enthusiast and tech blogger",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=60",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Emma Wellness",
        email: "emma@example.com",
        password: "password123",
        bio: "Health and wellness expert",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=60",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "John Business",
        email: "john@example.com",
        password: "password123",
        bio: "Digital marketing consultant",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=60",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("bloghub_users", JSON.stringify(defaultUsers));
  }
};
