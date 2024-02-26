import axios from 'axios';
import { environment } from '../environment';
import { User } from '../models/user';

const instance = axios.create({
  baseURL: `${environment.backendUrl}/api/user/`,
  withCredentials: true,
});

export const getMe = () => {
  return instance.get<User>('me');
};