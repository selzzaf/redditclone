/**
 * Axios HTTP Client Configuration
 * 
 * Configures axios instance for API communication with backend
 * Sets up authentication token injection for all requests
 * Handles base URL configuration for different environments
 * 
 * @author Reddit Clone Team
 * @version 1.0.0
 */

import axios from 'axios';
import store from './store/configureStore';    // Redux store for state access
import { tokenSelector } from './selectors';    // Selector to get auth token

// Create axios instance with base configuration
const instance = axios.create({
  // Use environment variable for backend URL or default to localhost
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001',
});

// Request interceptor to automatically add authentication token
// Runs before every HTTP request to inject the JWT token
instance.interceptors.request.use((config) => {
  // Get current authentication token from Redux store
  const token = tokenSelector(store.getState());
  
  // Add Authorization header with Bearer token if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default instance;
