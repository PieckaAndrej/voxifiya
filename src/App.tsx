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
import Sidenav from './components/Sidenav/Sidenav';


const App: FC = () => {
  const auth = useAuth();

  return (
    <div className={styles.App} >
      <div className={styles.background}>
        <GradientBackground />
        <div className={styles.noise}></div>
      </div>
      {auth?.user && <Sidenav />}
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
