import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './GradientBackground.module.scss';
import { useLocation } from 'react-router-dom';
import { customColors } from '../../theme';
import { useGradient } from '../../hooks/useGradient';
import { Answer } from '../../models/enums/answer';

interface GradientBackgroundProps {}

interface BackgroundGradient {
  color: string;
  className: string;
}

const GradientBackground: FC<GradientBackgroundProps> = () => {
  const [background, setBackground] = useState<BackgroundGradient>();
  const location = useLocation();
  const gradient = useGradient();

  const backgroundConfig: { [key: string]: BackgroundGradient } = useMemo(() => {
    return {
      login: {
        color: customColors.loginGradient.bg,
        className: styles.loginGradient
      },
      words: {
        color: customColors.wordsGradient.bg,
        className: styles.wordsGradient
      },
      quiz: {
        color: customColors.quizGradient.bg,
        className: styles.quizGradient
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
      case '/quiz':
        setBackground(backgroundConfig.quiz);
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
      {
        gradient?.answer === Answer.CORRECT &&
        <div key={gradient.countKey}>
          <div className={[styles.answerGradient, styles.correctGradientBackground].join(' ')}></div>
          <div className={[styles.answerGradient, styles.correctGradient].join(' ')}></div>
          <div className={[styles.answerGradient, styles.correctGradientHighlight].join(' ')}></div>
          <div className={[styles.answerGradient, styles.correctGradientHighlight2].join(' ')}></div>
        </div>
      }
      {
        gradient?.answer === Answer.WRONG &&
        <div key={gradient.countKey}>
          <div className={[styles.answerGradient, styles.wrongGradientBackground].join(' ')}></div>
          <div className={[styles.answerGradient, styles.wrongGradient].join(' ')}></div>
          <div className={[styles.answerGradient, styles.wrongGradientHighlight].join(' ')}></div>
          <div className={[styles.answerGradient, styles.wrongGradientHighlight2].join(' ')}></div>
          <div className={[styles.answerGradient, styles.wrongGradientHighlight3].join(' ')}></div>
        </div>
      }
    </div>
  );
};

export default GradientBackground;
