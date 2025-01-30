export const logger = {
  error: (err: Error, context?: string) => {
    console.error(`[${context}]:`, err);
    // Add production logging service here
  }
}; 