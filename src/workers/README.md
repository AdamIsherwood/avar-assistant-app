# Workers Directory

This directory contains Web Workers for background processing.

## Architecture Principles

- **Background Processing**: Run on separate threads for performance
- **Timer Accuracy**: Critical timing logic must be in Web Workers
- **Logic Only**: Files use `.ts` extension (no JSX)
- **Message Communication**: Communicate with main thread via postMessage

## Structure

- `timerWorker.ts` - Dedicated worker for match timer and stoppage tracking
- Additional workers may be added for other background tasks

## Guidelines

- Implement Web Worker API standard
- Ensure millisecond-accurate timing
- Handle timer drift prevention
- Work correctly when app is in background tab
- Communicate with state machine as XState actors