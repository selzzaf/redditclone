/**
 * Reddit Clone - Database Schema
 * 
 * PostgreSQL database schema for the Reddit clone application
 * Defines tables for users, posts, comments, subreddits, and voting system
 * Includes foreign key constraints and triggers for data integrity
 * 
 * @author Reddit Clone Team
 * @version 1.0.0
 */

-- Users table - stores user account information and authentication tokens
create table users(
  id serial primary key,                    -- Unique user identifier
  username varchar(255) not null unique,   -- Unique username for login
  password varchar(255) not null,          -- Hashed password (bcrypt)
  tokens text[] default '{}',              -- Array of JWT tokens for session management
  created_at timestamptz default now(),    -- Account creation timestamp
  updated_at timestamptz default now()     -- Last update timestamp
);

-- Subreddits table - stores community information
create table subreddits(
  id serial primary key,                   -- Unique subreddit identifier
  name varchar(255) not null unique,       -- Unique subreddit name (e.g., "programming")
  description text,                        -- Community description
  created_at timestamptz default now()     -- Community creation timestamp
);

-- Moderators table - many-to-many relationship between users and subreddits
create table moderators(
  user_id int not null,                    -- User who is a moderator
  subreddit_id int not null,               -- Subreddit they moderate
  primary key (user_id, subreddit_id),     -- Composite primary key
  created_at timestamptz default now(),    -- When they became a moderator
  constraint fk_user
    foreign key(user_id)
      references users(id)
      on delete cascade,                   -- Remove moderator status if user is deleted
  constraint fk_subreddit
    foreign key(subreddit_id)
      references subreddits(id)
      on delete cascade                    -- Remove moderator status if subreddit is deleted
);

-- Post votes table - stores user votes on posts (upvote/downvote)
create table post_votes(
  user_id int not null,                    -- User who voted
  post_id int not null,                    -- Post they voted on
  vote_value int not null check (-1 <= vote_value and vote_value <= 1), -- -1=downvote, 0=no vote, 1=upvote
  primary key (user_id, post_id),          -- One vote per user per post
  constraint fk_user
    foreign key(user_id)
      references users(id)
      on delete cascade,                   -- Remove votes if user is deleted
  constraint fk_post
    foreign key(post_id)
      references posts(id)
      on delete cascade                    -- Remove votes if post is deleted
);

-- Post type enumeration - defines valid post types
create type post_type as enum ('text', 'link');

-- Posts table - stores all posts in the system
create table posts(
  id serial primary key,                   -- Unique post identifier
  type post_type not null,                 -- Type of post (text or link)
  title varchar(255) not null,             -- Post title
  body text,                               -- Post content (for text posts)
  author_id int,                           -- User who created the post
  subreddit_id int not null,               -- Subreddit where post was created
  created_at timestamptz default now(),    -- Post creation timestamp
  updated_at timestamptz default now(),    -- Last update timestamp
  constraint fk_author
    foreign key(author_id)
      references users(id)
      on delete set null,                  -- Keep post but remove author reference if user is deleted
  constraint fk_subreddit
    foreign key(subreddit_id)
      references subreddits(id)
      on delete set null                   -- Keep post but remove subreddit reference if subreddit is deleted
);

-- Comments table - stores comments on posts with threaded replies
create table comments(
  id serial primary key,                   -- Unique comment identifier
  body text,                               -- Comment content
  author_id int,                           -- User who wrote the comment
  post_id int,                             -- Post the comment is on
  parent_comment_id int,                   -- Parent comment for threaded replies (null for top-level)
  created_at timestamptz default now(),    -- Comment creation timestamp
  updated_at timestamptz default now(),    -- Last update timestamp
  constraint fk_author
    foreign key(author_id)
      references users(id)
      on delete set null,                  -- Keep comment but remove author reference if user is deleted
  constraint fk_post
    foreign key(post_id)
      references posts(id)
      on delete set null,                  -- Keep comment but remove post reference if post is deleted
  constraint fk_parent_comment
    foreign key(parent_comment_id)
      references comments(id)
      on delete set null                   -- Keep comment but remove parent reference if parent is deleted
);

-- Function to automatically update the updated_at timestamp
create or replace function update_updated_at_column()
  returns trigger
  language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$

-- Triggers to automatically update updated_at column when records are modified
create trigger update_users_updated_at
  before update
  on users
  for each row
    execute procedure update_updated_at_column();

create trigger update_posts_updated_at
  before update
  on posts
  for each row
    execute procedure update_updated_at_column();

create trigger update_comments_updated_at
  before update
  on comments
  for each row
    execute procedure update_updated_at_column();