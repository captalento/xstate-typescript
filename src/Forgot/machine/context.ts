export interface ForgotContext {
  email: string;
  code: string;
  password: string;
  isLoading: boolean;
  isValid: boolean;
  error: boolean;
}
