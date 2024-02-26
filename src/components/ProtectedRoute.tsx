import { ReactNode, useCallback, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getSession } from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getMe } from '../services/userService';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const [csrfToken, setCsrfToken] = useLocalStorage('csrfToken', null);
  const navigate = useNavigate();

  const callGetMe = useCallback(() => {
    getMe()
      .then((response) => {
        auth?.login(response.data);
      })
      .catch(() => {
        console.log("me catch")
        auth?.logout();
      })
      .finally(() => {
        if (!auth?.user) {
          // user is not authenticated
          navigate('/login');
        }
      });
  }, [auth]);

  useEffect(() => {
    if (!csrfToken) {
      auth?.logout();
    }

    if (!Cookies.get('Voxifiya.SessionId')) {
      Cookies.set('X-CSRF-Token', csrfToken, { secure: true });

      getSession()
        .then(() => {
          setCsrfToken(Cookies.get('X-CSRF-Token'));
          callGetMe();
        })
        .catch(() => {
          console.log("session catch")
          auth?.logout();
        });
    } else {
      callGetMe();
    }

  }, []);

  return auth?.user ? children : <></>;
};