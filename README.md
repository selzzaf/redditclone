# Reddit Clone - Full Stack Application

A full-stack Reddit clone built with React.js frontend and Node.js/Express backend, featuring user authentication, post creation, voting, comments, and subreddit management.

## 🚀 Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Post Management**: Create, edit, delete posts with markdown support
- **Voting System**: Upvote/downvote posts and comments
- **Comments**: Threaded comments with voting
- **Subreddits**: Create and manage communities
- **Moderation**: Moderator roles and permissions
- **Responsive Design**: Modern UI with Chakra UI components
- **Real-time Updates**: Dynamic content updates

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Redux** - State management
- **Chakra UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
projetdev-reddit/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── routers/        # API route handlers
│   │   ├── middleware/     # Authentication middleware
│   │   ├── db/            # Database configuration
│   │   └── index.js       # Server entry point
│   ├── migrations/        # Database migrations
│   └── package.json
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── actions/       # Redux actions
│   │   ├── reducers/      # Redux reducers
│   │   ├── store/         # Redux store configuration
│   │   └── App.js         # Main application component
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v12.18.3 or higher)
- npm (v6.14.6 or higher)
- PostgreSQL database

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd projetdev-reddit/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `config/dev.env` file with your database credentials:
   ```bash
   # Copy the example file
   cp config/dev.env.example config/dev.env
   ```
   
   Then edit `config/dev.env` with your actual database credentials:
   ```
   PG_HOST=localhost
   PG_PORT=5432
   PG_DBNAME=reddit_clone
   PG_USER=your_username
   PG_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   ```

4. **Database Setup**
   ```bash
   # Run database migrations
   npm run db-migrate-dev up
   
   # Seed the database (optional)
   npm run prepare-test-data
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile

### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create new post
- `GET /posts/:id` - Get specific post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Comments
- `GET /comments/:postId` - Get comments for post
- `POST /comments` - Create new comment
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

### Subreddits
- `GET /subreddits` - Get all subreddits
- `POST /subreddits` - Create new subreddit
- `GET /subreddits/:id` - Get specific subreddit

### Voting
- `POST /votes` - Vote on post or comment

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Run database migrations: `npm run db-migrate -- up --env prod`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Built as a learning project for full-stack development

## 🙏 Acknowledgments

- Reddit for inspiration
- Chakra UI for the beautiful component library
- The React and Node.js communities 