import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import GradientBackground from './components/GradientBackground/GradientBackground';
import { ProtectedRoute } from './components/ProtectedRoute';
import Sidenav from './components/Sidenav/Sidenav';
import UserMenu from './components/UserMenu/UserMenu';
import { useAuth } from './hooks/useAuth';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import WordInputPage from './pages/WordInputPage/WordInputPage';
import QuizPage from './pages/QuizPage/QuizPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';


const App: FC = () => {
  const auth = useAuth();

  return (
    <div className={styles.App} >
      <div className={styles.background}>
        <GradientBackground />
        <div className={styles.noise}></div>
      </div>
      {
        auth?.user &&
        <>
          <Sidenav />
          <div className={styles.menu}>
            <UserMenu />
          </div>
        </>
      }
      <div className={styles.container}>
        {
          !auth?.loading ? (
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
              <Route
                path="quiz"
                element={
                  <ProtectedRoute>
                    <QuizPage />
                  </ProtectedRoute>
                }
              />
              {
                auth?.user ? (
                  <>
                    <Route path="/" element={<Navigate to={'/words'} />} />
                    <Route path="login" element={<Navigate to={'/'} />} />
                    <Route path="register" element={<Navigate to={'/'} />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                  </>
                )
              }
            </Routes>
          ) : (
            <Box display='flex' alignItems='center' width='100%' justifyContent='center'>
              <CircularProgress sx={{width: '70px', height: '70px'}} />
            </Box>
          )
        }
      </div>
    </div>
  );
};

export default App;
