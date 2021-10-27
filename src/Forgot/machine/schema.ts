import { ForgotContext } from './context';
import { STATES } from './enums';

export type ForgotTypestate =
  | {
      value: STATES.SHOW_EMAIL;
      context: ForgotContext;
    }
  | {
      value: STATES.SEND_EMAIL;
      context: ForgotContext;
    }
  | {
      value: STATES.INFO_EMAIL;
      context: ForgotContext;
    }
  | {
    value: STATES.SHOW_CODE_CONFIRM;
    context: ForgotContext;
  };
