import api from '../../../lib/axios';
import type { LoginValues, RegisterValues, User } from '../types/index';
import { useQueryClient, keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';

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

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const response = await api.post('/auth/verify-register-otp', data);
  return response.data;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
    retry: 0,
  });
};
