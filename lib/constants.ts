export const AUTH_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  JWT_EXPIRY: '24h',
  CORS_HEADERS: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
  ERROR_MESSAGES: {
    EMAIL_REQUIRED: 'Email is required',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_LENGTH: 'Password must be at least 8 characters long',
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_EXISTS: 'User with this email already exists',
    USER_NOT_FOUND: 'User not found',
    DATABASE_ERROR: 'Database error occurred',
    INVALID_TOKEN: 'Invalid or expired token'
  },
  SUCCESS_MESSAGES: {
    REGISTRATION_SUCCESSFUL: 'Registration successful',
    LOGIN_SUCCESSFUL: 'Login successful',
    LOGOUT_SUCCESSFUL: 'Logout successful'
  }
};

export const validateConfig = () => {
  const errors = [];
  
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    errors.push('Sanity Project ID is not configured');
  }
  
  if (!process.env.SANITY_API_TOKEN) {
    errors.push('Sanity API Token is not configured');
  }
  
  if (!process.env.JWT_SECRET) {
    errors.push('JWT Secret is not configured');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const ERROR_MESSAGES = {
  PASSWORD_LENGTH: 'Password must be at least 8 characters long',
  PASSWORDS_MISMATCH: 'Passwords do not match',
  EMAIL_REQUIRED: 'Email and password are required',
  PASSWORD_REQUIRED: 'Password is required',
  INVALID_EMAIL: 'Invalid email format',
  EMAIL_EXISTS: 'Email already registered',
  SERVER_ERROR: 'Server error occurred. Please try again.',
  CONFIG_ERROR: 'Server configuration error. Please contact support.',
  INVALID_CREDENTIALS: 'Invalid email or password',
  JWT_ERROR: 'Error generating authentication token'
};
