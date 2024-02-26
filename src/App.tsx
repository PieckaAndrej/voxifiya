import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import styles from './App.module.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import WordInputPage from './pages/WordInputPage/WordInputPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

interface BackgroundGradient {
  color: string;
  className: string;
}

const App: FC = () => {
  const location = useLocation();
  const [background, setBackground] = useState<BackgroundGradient>();

  const backgroundConfig: {[key: string]: BackgroundGradient} = useMemo(() => {
    return {
      login: {
        color: '#090a2b',
        className: styles.loginGradient
      },
      words: {
        color: '#51111e',
        className: styles.wordsGradient
      },
    };
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case '/words':
        setBackground(backgroundConfig.words);
        break;
      case '/login':
        setBackground(backgroundConfig.login);
        break;
    }
  }, [location, background, backgroundConfig]);

  const getGradients = useCallback(() => {
    return Object.keys(backgroundConfig).map((name, index) => {
      return <div key={index}
        className={[styles.gradient, backgroundConfig[name].className].join(' ')}
        style={{opacity: background == backgroundConfig[name] ? '1' : '0'}}></div>;
    });
  }, [backgroundConfig, background]);

  return (
    <div className={styles.App} style={{backgroundColor: background?.color}}>
      {getGradients()}
      <div className={styles.noise}></div>
      <div className={styles.container}>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="words"
              element={
                <ProtectedRoute>
                  <WordInputPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
};

export default App;
