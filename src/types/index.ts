/**
 * Type Definitions
 * 
 * Central location for all TypeScript interfaces, types, and enums
 * used throughout the AVAR Assistant application.
 * 
 * Follows the separation of concerns principle by centralizing
 * type definitions for match data, events, and application state.
 */

// Match-related types
export interface Team {
  id: string;
  name: string;
  shortName: string;
  players: Player[];
  staff: Staff[];
}

export interface Player {
  id: string;
  number: number;
  name: string;
  position: string;
  status: 'onPitch' | 'bench' | 'substituted' | 'dismissed';
  cards: Card[];
  goals: Goal[];
}

export interface Staff {
  id: string;
  name: string;
  role: 'manager' | 'coach' | 'medic' | 'other';
  status: 'active' | 'dismissed';
}

// Event types for Event Sourcing
export interface BaseEvent {
  id: string;
  type: string;
  timestamp: number;
  matchId: string;
  minute: number;
  userId?: string;
}

export interface Goal extends BaseEvent {
  type: 'GOAL' | 'OWN_GOAL';
  playerId: string;
  teamId: string;
  assistPlayerId?: string;
  isOwnGoal: boolean;
}

export interface Card extends BaseEvent {
  type: 'YELLOW_CARD' | 'RED_CARD' | 'SECOND_YELLOW';
  playerId: string;
  teamId: string;
  reason: string;
}

export interface Substitution extends BaseEvent {
  type: 'SUBSTITUTION';
  teamId: string;
  playerOutId: string;
  playerInId: string;
  window: number;
  isConcussionSub: boolean;
}

export interface Stoppage extends BaseEvent {
  type: 'STOPPAGE_STARTED' | 'STOPPAGE_ENDED';
  reason: StoppageReason;
  duration?: number;
}

// Match state types
export type MatchPhase = 
  | 'PRE_MATCH'
  | 'FIRST_HALF'
  | 'HALF_TIME'
  | 'SECOND_HALF'
  | 'FULL_TIME'
  | 'ET_FIRST_HALF'
  | 'ET_HALF_TIME'
  | 'ET_SECOND_HALF'
  | 'PENALTIES'
  | 'MATCH_OVER'
  | 'MATCH_PAUSED'
  | 'ABANDONED';

export type StoppageReason = 
  | 'VAR_CHECK'
  | 'TIME_WASTING'
  | 'INJURY_TREATMENT'
  | 'OTHER'
  | 'SUBSTITUTION'
  | 'YELLOW_CARD'
  | 'RED_CARD'
  | 'GOAL_CELEBRATION'
  | 'OUT_OF_PLAY';

// Competition rules
export interface CompetitionRules {
  maxSubstitutions: number;
  maxSubstitutionWindows: number;
  allowReentry: boolean;
  halfTimeDuration: number; // in minutes
  extraTime: boolean;
  penaltyShootout: boolean;
  sinBin: boolean;
  sinBinDuration?: number; // in minutes
}

// Timer state
export interface TimerState {
  matchClock: number; // in milliseconds
  stoppageTime: number; // in milliseconds
  isRunning: boolean;
  isPaused: boolean;
  phase: MatchPhase;
}

// Application state
export interface AppState {
  currentMatch?: string;
  matchPhase: MatchPhase;
  timer: TimerState;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    home: number;
    away: number;
  };
  events: BaseEvent[];
  rules: CompetitionRules;
}