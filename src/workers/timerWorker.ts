// Timer Worker for AVAR Assistant App
// Handles precise timing operations in a separate thread

interface TimerState {
  startTime: number;
  elapsedTime: number;
  stoppageTime: number;
  isRunning: boolean;
  isPaused: boolean;
  matchTimerInterval: number | null;
  stoppageTimerInterval: number | null;
}

const state: TimerState = {
  startTime: 0,
  elapsedTime: 0,
  stoppageTime: 0,
  isRunning: false,
  isPaused: false,
  matchTimerInterval: null,
  stoppageTimerInterval: null,
};

const sendUpdate = () => {
  self.postMessage({
    type: 'TIMER_UPDATE',
    payload: {
      matchTime: state.startTime + state.elapsedTime,
      stoppageTime: state.stoppageTime,
    },
  });
};

const startMatchTimer = () => {
  if (!state.isRunning) {
    state.startTime = Date.now() - state.elapsedTime;
    state.isRunning = true;
    state.matchTimerInterval = setInterval(() => {
      if (!state.isPaused) {
        state.elapsedTime = Date.now() - state.startTime;
        sendUpdate();
      }
    }, 100); // 100ms for sub-second accuracy
  }
};

const stopMatchTimer = () => {
  if (state.isRunning) {
    if (state.matchTimerInterval) {
      clearInterval(state.matchTimerInterval);
    }
    state.isRunning = false;
  }
};

const startStoppageTimer = () => {
  stopMatchTimer(); // Pause match timer when stoppage starts

  if (!state.stoppageTimerInterval) {
    const stoppageStartTime = Date.now();
    state.stoppageTimerInterval = setInterval(() => {
      if (!state.isPaused) {
        state.stoppageTime = Date.now() - stoppageStartTime + state.stoppageTime;
        sendUpdate();
      }
    }, 100);
  }
};

const stopStoppageTimer = () => {
  if (state.stoppageTimerInterval) {
    clearInterval(state.stoppageTimerInterval);
    state.stoppageTimerInterval = null;
  }
};

const pauseTimer = () => {
  state.isPaused = true;
};

const resumeTimer = () => {
  state.isPaused = false;
};

const resetTimer = () => {
  stopMatchTimer();
  stopStoppageTimer();
  state.elapsedTime = 0;
  state.stoppageTime = 0;
  state.startTime = 0;
  state.isPaused = false;
  sendUpdate();
};

self.addEventListener('message', (event) => {
  switch (event.data.type) {
    case 'START_MATCH_TIMER':
      startMatchTimer();
      break;
    case 'STOP_MATCH_TIMER':
      stopMatchTimer();
      break;
    case 'START_STOPPAGE_TIMER':
      startStoppageTimer();
      break;
    case 'STOP_STOPPAGE_TIMER':
      stopStoppageTimer();
      startMatchTimer(); // Resume match timer after stoppage
      break;
    case 'PAUSE_TIMER':
      pauseTimer();
      break;
    case 'RESUME_TIMER':
      resumeTimer();
      break;
    case 'RESET_TIMER':
      resetTimer();
      break;
    default:
      console.warn("Unknown message type received in timer worker:", event.data.type);
  }
});

// Export type for use in main thread
export type TimerWorkerMessage = {
  type: 'START_MATCH_TIMER' | 'STOP_MATCH_TIMER' | 'START_STOPPAGE_TIMER' | 
        'STOP_STOPPAGE_TIMER' | 'PAUSE_TIMER' | 'RESUME_TIMER' | 'RESET_TIMER';
  payload?: any;
};