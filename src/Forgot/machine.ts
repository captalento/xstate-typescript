import { createMachine, assign } from 'xstate';

function sendEmail(email: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email) {
        return resolve({ data: null });
      }
      reject();
    }, 3000);
  });
}

const context = { email: '', isLoading: false };
export const forgotMachine = createMachine<any, any, any>(
  {
    id: 'forgotMachine',
    initial: 'show-email',
    context,
    states: {
      'show-email': {
        on: {
          'collect-email': {
            target: 'send-email',
            actions: assign({
              email: (_context, event) => event.email,
            }),
          },
        },
      },
      'send-email': {
        invoke: {
          src: 'service-send-email',
          onDone: {
            target: 'info-email',
          },
          onError: {
            target: 'show-email',
          },
        },
        entry: 'toggle-loading',
        exit: 'toggle-loading',
      },
      'info-email': {
        on: {
          'event-go-to-email': 'show-email',
        },
      },
    },
  },
  {
    services: {
      'service-send-email': async (context) => {
        await sendEmail(context.email);
      },
    },
    actions: {
      'toggle-loading': assign({
        isLoading: (context) => !context.isLoading,
      }),
    },
  }
);
