import { createMachine, assign, fromPromise } from 'xstate';

interface Event {
  type: string;
  payload?: any;
}

interface Context {
  events: Event[];
  data: any;
}

const fetchData = fromPromise(() => 
  new Promise(resolve => setTimeout(() => resolve({ some: 'data' }), 500))
);

const saveData = fromPromise(({ input }: { input: Context }) => 
  new Promise(resolve => setTimeout(() => resolve(input.data), 500))
);

export const matchMachine = createMachine({
  id: 'matchMachine',
  initial: 'idle',
  context: {
    events: [],
    data: null,
  } as Context,
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
        src: fetchData,
        onDone: {
          target: 'processing',
          actions: assign({
            events: ({ context, event }) => [...context.events, { type: 'DATA_FETCHED', payload: event.output }],
            data: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            events: ({ context, event }) => [...context.events, { type: 'FETCH_ERROR', payload: event.error }],
          }),
        },
      },
    },
    processing: {
      on: {
        PROCESS_DATA: {
          target: 'processed',
          actions: assign({
            events: ({ context, event }) => [...context.events, { type: 'DATA_PROCESSED', payload: event.payload }],
            data: ({ context, event }) => ({ ...context.data, ...event.payload }), 
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
        src: saveData,
        input: ({ context }) => context,
        onDone: {
          target: 'idle',
          actions: assign({
            events: ({ context }) => [...context.events, { type: 'DATA_SAVED' }],
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            events: ({ context, event }) => [...context.events, { type: 'SAVE_ERROR', payload: event.error }],
          }),
        },
      },
    },
    error: {},
  },
});