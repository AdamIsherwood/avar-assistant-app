import { useMachine } from '@xstate/react';
import { matchMachine } from '../machines/matchMachine';
import './App.css';

function App() {
  const [state, send] = useMachine(matchMachine);

  return (
    <div className="App">
      <h1>AVAR Assistant App</h1>
      <div className="card">
        <p>Current State: {state.value as string}</p>
        <pre>{JSON.stringify(state.context.events, null, 2)}</pre>
        <button onClick={() => send({ type: 'FETCH_DATA' })}>Fetch Data</button>
        {state.matches('processing') && (
          <button onClick={() => send({ type: 'PROCESS_DATA', payload: { processed: true } })}>
            Process Data
          </button>
        )}
        {state.matches('processed') && (
          <button onClick={() => send({ type: 'SAVE_DATA' })}>Save Data</button>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;