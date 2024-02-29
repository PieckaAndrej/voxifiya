import React, { FC } from 'react';
import styles from './QuizPage.module.scss';

interface QuizPageProps {}

const QuizPage: FC<QuizPageProps> = () => (
  <div className={styles.QuizPage} data-testid="QuizPage">
    QuizPage Component
  </div>
);

export default QuizPage;
