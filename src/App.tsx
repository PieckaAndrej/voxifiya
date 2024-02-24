import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './App.module.scss';
import { FC, useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';

const App: FC = () => {
  const location = useLocation();
  const [background, setBackground] = useState<{ color: string, position: string }>();
  const [transitionDuration, setTransitionDuration] = useState('');

  const backgroundConfig = useMemo(() => {
    return {
      login: {
        color: '#090a2b',
        position: '0% 0%'
      },
      input: {
        color: '#51111e',
        position: '100% 100%'
      },
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTransitionDuration('60s');
    }, 100)
  }, [])

  const navigate = useNavigate();

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

  return (
    <div className={styles.App} style={{
      backgroundPosition: background?.position,
      backgroundColor: background?.color,
      transitionDuration
      }}>
      <div className={styles.noise}></div>
      <Button onClick={() => navigate('/input')}>
        hello
      </Button>
      <Button onClick={() => navigate('/login')}>
        h 
      </Button>
      <Outlet />
    </div>
  );
};

export default App;
