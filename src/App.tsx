import { Box, CircularProgress } from '@mui/material';
import { FC, Fragment, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import GradientBackground from './components/GradientBackground/GradientBackground';
import LanguageSelect from './components/LanguageSelect/LanguageSelect';
import { ProtectedRoute } from './components/ProtectedRoute';
import Sidenav from './components/Sidenav/Sidenav';
import UserMenu from './components/UserMenu/UserMenu';
import { useAuth } from './hooks/useAuth';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import QuizPage from './pages/QuizPage/QuizPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import WordInputPage from './pages/WordInputPage/WordInputPage';


const App: FC = () => {
  const auth = useAuth();
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);

  useEffect(() => {
    if (auth?.user && !auth.user?.defaultLanguage) {
      setLanguageDialogOpen(true);
    }
  }, [auth, setLanguageDialogOpen]);

  return (
    <div className={styles.App} >
      <div className={styles.background}>
        <GradientBackground />
        <div className={styles.noise}></div>
      </div>
      <div className={`${(auth?.user ? styles.contentFlex : '')} ${styles.content}`}>
        {
          auth?.user &&
          <Fragment>
            <Sidenav />
            <div className={styles.menu}>
              <UserMenu />
            </div>
            <LanguageSelect canClose={false}
              dialogOpen={languageDialogOpen}
              setDialogOpen={setLanguageDialogOpen} />
          </Fragment>
        }
        <div className={styles.page}>
          {
            !auth?.loading ? (
              <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route
                  path="sentences"
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
                    <Fragment>
                      <Route path="/" element={<Navigate to={'/sentences'} />} />
                      <Route path="login" element={<Navigate to={'/'} />} />
                      <Route path="register" element={<Navigate to={'/'} />} />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Route path="/" element={<HomePage />} />
                      <Route path="login" element={<LoginPage />} />
                      <Route path="register" element={<RegisterPage />} />
                    </Fragment>
                  )
                }
              </Routes>
            ) : (
              <Box display='flex' alignItems='center' width='100%' justifyContent='center'>
                <CircularProgress sx={{ width: '70px', height: '70px' }} />
              </Box>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default App;
