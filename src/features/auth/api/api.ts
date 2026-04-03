import api from '../../../lib/axios';
import type { LoginValues, RegisterValues, User } from '../types/index';

export const loginWithEmailAndPassword = (data: LoginValues) => {
  return api.post('auth/login', data);
};

export const logout = () => {
  return api.post('auth/logout');
};

export const registerWithEmailAndPassword = (data: RegisterValues) => {
  return api.post('auth/register', data);
};

export const getCurrentUser = () => {
  return api.get('auth/me');
};
