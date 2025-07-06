/**
 * Database Configuration Module
 * 
 * Handles PostgreSQL database connection and configuration
 * Supports both development and production environments
 * Uses connection pooling for better performance
 * 
 * @author Reddit Clone Team
 * @version 1.0.0
 */

const { Pool } = require('pg')

// Development environment configuration
// Uses individual environment variables for local development
const devConfig = {
  host: process.env.PG_HOST,           // Database host (usually localhost)
  port: process.env.PG_PORT,           // Database port (usually 5432)
  database: process.env.PG_DBNAME,     // Database name
  user: process.env.PG_USER,           // Database username
  password: process.env.PG_PASSWORD,   // Database password
}

// Production environment configuration
// Uses connection string for cloud deployments (e.g., Heroku)
const prodConfig = {
  connectionString: process.env.DATABASE_URL,  // Full connection string
  ssl: { rejectUnauthorized: false },          // SSL configuration for cloud DBs
}

// Create database connection pool
// Uses production config if NODE_ENV is 'production', otherwise development
const pool = new Pool(process.env.NODE_ENV === 'production' ? prodConfig : devConfig)

// Export a query function that uses the connection pool
// This provides better performance and connection management
module.exports = {
  /**
   * Execute a database query
   * @param {string} text - SQL query text
   * @param {Array} params - Query parameters (prevents SQL injection)
   * @returns {Promise} - Query result promise
   */
  query: (text, params) => {
    return pool.query(text, params)
  }
}