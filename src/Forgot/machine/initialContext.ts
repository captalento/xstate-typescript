import { ForgotContext } from './context';

export const initialContext: ForgotContext = {
  email: '',
  code: '',
  password: '',
  isLoading: false,
  isValid: false,
  error: false,
};
