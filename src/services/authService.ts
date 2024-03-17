import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth/`,
  withCredentials: true,
});

export const postRegister = (username: string, email: string, password: string) => {
  return instance.post('register', {
    username,
    email,
    password
  });
};

export const postLogin = (user: string, password: string) => {
  return instance.post('login', {
    user,
    password
  });
};

export const postLogout = () => {
  return instance.post('logout');
};

export const getSession = () => {
  return instance.get('session');
};