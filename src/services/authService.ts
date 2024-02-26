import axios from "axios";
import { environment } from "../environment";

const instance = axios.create({
  baseURL: `${environment.backendUrl}/api/auth/`,
  withCredentials: true,
});

export const login = (user: string, password: string) => {
  return instance.post('login', {
    user,
    password
  });
}

export const getSession = () => {
  return instance.get('session');
}