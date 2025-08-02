# Components Directory

This directory contains all React components for the AVAR Assistant application.

## Architecture Principles

- **Presentational Only**: Components in this directory should be "dumb" and contain no business logic
- **UI/JSX Extension**: All files should use `.tsx` extension as they contain JSX
- **State Subscription**: Components receive state from the central XState machine
- **Event Dispatch**: Components send events back to the state machine

## Structure

- `App.tsx` - Main application component and layout
- Additional components will be organized by feature/domain as the application grows

## Guidelines

- Keep components focused on presentation and user interaction
- Use TypeScript interfaces from `../types/` for prop typing
- Import state and dispatch functions from the central state machine
- Follow React best practices and hooks patterns