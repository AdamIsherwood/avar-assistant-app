// Utility functions for the AVAR Assistant App

/**
 * Format time in milliseconds to MM:SS format
 */
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Generate a unique ID for events
 */
export const generateEventId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Deep clone an object (for immutable operations)
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce function to limit rapid function calls
 */
// eslint-disable-next-line no-unused-vars
export const debounce = <T extends (..._args: any[]) => any>(
  func: T,
  wait: number
// eslint-disable-next-line no-unused-vars
): ((..._args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (..._args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(..._args), wait);
  };
};

/**
 * Check if the app is running in development mode
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV === true;
};

/**
 * Log events in development mode
 */
export const devLog = (message: string, data?: any): void => {
  if (isDevelopment()) {
    console.log(`[AVAR Dev] ${message}`, data || '');
  }
};