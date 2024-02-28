import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/user';
import { getMe } from '../services/userService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Cookies from 'js-cookie';
import { getSession, postLogout } from '../services/authService';

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
  const [csrfToken, setCsrfToken] = useLocalStorage('csrfToken', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(async (navigatePath: string | undefined = undefined) => {
    if (!csrfToken) {
      setCsrfToken(Cookies.get('X-CSRF-Token'));
    }

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
  }, [setUser, setLoading, navigate, csrfToken, setCsrfToken]);

  // call this function to sign out logged in user
  const logout = useCallback((navigatePath: string | undefined = undefined) => {
    setUser(undefined);
    setLoading(false);

    setCsrfToken(null);

    if (Cookies.get('Voxifiya.SessionId')) {
      postLogout();
    }

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

  useEffect(() => {
    if (!Cookies.get('Voxifiya.SessionId')) {
      if (csrfToken) {
        // Needs to be partitioned and js-cookie doesn't support it yet
        // Cookies.set('X-CSRF-Token', csrfToken, { secure: true, sameSite: 'None' });
        document.cookie = `X-CSRF-Token=${csrfToken}; path=/; secure; samesite=none; Partitioned`;

        getSession()
          .then(() => {
            setCsrfToken(Cookies.get('X-CSRF-Token'));
            value?.login();
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        value?.logout();
      }
    } else if (!value?.user && csrfToken) {
      value?.login();
    }
  }, [value, csrfToken, setCsrfToken, setLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};