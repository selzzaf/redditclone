/**
 * Users Router - Authentication and User Management
 * 
 * Handles user registration, login, logout, and profile management
 * Implements JWT-based authentication with secure password hashing
 * Provides user CRUD operations with proper authorization
 * 
 * @author Reddit Clone Team
 * @version 1.0.0
 */

const express = require('express')
const bcrypt = require('bcrypt')           // Password hashing library
const jwt = require('jsonwebtoken')        // JSON Web Token for authentication
const { query } = require('../db')         // Database query interface
const { updateTableRow } = require('../db/utils')  // Utility for updating table rows
const auth = require('../middleware/auth')()       // Authentication middleware

const router = express.Router()

/**
 * Remove sensitive information from user object before sending to client
 * @param {Object} user - User object from database
 * @returns {Object} - Sanitized user object without password and tokens
 */
const getPublicUser = (user) => {
  delete user.password
  delete user.tokens
  return user
}

/**
 * Generate JWT token and add it to user's token list
 * @param {number} userid - User ID
 * @returns {Object} - Object containing updated user and new token
 */
const addToken = async (userid) => {
  // Generate JWT token with user ID as payload
  const token = await jwt.sign({ id: userid }, process.env.JWT_SECRET)

  // Add token to user's token array in database
  const updateUserTokensStatement = `
    update users
    set tokens = tokens || $1
    where id = $2
    returning *
  `
  const { rows: [user] } = await query(updateUserTokensStatement, [[token], userid])
  return { user, token }
}

// GET /users - Get all users (public information only)
router.get('/', async (req, res) => {
  try {
    const { rows } = await query('select * from users')
    // Return only public user information (no passwords or tokens)
    res.send(rows.map((user) => getPublicUser(user)))
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

// GET /users/:id - Get specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const selectUserStatement = `select * from users where id = $1`

    const { rows: [user] } = await query(selectUserStatement, [id])

    if (!user) {
      return res.status(404).send({ error: 'Could not find user with that id' })
    }
    res.send(getPublicUser(user))
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

// POST /users - User registration
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body
    
    // Validate required fields
    if (!username) {
      throw new Error('Username is required')
    }
    if (!password) {
      throw new Error('Password is required')
    }
    
    // Hash password with bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user into database
    const insertUserStatement = `
      insert into users(username, password)
      values($1, $2)
      returning *
    `
    let rows
    try {
      ({ rows } = await query(insertUserStatement, [username, hashedPassword]))
    } catch (e) {
      // Handle duplicate username error
      res.status(409).send({ error: 'Username is already taken' })
    }
    
    // Generate authentication token for new user
    const { user, token } = await addToken(rows[0].id)

    res.status(201).send({
      user: getPublicUser(user),
      token
    })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

// POST /users/login - User authentication
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    
    // Validate required fields
    if (!username || !password) {
      throw new Error('Username and password are required')
    }

    // Find user by username
    const selectUserStatement = `select * from users where username = $1`

    const { rows } = await query(selectUserStatement, [username])
    const failedLoginError = { error: 'Username or password was incorrect' }

    if (!rows[0]) {
      return res.status(401).send(failedLoginError)
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(password, rows[0].password)
    if (!isMatch) {
      return res.status(401).send(failedLoginError)
    }

    // Generate new authentication token
    const { user, token } = await addToken(rows[0].id)

    res.send({
      user: getPublicUser(user),
      token
    })

  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

// POST /users/logout - Logout current session (requires authentication)
router.post('/logout', auth, async (req, res) => {
  // Remove current token from user's token list
  const tokens = req.user.tokens.filter((token) => token !== req.token)
  const setUserTokensStatement = `
    update users
    set tokens = $1
    where id = $2
  `
  const { rows: [user] } = await query(setUserTokensStatement, [tokens, req.user.id])
  
  // Clear request authentication data
  delete req.user
  delete req.token
  res.send(user)
})

// POST /users/logoutAll - Logout from all sessions (requires authentication)
router.post('/logoutAll', auth, async (req, res) => {
  // Clear all tokens for the user
  const clearUserTokensStatement = `
    update users
    set tokens = '{}'
    where id = $1
  `
  const { rows: [user] } = await query(clearUserTokensStatement, [req.user.id])
  
  // Clear request authentication data
  delete req.user
  delete req.token
  res.send(user)
})

// PUT /users - Update user profile (requires authentication)
router.put('/', auth, async (req, res) => {
  try {
    const allowedUpdates = ['username', 'password']
    
    // Check if username is being updated and if it's already taken
    if (req.body.username !== undefined) {
      const { rows } = await query(`select * from users where username = $1`, [
        req.body.username
      ])
      if (rows.length > 0) {
        return res.status(409).send({ error: 'Username is already taken' })
      }
    }
    
    // Hash password if it's being updated
    if (req.body.password !== undefined) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    
    // Update user information
    const user = await updateTableRow('users', req.user.id, allowedUpdates, req.body)
   
    res.send(getPublicUser(user))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

// DELETE /users - Delete user account (requires authentication)
router.delete('/', auth, async (req, res) => {
  try {
    const deleteUserStatement = `delete from users where id = $1 returning *`

    const { rows: [user] } = await query(deleteUserStatement, [req.user.id])

    if (!user) {
      return res.status(404).send({ error: 'Could not find user with that id' })
    }
    res.send(getPublicUser(user))
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

module.exports = router