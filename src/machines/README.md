# Machines Directory

This directory contains XState state machines that implement the core business logic.

## Architecture Principles

- **Logic Only**: Files use `.ts` extension (no JSX)
- **Event Sourcing**: State machines process events and maintain event log
- **Single Source of Truth**: Central state machine controls all application logic
- **Predictable State**: Formal state machines prevent impossible states

## Structure

- `matchMachine.ts` - Central state machine for match management and flow
- Additional machines may be added for specific domains (e.g., settings, reports)

## Guidelines

- Implement using XState library
- Define clear state transitions and guards
- Handle side effects through XState services/actors
- Communicate with Web Workers as spawned actors
- Trigger database persistence for events