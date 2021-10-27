import { createMachine, assign } from 'xstate';
import { STATES, EVENTS, SERVICES, ACTIONS } from './enums';
import { ForgotTypestate } from './schema';
import { initialContext } from './initialContext';
import { ForgotContext } from './context';
import { ForgotEvent } from './event';

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

export const forgotMachine = createMachine<
  ForgotContext,
  ForgotEvent,
  ForgotTypestate
>(
  {
    id: 'forgotMachine',
    initial: STATES.SHOW_EMAIL,
    context: initialContext,
    states: {
      [STATES.SHOW_EMAIL]: {
        on: {
          [EVENTS.COLLECT_EMAIL]: {
            target: STATES.SEND_EMAIL,
            actions: assign({
              email: (_context, event) => event.email,
            }),
          },
        },
      },
      // 'CODE_IS_VALID_GATEWAY': {
      //   always: [
      //     {
      //       target: 'state'
      //       cond: (context) => context.code === context.correctCode 
      //     },
      //     {
      //       target: 'state2'
      //       cond: (context) => context.code !== context.correctCode 
      //     }
      //     {
      //       target: 'state2'
      //       cond: (context) => context.code !== context.correctCode 
      //     }
      //   ]
      // },
      [STATES.SEND_EMAIL]: {
        invoke: {
          src: SERVICES.SERVICE_SEND_EMAIL,
          onDone: {
            target: STATES.INFO_EMAIL,
          },
          onError: {
            target: STATES.SHOW_EMAIL,
          },
        },
        entry: ACTIONS.TOGGLE_LOADING,
        exit: ACTIONS.TOGGLE_LOADING,
      },
      [STATES.INFO_EMAIL]: {
        on: {
          [EVENTS.BACK_TO_EMAIL]: STATES.SHOW_EMAIL,
          [EVENTS.SEND_TO_CODE]: STATES.SHOW_CODE_CONFIRM,
        },
      },
      [STATES.SHOW_CODE_CONFIRM]: {
        on: {

        }
      }
    },
  },
  {
    services: {
      [SERVICES.SERVICE_SEND_EMAIL]: async (context) => {
        await sendEmail(context.email);
      },
    },
    actions: {
      [ACTIONS.TOGGLE_LOADING]: assign({
        isLoading: (context) => !context.isLoading,
      }),
    },
  }
);
