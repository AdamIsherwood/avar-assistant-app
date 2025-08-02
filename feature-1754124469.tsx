```typescript
import Dexie from 'dexie';

export interface MatchEvent {
  id?: number;
  timestamp: number;
  eventType: string;
  payload: any;
}

export class MatchEventsDatabase extends Dexie {
  matchEvents!: Dexie.Table<MatchEvent, number>;

  constructor() {
    super('MatchEventsDatabase');
    this.version(1).stores({
      matchEvents: '++id, timestamp, eventType',
    });
  }
}

export const db = new MatchEventsDatabase();
```
