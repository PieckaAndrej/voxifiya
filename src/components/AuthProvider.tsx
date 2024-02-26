import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/user';
import { getMe } from '../services/userService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Cookies from 'js-cookie';

export interface Auth {
  user?: User;
  loading: boolean,
  login: (navigatePath?: string) => void;
  logout: (navigatePath?: string) => void;
}

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [, setCsrfToken] = useLocalStorage('csrfToken', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(async (navigatePath: string | undefined = undefined) => {
    getMe()
      .then((response) => {
        setUser(response.data);

        if (navigatePath) {
          navigate(navigatePath);
        }
      })
      .catch(() => {
        setUser(undefined);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUser, setLoading, navigate]);

  // call this function to sign out logged in user
  const logout = useCallback((navigatePath: string | undefined = undefined) => {
    setUser(undefined);
    setLoading(false);

    setCsrfToken(null);
    Cookies.remove('X-CSRF-Token');

    if (navigatePath) {
      navigate(navigatePath, { replace: true });
    }
  }, [setUser, navigate, setLoading, setCsrfToken]);

  const value = useMemo<Auth>(() => ({
    user,
    loading,
    login,
    logout,
  }), [user, loading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};