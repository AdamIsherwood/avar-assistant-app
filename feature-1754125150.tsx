```javascript
// Main thread (UI)

import React, { useState, useEffect, useRef } from 'react';
import Worker from './matchClockWorker.js'; // Import the worker

const MatchClock = () => {
  const [matchTime, setMatchTime] = useState(0);
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize the worker
    workerRef.current = new Worker();

    // Listen for messages from the worker
    workerRef.current.onmessage = (event) => {
      setMatchTime(event.data);
    };

    // Start the worker's clock
    workerRef.current.postMessage('start');


    // Cleanup on unmount
    return () => {
      workerRef.current.terminate();
    };

  }, []);



  return (
    <div>
      <h1>Match Time: {formatTime(matchTime)}</h1>
    </div>
  );
};


const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


export default MatchClock;


// matchClockWorker.js (Web Worker)

let startTime = 0;
let intervalId;
let isRunning = false;

self.onmessage = (event) => {
  if (event.data === 'start') {
    if (!isRunning) {
      startTime = Date.now() - startTime; // Adjust if paused
      intervalId = setInterval(() => {
        const currentTime = Date.now() - startTime;
        postMessage(currentTime);

      }, 10); // Send updates every 10ms for smoother display
      isRunning = true;
    }

  } else if (event.data === 'pause') {
      clearInterval(intervalId);
      isRunning = false;

  } else if (event.data === 'reset') {
      clearInterval(intervalId);
      startTime = 0;
      postMessage(0);
      isRunning = false;
  }

};

```
