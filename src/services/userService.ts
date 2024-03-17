import axios from 'axios';
import { User } from '../models/user';
import { Language } from '../models/language';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/user/`,
  withCredentials: true,
});

export const getMe = () => {
  return instance.get<User>('me');
};

export const patchMe = (defaultLanguage: Language) => {
  return instance.patch<User>('me', {
    defaultLanguage
  });
};