```javascript
import React, { useState, useEffect } from 'react';

function MatchPhaseButton({ gameState }) {
  const [buttonText, setButtonText] = useState('Start Match');

  useEffect(() => {
    switch (gameState.current) {
      case 'preMatch':
        setButtonText('Start Match');
        break;
      case 'inMatch':
        setButtonText('Pause Match');
        break;
      case 'paused':
        setButtonText('Resume Match');
        break;
      case 'postMatch':
        setButtonText('View Results');
        break;
      default:
        setButtonText('Start Match'); 
    }
  }, [gameState]);


  return (
    <button onClick={gameState.send}>{buttonText}</button>
  );
}

export default MatchPhaseButton;

```
