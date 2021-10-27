import { createMachine, assign } from 'xstate';
import { STATES, EVENTS, SERVICES, ACTIONS } from './enums';
import { ForgotTypestate } from './schema';
import { initialContext } from './initialContext';
import { ForgotContext } from './context';
import { ForgotEvent } from './event';

function genericMock({ body = {}, data = {}, isSuccess = true }: any): any {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        return resolve(data);
      }
      return reject(data);
    }, 500);
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
      [STATES.CODE_IS_VALID_GATEWAY]: {
        always: [
          {
            target: STATES.SHOW_PASSWORD,
            cond: (context) => context.isValid,
          },
          {
            target: STATES.SHOW_CODE_CONFIRM,
            cond: (context) => context.isValid === false,
            actions: assign({
              error: (_context, event) => true,
            }),
          },
        ],
      },
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
          [EVENTS.COLLECT_CODE]: {
            target: STATES.VALIDATE_CODE,
            actions: assign({
              code: (_context, event) => event.code,
            }),
          },
        },
      },
      [STATES.VALIDATE_CODE]: {
        invoke: {
          src: SERVICES.SERVICE_VALIDATE_CODE,
          onDone: {
            target: STATES.SHOW_PASSWORD,
            actions: assign({
              isValid: (_context, { data }) => data.isValid,
            }),
          },
          onError: {
            target: STATES.SHOW_CODE_CONFIRM,
          },
        },
        entry: ACTIONS.TOGGLE_LOADING,
        exit: ACTIONS.TOGGLE_LOADING,
      },
      [STATES.SHOW_PASSWORD]: {
        on: {
          [EVENTS.COLLECT_PASSWORD]: {
            target: STATES.SAVE_PASSWORD,
            actions: assign({
              password: (_context, event) => event.password,
            }),
          },
        },
      },
      [STATES.SAVE_PASSWORD]: {
        invoke: {
          src: SERVICES.SERVICE_VALIDATE_PASSWORD,
          onDone: {
            target: STATES.SUCCESS,
          },
          onError: {
            target: STATES.SHOW_PASSWORD,
          },
        },
      },
      [STATES.SUCCESS]: {},
    },
  },
  {
    services: {
      [SERVICES.SERVICE_SEND_EMAIL]: async (context) => {
        await genericMock({ body: context.email });
      },
      [SERVICES.SERVICE_VALIDATE_CODE]: async (context) => {
        const data = await genericMock({
          body: context.code,
          data: { isValid: context.code === '123456' },
        });

        return data;
      },
      [SERVICES.SERVICE_VALIDATE_PASSWORD]: async (context) => {
        await genericMock({
          body: context.password
        });
      },
    },
    actions: {
      [ACTIONS.TOGGLE_LOADING]: assign({
        isLoading: (context) => !context.isLoading,
      }),
    },
  }
);
