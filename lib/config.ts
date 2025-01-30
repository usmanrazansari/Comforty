export const config = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiToken: process.env.SANITY_API_TOKEN || '',
    jwtSecret: process.env.JWT_SECRET
  },
  
  // Comprehensive configuration validation
  validateConfig() {
    const errors: string[] = [];
    
    // Project ID validation
    if (!this.sanity.projectId) {
      errors.push('Sanity Project ID is missing');
    }
    
    // Dataset validation
    if (!this.sanity.dataset) {
      errors.push('Sanity Dataset is not specified');
    }
    
    // API Token validation
    if (!this.sanity.apiToken) {
      errors.push('Sanity API Token is missing');
    }
    
    // JWT Secret validation
    if (!this.sanity.jwtSecret) {
      errors.push('JWT Secret is missing');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Environment-specific configuration
  getEnvironmentConfig() {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production'
    };
  }
};