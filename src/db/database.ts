import Dexie from 'dexie';

// Define the Event interface for event sourcing
export interface Event {
  id?: number;
  type: string;
  payload?: any;
  timestamp: number;
  userId?: string;
}

// Define the database schema
export class AVARDatabase extends Dexie {
  events!: Dexie.Table<Event, number>;

  constructor() {
    super('AVARDatabase');
    
    // Define database schema
    this.version(1).stores({
      events: '++id, type, timestamp, userId'
    });
  }

  // Method to add a new event to the log
  async addEvent(event: Omit<Event, 'id' | 'timestamp'>): Promise<number> {
    const eventWithTimestamp: Event = {
      ...event,
      timestamp: Date.now()
    };
    return await this.events.add(eventWithTimestamp);
  }

  // Method to get all events in chronological order
  async getAllEvents(): Promise<Event[]> {
    return await this.events.orderBy('timestamp').toArray();
  }

  // Method to get events by type
  async getEventsByType(type: string): Promise<Event[]> {
    return await this.events.where('type').equals(type).toArray();
  }

  // Method to get events within a time range
  async getEventsInRange(startTime: number, endTime: number): Promise<Event[]> {
    return await this.events
      .where('timestamp')
      .between(startTime, endTime)
      .toArray();
  }

  // Method to clear all events (use with caution)
  async clearAllEvents(): Promise<void> {
    await this.events.clear();
  }
}

// Create and export the database instance
export const db = new AVARDatabase();