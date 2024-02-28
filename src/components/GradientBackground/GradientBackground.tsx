import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './GradientBackground.module.scss';
import { useLocation } from 'react-router-dom';

interface GradientBackgroundProps {}

interface BackgroundGradient {
  color: string;
  className: string;
}

const GradientBackground: FC<GradientBackgroundProps> = () => {
  const [background, setBackground] = useState<BackgroundGradient>();
  const location = useLocation();

  const backgroundConfig: { [key: string]: BackgroundGradient } = useMemo(() => {
    return {
      login: {
        color: '#090a2b',
        className: styles.loginGradient
      },
      words: {
        color: '#0c0b43',
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

  const renderGradients = useCallback(() => {
    return Object.keys(backgroundConfig).map((name, index) => {
      return <div key={index}
        className={[styles.gradient, backgroundConfig[name].className].join(' ')}
        style={{ opacity: background == backgroundConfig[name] ? '1' : '0' }}></div>;
    });
  }, [backgroundConfig, background]);

  return (
    <div className={styles.GradientBackground}
      style={{ backgroundColor: background?.color }}
      data-testid="GradientBackground">
      {renderGradients()}
    </div>
  );
};

export default GradientBackground;
