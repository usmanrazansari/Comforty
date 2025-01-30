type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  error?: Error;
  data?: Record<string, unknown>;
}

export const logger = {
  info(message: string, data?: Record<string, unknown>) {
    this.log('info', message, undefined, data);
  },

  warn(message: string, data?: Record<string, unknown>) {
    this.log('warn', message, undefined, data);
  },

  error(error: Error, context?: string, data?: Record<string, unknown>) {
    this.log('error', error.message, error, data, context);
  },

  debug(message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, undefined, data);
    }
  },

  private log(
    level: LogLevel,
    message: string,
    error?: Error,
    data?: Record<string, unknown>,
    context?: string
  ) {
    const logMessage: LogMessage = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
      data
    };

    if (process.env.NODE_ENV === 'production') {
      // Here you would typically send to a logging service
      console.log(JSON.stringify(logMessage));
    } else {
      console.log(`[${level.toUpperCase()}] ${message}`, {
        context,
        error,
        data
      });
    }
  }
}; 