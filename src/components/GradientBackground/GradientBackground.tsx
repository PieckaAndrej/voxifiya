import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './GradientBackground.module.scss';
import { useLocation } from 'react-router-dom';
import { customColors } from '../../theme';
import { useGradient } from '../../hooks/useGradient';
import { Answer } from '../../models/enums/answer';

interface GradientBackgroundProps { }

interface BackgroundGradient {
  color: string;
  className: string;
  path: string;
}

const GradientBackground: FC<GradientBackgroundProps> = () => {
  const [background, setBackground] = useState<BackgroundGradient>();
  const location = useLocation();
  const gradient = useGradient();

  const backgroundConfig: { [key: string]: BackgroundGradient } = useMemo(() => {
    return {
      register: {
        color: customColors.registerGradient.bg,
        className: styles.registerGradient,
        path: '/register'
      },
      login: {
        color: customColors.loginGradient.bg,
        className: styles.loginGradient,
        path: '/login'
      },
      words: {
        color: customColors.wordsGradient.bg,
        className: styles.wordsGradient,
        path: '/words'
      },
      quiz: {
        color: customColors.quizGradient.bg,
        className: styles.quizGradient,
        path: '/quiz'
      },
    }
  }, []);

  useEffect(() => {
    for (const key of Object.keys(backgroundConfig)) {
      if (location.pathname === backgroundConfig[key].path) {
        setBackground(backgroundConfig[key]);
      }
    }
  }, [location, backgroundConfig, setBackground]);

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
      {
        location.pathname === '/register' &&
        <div>
          <div className={[styles.answerGradient, styles.registerFlash1].join(' ')}></div>
          <div className={[styles.answerGradient, styles.registerFlash2].join(' ')}></div>
          <div className={[styles.answerGradient, styles.registerFlash3].join(' ')}></div>
        </div>
      }
      {
        gradient?.answer === Answer.Correct &&
        <div key={gradient.countKey}>
          <div className={[styles.answerGradient, styles.correctGradientBackground].join(' ')}></div>
          <div className={[styles.answerGradient, styles.correctGradient].join(' ')}></div>
          <div className={[styles.answerGradient, styles.correctGradientHighlight].join(' ')}></div>
          <div className={[styles.answerGradient, styles.correctGradientHighlight2].join(' ')}></div>
        </div>
      }
      {
        gradient?.answer === Answer.Wrong &&
        <div key={gradient.countKey}>
          <div className={[styles.answerGradient, styles.wrongGradientBackground].join(' ')}></div>
          <div className={[styles.answerGradient, styles.wrongGradient].join(' ')}></div>
          <div className={[styles.answerGradient, styles.wrongGradientHighlight].join(' ')}></div>
          <div className={[styles.answerGradient, styles.wrongGradientHighlight2].join(' ')}></div>
        </div>
      }
    </div>
  );
};

export default GradientBackground;
