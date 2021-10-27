import { EVENTS } from './enums';

export type ForgotEvent =
  | { type: EVENTS.BACK_TO_EMAIL }
  | { type: EVENTS.COLLECT_EMAIL; email: string }
  | { type: EVENTS.SEND_TO_CODE };
