/**
 * Utility Functions
 * 
 * Collection of helper functions and utilities used throughout
 * the AVAR Assistant application. These functions support
 * the event sourcing pattern and general application logic.
 */

import type { BaseEvent, MatchPhase } from '../types';

// Time utilities
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const parseTimeToMs = (timeString: string): number => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return (minutes * 60 + seconds) * 1000;
};

// Round timestamp up to nearest minute (as per specifications)
export const roundUpToMinute = (milliseconds: number): number => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.ceil(totalSeconds / 60);
  return minutes;
};

// Event sourcing utilities
export const generateEventId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const sortEvents = (events: BaseEvent[]): BaseEvent[] => {
  return [...events].sort((a, b) => {
    // Primary sort: minute
    if (a.minute !== b.minute) {
      return a.minute - b.minute;
    }
    
    // Secondary sort: timestamp
    if (a.timestamp !== b.timestamp) {
      return a.timestamp - b.timestamp;
    }
    
    // Tertiary sort: event type priority
    const priorityOrder = ['GOAL', 'RED_CARD', 'YELLOW_CARD', 'SUBSTITUTION'];
    const aPriority = priorityOrder.indexOf(a.type);
    const bPriority = priorityOrder.indexOf(b.type);
    
    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority;
    }
    
    return 0;
  });
};

// Match phase utilities
export const isMatchActive = (phase: MatchPhase): boolean => {
  return [
    'FIRST_HALF',
    'SECOND_HALF',
    'ET_FIRST_HALF',
    'ET_SECOND_HALF'
  ].includes(phase);
};

export const isBreakPhase = (phase: MatchPhase): boolean => {
  return [
    'HALF_TIME',
    'ET_HALF_TIME',
    'FULL_TIME'
  ].includes(phase);
};

export const canPauseMatch = (phase: MatchPhase): boolean => {
  return isMatchActive(phase);
};

// Validation utilities
export const validatePlayerNumber = (number: number): boolean => {
  return number >= 1 && number <= 99;
};

export const validateMatchTime = (milliseconds: number): boolean => {
  return milliseconds >= 0 && milliseconds <= 120 * 60 * 1000; // Max 120 minutes
};

// Data transformation utilities
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmptyObject = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

// Local storage utilities for offline support
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};