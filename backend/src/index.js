/**
 * Reddit Clone - Backend Server
 * 
 * Main entry point for the Express.js API server
 * Handles routing, middleware setup, and server initialization
 * 
 * @author Reddit Clone Team
 * @version 1.0.0
 */

const express = require('express')
const cors = require('cors')

// Import route handlers for different API endpoints
const usersRouter = require('./routers/users')
const postsRouter = require('./routers/posts')
const subredditsRouter = require('./routers/subreddits')
const moderatorsRouter = require('./routers/moderators')
const commentsRouter = require('./routers/comments')
const votesRouter = require('./routers/votes')

// Server configuration
const port = process.env.PORT || 3001

// Initialize Express application
const app = express()

// Middleware Configuration
// Enable CORS for cross-origin requests (needed for frontend-backend communication)
app.use(cors())

// Parse JSON request bodies
app.use(express.json())

// API Routes Configuration
// Mount different route handlers at their respective endpoints
app.use('/users', usersRouter)        // User authentication and management
app.use('/posts', postsRouter)        // Post CRUD operations
app.use('/subreddits', subredditsRouter)  // Subreddit management
app.use('/moderators', moderatorsRouter)  // Moderator operations
app.use('/comments', commentsRouter)   // Comment management
app.use('/votes', votesRouter)        // Voting system

// Health check and API status endpoints
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Reddit Clone API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Reddit Clone API server is running on port ${port}`)
  console.log(`📚 API Documentation available at http://localhost:${port}/api`)
})
