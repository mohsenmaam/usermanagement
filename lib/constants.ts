/**
 * Application Constants
 * Centralized configuration and constant values
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 10000,
  ENDPOINTS: {
    USERS: '/users',
    POSTS: '/posts',
    COMMENTS: '/comments',
  },
};

// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 0.3,
  DEBOUNCE_DELAY: 500,
  MAX_USERS_PER_PAGE: 12,
};

// Color Palette
export const COLORS = {
  PRIMARY: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  SECONDARY: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
};

// Validation Rules
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    PATTERN: /^[\d\s\-\+\(\)]+$/,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
};

// Status Messages
export const MESSAGES = {
  SUCCESS: {
    USER_CREATED: 'User created successfully!',
    USER_UPDATED: 'User updated successfully!',
    USER_DELETED: 'User deleted successfully!',
    DATA_REFRESHED: 'Data refreshed successfully!',
  },
  ERROR: {
    FETCH_FAILED: 'Failed to fetch users',
    CREATE_FAILED: 'Failed to create user',
    UPDATE_FAILED: 'Failed to update user',
    DELETE_FAILED: 'Failed to delete user',
    VALIDATION_FAILED: 'Please check your input',
    NETWORK_ERROR: 'Network error occurred',
  },
};

// Avatar Configuration
export const AVATAR_CONFIG = {
  BASE_URL: 'https://ui-avatars.com/api/',
  DEFAULT_SIZE: 100,
  DEFAULT_BACKGROUND: 'random',
  DEFAULT_BOLD: true,
};
