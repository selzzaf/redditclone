/**
 * Authentication Middleware
 * 
 * JWT-based authentication middleware for protecting routes
 * Verifies JWT tokens and attaches user information to request object
 * Supports optional authentication for routes that can work with or without auth
 * 
 * @author Reddit Clone Team
 * @version 1.0.0
 */

const jwt = require('jsonwebtoken')        // JSON Web Token library
const { query } = require('../db')         // Database query interface

/**
 * Authentication middleware factory
 * @param {boolean} optional - Whether authentication is optional (default: false)
 * @returns {Function} - Express middleware function
 */
module.exports = (optional = false) => async (req, res, next) => {
  try {
    // Extract JWT token from Authorization header
    // Format: "Bearer <token>"
    const token = req.get('Authorization').replace('Bearer ', '')
    
    // Verify JWT token and extract user ID from payload
    const { id } = await jwt.verify(token, process.env.JWT_SECRET)
    
    // Fetch user from database using the ID from token
    const { rows: [user] } = await query('select * from users where id = $1', [id])
    
    // Check if the token is still valid (exists in user's token list)
    // This allows for token invalidation on logout
    if (!user.tokens.includes(token)) {
      throw new Error('Token not found in user tokens')
    }
    
    // Attach user and token to request object for use in route handlers
    req.user = user
    req.token = token
    
  } catch (e) {
    // If authentication is required and failed, return 401 error
    if (!optional) {
      return res.status(401).send({ error: 'Please authenticate' })
    }
    // If authentication is optional and failed, continue without user data
  }
  
  // Continue to next middleware or route handler
  next()
}