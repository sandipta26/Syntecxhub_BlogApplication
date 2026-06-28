# 📝 Blog Application

A simple yet elegant MERN stack blog application with authentication, image uploads, and a rich text editor.

## Features

✨ **User Authentication** - Secure registration and login with JWT tokens  
✏️ **Create & Edit Posts** - Write posts with a rich text editor (Quill.js)  
📸 **Image Support** - Add featured images to your posts  
🗑️ **Manage Posts** - Edit and delete your own posts  
📱 **Responsive Design** - Beautiful UI that works on all devices  
🎨 **Clean UI** - Minimal and modern design using Lucide icons  

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Quill** - Rich text editor
- **Lucide React** - Icons

## Project Structure

```
blog-application/
├── server/                 # Backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth middleware
│   ├── server.js          # Express app setup
│   └── package.json
├── client/                # Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── package.json           # Root package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Configure Environment Variables

Create `.env` file in the `server/` directory:

```
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Start the Application

**Development mode (both client & server):**
```bash
npm run dev
```

**Or start separately:**
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth, owner only)
- `DELETE /api/posts/:id` - Delete post (requires auth, owner only)

## Usage

1. **Sign Up** - Create a new account
2. **Login** - Sign in with your credentials
3. **Create Post** - Click the "Write" button to create a new post
4. **Edit Post** - Click the edit button on your posts
5. **Delete Post** - Click the delete button on your posts
6. **View Posts** - Browse all posts on the home page

## Features in Detail

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Token stored in localStorage
- Protected routes for authenticated users

### Post Management
- Create posts with title, content, and featured image
- Rich text editor (Quill.js) for formatting
- Edit and delete your own posts
- View all posts with author information
- Responsive post cards with image support

### UI/UX
- Sticky navigation bar
- Error and success messages
- Loading states
- Empty state for no posts
- Responsive design for mobile and desktop
- Smooth animations and transitions

## Future Enhancements

- Comments and likes on posts
- Search and filter functionality
- Tags and categories
- User profiles and follow system
- Post scheduling
- Analytics dashboard
- Email notifications
- Social sharing

## License

MIT License - Feel free to use this project for learning or as a starter template.

## Support

For issues or questions, please open an issue in the repository.

---

**Happy blogging! 📝✨**
