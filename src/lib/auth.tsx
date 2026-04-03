import { loginWithEmailAndPassword, logout, registerWithEmailAndPassword, getCurrentUser } from '../features/auth/api/api';
import { Spinner } from '../components/Elements';
import storage from './storage';
import type { UserResponse, LoginValues, RegisterValues } from '../features/auth/types';
import { configureAuth } from 'react-query-auth';

async function handleUserResponse(data: UserResponse) {
  console.log('data mdlko;wqsa', data);
  const { tokens, user } = data;
  storage.setToken(tokens.access.token);
  return user;
}

async function loadUser() {
  if (!storage.getToken()) return null;

  try {
    const response = await getCurrentUser();
    return await handleUserResponse(response.data);
  } catch (error) {
    storage.clearToken(); // 🔥 important
    return null;
  }
}

async function loginFn(data: LoginValues) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response.data);
  return user;
}

async function registerFn(data: RegisterValues) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response.data);
  return user;
}

async function logoutFn() {
  await logout();
  storage.clearToken();
}

const authConfig = {
  userFn: loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-100 h-100-vh d-flex justify-content-center align-items-center">
        <Spinner size="lg" />
      </div>
    );
  },
};

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: authConfig.userFn,
  loginFn: authConfig.loginFn,
  registerFn: authConfig.registerFn,
  logoutFn: authConfig.logoutFn,
});
