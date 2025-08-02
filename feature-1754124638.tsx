```jsx
import React from 'react';
import { useMachine } from '@xstate/react';
import { matchMachine } from './matchMachine'; // Assuming matchMachine is defined elsewhere

const MatchDisplay = () => {
  const [state, send] = useMachine(matchMachine);

  return (
    <div>
      <p>Current State: {state.value}</p>
    </div>
  );
};

export default MatchDisplay;

```