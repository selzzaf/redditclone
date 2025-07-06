/**
 * Redux Store Configuration
 * 
 * Configures the Redux store with all reducers, middleware, and enhancers
 * Sets up state persistence for authentication
 * Enables Redux DevTools for development debugging
 * 
 * @author Reddit Clone Team
 * @version 1.0.0
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                    // Middleware for async actions
import authReducer from '../reducers/auth';         // Authentication state management
import loadingReducer from '../reducers/loading';   // Loading states management
import errorReducer from '../reducers/error';       // Error handling state
import postReducer from '../reducers/post';         // Individual post state
import postListReducer from '../reducers/postList'; // Posts listing state
import commentsReducer from '../reducers/comments'; // Comments state management
import { saveState } from '../localStorage';        // Local storage persistence
import subredditsReducer from '../reducers/subreddits'; // Subreddits state

// Redux DevTools configuration for development
// Enables browser extension for debugging Redux state
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/**
 * Configure and create the Redux store
 * @returns {Object} - Configured Redux store
 */
const configureStore = () => {
  // Combine all reducers into a single root reducer
  const rootReducer = combineReducers({
    auth: authReducer,           // User authentication state
    loading: loadingReducer,     // Loading indicators state
    error: errorReducer,         // Error messages state
    post: postReducer,           // Current post state
    postList: postListReducer,   // Posts listing state
    comments: commentsReducer,   // Comments state
    subreddits: subredditsReducer, // Subreddits state
  });

  // Create store with middleware and enhancers
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))  // Enable async actions with thunk
  );

  // Subscribe to store changes to persist authentication state
  // Saves auth state to localStorage whenever it changes
  store.subscribe(() => {
    saveState(store.getState().auth, 'authState');
  });

  return store;
};

// Create and export the configured store instance
const store = configureStore();

export default store;
