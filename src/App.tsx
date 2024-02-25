import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './App.module.scss';

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
      input: {
        color: '#51111e',
        className: styles.inputGradient
      },
    };
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case '/input':
        setBackground(backgroundConfig.input);
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
        <Outlet />
      </div>
    </div>
  );
};

export default App;
