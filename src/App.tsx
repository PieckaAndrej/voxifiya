import Cookies from 'js-cookie';
import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import GradientBackground from './components/GradientBackground/GradientBackground';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { useLocalStorage } from './hooks/useLocalStorage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import WordInputPage from './pages/WordInputPage/WordInputPage';
import { getSession } from './services/authService';


const App: FC = () => {
  const [csrfToken, setCsrfToken] = useLocalStorage('csrfToken', null);
  const auth = useAuth();


  useEffect(() => {
    if (!Cookies.get('Voxifiya.SessionId')) {
      if (csrfToken) {
        // Needs to be partitioned and js-cookie doesn't support it yet
        // Cookies.set('X-CSRF-Token', csrfToken, { secure: true, sameSite: 'None' });
        document.cookie = `X-CSRF-Token=${csrfToken}; path=/; secure; samesite=none; Partitioned`;

        getSession()
          .then(() => {
            setCsrfToken(Cookies.get('X-CSRF-Token'));
            auth?.login();
          })
          .catch(() => {
            auth?.logout();
          });
      } else {
        auth?.logout();
      }
    } else if (!auth?.user) {
      auth?.login();
    }
  }, [auth, csrfToken, setCsrfToken]);

  return (
    <div className={styles.App} >
      <GradientBackground />
      <div className={styles.noise}></div>
      <div className={styles.container}>
        {
          !auth?.loading &&
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="words"
              element={
                <ProtectedRoute>
                  <WordInputPage />
                </ProtectedRoute>
              }
            />
            {
              auth?.user ? (
                <>
                  <Route path="/" element={<Navigate to={'/words'} />} />
                  <Route path="login" element={<Navigate to={'/'} />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="login" element={<LoginPage />} />
                </>
              )
            }
          </Routes>
        }
      </div>
    </div>
  );
};

export default App;
