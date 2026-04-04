export type Token = {
  token: string;
  expires: string;
};

export type Tokens = {
  access: Token;
  refresh: Token;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPassword = {
  email: string;
};
export type verifyForgotPassword = {
  email: string;
  otp: number;
};

export type ResetPassword = {
  email: string;
  password: string;
  token: string;
};

export type changePassword = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type User = {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  phoneNumber: string;
  role: string;
};

export type UserResponse = {
  tokens: Tokens;
  user: User;
};
