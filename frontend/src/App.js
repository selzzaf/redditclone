/**
 * Reddit Clone - Main Application Component
 * 
 * Root component that sets up the application structure, routing, and theme
 * Handles navigation between different pages and components
 * Implements protected routes for authenticated users
 * 
 * @author Reddit Clone Team
 * @version 1.0.0
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import theme from './theme';                    // Custom theme configuration
import PublicRoute from './components/PublicRoute';      // Route wrapper for public pages
import PrivateRoute from './components/PrivateRoute';    // Route wrapper for protected pages
import Navbar from './components/Navbar';                // Navigation component
import CommentsPage from './components/CommentsPage';    // Comments and discussion page
import LoginPage from './components/LoginPage';          // User login page
import RegisterPage from './components/RegisterPage';    // User registration page
import CreatePostPage from './components/CreatePostPage'; // Create new post page
import PostList from './components/PostList';            // Main posts listing page
import ThemedBox from './components/ThemedBox';          // Theme-aware container
import CreateSubredditPage from './components/CreateSubredditPage'; // Create subreddit page

/**
 * Main application component
 * Sets up routing, theme, and overall layout structure
 */
function App() {
  return (
    // ChakraProvider wraps the entire app with theme and styling context
    <ChakraProvider theme={theme}>
      {/* Router enables client-side navigation */}
      <Router>
        {/* ThemedBox provides consistent theming and full viewport height */}
        <ThemedBox minHeight="100vh" light="gray.300" dark="gray.800">
          {/* Navigation bar appears on all pages */}
          <Navbar />
          
          {/* Main content area with responsive width */}
          <Flex justifyContent="center">
            <Box width={['95%', '80%', '70%', '60%']} mb={10}>
              {/* Route configuration for different pages */}
              <Switch>
                {/* Comments page - shows post details and comments */}
                <Route path="/r/:subreddit/comments/:id">
                  <CommentsPage />
                </Route>
                
                {/* Public routes - accessible to all users */}
                <PublicRoute path="/login">
                  <LoginPage />
                </PublicRoute>
                <PublicRoute path="/register">
                  <RegisterPage />
                </PublicRoute>
                
                {/* Private routes - require authentication */}
                <PrivateRoute path="/submit">
                  <CreatePostPage />
                </PrivateRoute>
                <PrivateRoute path="/subreddits/create">
                  <CreateSubredditPage />
                </PrivateRoute>
                
                {/* Subreddit-specific post listing */}
                <Route path="/r/:subreddit">
                  <PostList />
                </Route>
                
                {/* Home page - shows all posts */}
                <Route path="/">
                  <PostList />
                </Route>
              </Switch>
            </Box>
          </Flex>
        </ThemedBox>
      </Router>
    </ChakraProvider>
  );
}

export default App;
