# Database Directory

This directory contains database and persistence logic.

## Architecture Principles

- **Event Sourcing**: Store immutable, append-only event log
- **Offline First**: Use IndexedDB for offline capability
- **Logic Only**: Files use `.ts` extension (no JSX)
- **Data Integrity**: Maintain perfect audit trail

## Structure

- `database.ts` - Main database layer using Dexie.js for IndexedDB
- Additional modules may be added for specific data operations

## Guidelines

- Use Dexie.js library for IndexedDB operations
- Implement event log as source of truth
- Support event replay for state reconstruction
- Ensure offline functionality
- Never delete historical events (append reversal events instead)