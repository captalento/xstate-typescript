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
    }
  | {
      value: STATES.VALIDATE_CODE;
      context: ForgotContext;
    }
  | {
      value: STATES.SHOW_PASSWORD;
      context: ForgotContext;
    }
  | {
      value: STATES.CODE_IS_VALID_GATEWAY;
      context: ForgotContext;
  }
  | {
    value: STATES. SAVE_PASSWORD;
    context: ForgotContext;
  }
  | {
    value: STATES.SUCCESS;
    context: ForgotContext;
  };

 
