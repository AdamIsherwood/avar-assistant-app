```javascript
// Timer Worker (timer_worker.js)
self.addEventListener('message', (event) => {
  let startTime = 0;
  let elapsedTime = 0;
  let matchTimerInterval;
  let stoppageTimerInterval;
  let isRunning = false;
  let isPaused = false;
  let stoppageTime = 0;

  const sendUpdate = () => {
    self.postMessage({
      type: 'TIMER_UPDATE',
      payload: {
        matchTime: startTime + elapsedTime,
        stoppageTime: stoppageTime,
      },
    });
  };

  const startMatchTimer = () => {
    if (!isRunning) {
      startTime = Date.now() - elapsedTime;
      isRunning = true;
      matchTimerInterval = setInterval(() => {
        if (!isPaused) {
          elapsedTime = Date.now() - startTime;
          sendUpdate();
        }
      }, 100); // 100ms for sub-second accuracy
    }
  };

  const stopMatchTimer = () => {
    if (isRunning) {
      clearInterval(matchTimerInterval);
      isRunning = false;
    }
  };

  const startStoppageTimer = () => {
    stopMatchTimer(); // Pause match timer when stoppage starts

    if (!stoppageTimerInterval) {
      let stoppageStartTime = Date.now();
      stoppageTimerInterval = setInterval(() => {
        if (!isPaused) {
          stoppageTime = Date.now() - stoppageStartTime + stoppageTime;
          sendUpdate();
        }
      }, 100);
    }
  };



  const stopStoppageTimer = () => {
    if (stoppageTimerInterval) {
      clearInterval(stoppageTimerInterval);
      stoppageTimerInterval = null;

    }
  };

  const pauseTimer = () => {
    isPaused = true;
  };

  const resumeTimer = () => {
    isPaused = false;

  };


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
    case "RESET_TIMER":
        stopMatchTimer();
        stopStoppageTimer();
        elapsedTime = 0;
        stoppageTime = 0;
        startTime = 0;
        isPaused = false;
        sendUpdate();
        break;
    default:
      console.warn("Unknown message type received in timer worker:", event.data.type)

  }
});


// Example XState integration (within your main application code)
// ...

// Spawn the timer actor
const timerActor = spawn(
  (sendBack) => (send, onReceive) => {
    const worker = new Worker('timer_worker.js');

    worker.onmessage = (event) => {
      sendBack(event.data);
    };

    onReceive((event) => {
      worker.postMessage(event); // Forward events to the worker
    });

    return () => {
      worker.terminate(); // Clean up when the actor stops
    };
  },
  { name: 'timer' }
);


// ... in your XState machine definition
// ...
// invoke: {
//   src: timerActor,
//   // ... other invoke config
// }
// ...

// Send events to control the timer
// send({ type: 'START_MATCH_TIMER' });
// send({ type: 'STOP_MATCH_TIMER' });
// send({ type: 'START_STOPPAGE_TIMER' });
// send({ type: 'STOP_STOPPAGE_TIMER' });
// send({ type: 'PAUSE_TIMER' });
// send({ type: 'RESUME_TIMER' });
// send({ type: 'RESET_TIMER' });
// ...

// Listen for 'TIMER_UPDATE' events from the worker
// ...


```