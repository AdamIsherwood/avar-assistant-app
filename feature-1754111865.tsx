```typescript
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

interface Event {
  type: string;
  payload?: any;
}

interface Context {
  events: Event[];
  data: any;
}

const eventMachine = createMachine<Context, Event>({
  id: 'eventSourcingMachine',
  initial: 'idle',
  context: {
    events: [],
    data: null,
  },
  states: {
    idle: {
      on: {
        FETCH_DATA: {
          target: 'fetching',
        },
      },
    },
    fetching: {
      invoke: {
        src: 'fetchData',
        onDone: {
          target: 'processing',
          actions: assign({
            events: (context, event) => [...context.events, { type: 'DATA_FETCHED', payload: event.data }],
            data: (context, event) => event.data,
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            events: (context, event) => [...context.events, { type: 'FETCH_ERROR', payload: event.data }],
          }),
        },
      },
    },
    processing: {
      on: {
        PROCESS_DATA: {
          target: 'processed',
          actions: assign({
            events: (context, event) => [...context.events, { type: 'DATA_PROCESSED', payload: event.data }],
            data: (context, event) => ({ ...context.data, ...event.data }), 
          }),
        },
      },
    },
    processed: {
      on: {
        SAVE_DATA: {
          target: 'saving',
        },
      },
    },
    saving: {
      invoke: {
        src: 'saveData',
        onDone: {
          target: 'idle',
          actions: assign({
            events: (context, event) => [...context.events, { type: 'DATA_SAVED' }],
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            events: (context, event) => [...context.events, { type: 'SAVE_ERROR', payload: event.data }],
          }),
        },
      },
    },
    error: {},
  },
});



const fetchData = () => new Promise(resolve => setTimeout(() => resolve({ some: 'data' }), 500));
const saveData = (context: Context) => new Promise(resolve => setTimeout(() => resolve(context.data), 500));

const App = () => {
  const [state, send] = useMachine(eventMachine, {
    services: {
      fetchData,
      saveData,
    },
  });


  return (
    <div>
      <p>Current State: {state.value}</p>
      <pre>{JSON.stringify(state.context.events, null, 2)}</pre>
      <button onClick={() => send('FETCH_DATA')}>Fetch Data</button>
      {state.matches('processing') && <button onClick={() => send('PROCESS_DATA', { processed: true })}>Process Data</button>}
      {state.matches('processed') && <button onClick={() => send('SAVE_DATA')}>Save Data</button>}

    </div>
  );
};

export default App;

```