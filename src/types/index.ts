import React from 'react';

// Core event types for event sourcing
export interface Event {
  type: string;
  payload?: any;
  timestamp?: number;
  id?: number;
}

// XState machine context type
export interface MachineContext {
  events: Event[];
  data: any;
}

// Timer-related types
export interface TimerState {
  matchTime: number;
  stoppageTime: number;
  isRunning: boolean;
  isPaused: boolean;
}

export interface TimerUpdatePayload {
  matchTime: number;
  stoppageTime: number;
}

// Worker message types
export type TimerWorkerMessage = {
  type: 'START_MATCH_TIMER' | 'STOP_MATCH_TIMER' | 'START_STOPPAGE_TIMER' | 
        'STOP_STOPPAGE_TIMER' | 'PAUSE_TIMER' | 'RESUME_TIMER' | 'RESET_TIMER';
  payload?: any;
};

export type WorkerResponse = {
  type: 'TIMER_UPDATE';
  payload: TimerUpdatePayload;
};

// Match-related types
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  phase: 'pre-match' | 'first-half' | 'half-time' | 'second-half' | 'extra-time' | 'penalty-shootout' | 'finished';
  events: Event[];
}

// Component props types
export interface AppProps {
  // Define props as needed
}

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}