import React, { FC } from 'react';
import styles from './QuizPage.module.scss';
import { useGradient } from '../../hooks/useGradient';
import { Button } from '@mui/material';
import { Answer } from '../../models/enums/answer';

interface QuizPageProps { }

const QuizPage: FC<QuizPageProps> = () => {
  const gradient = useGradient();

  return (
    <div className={styles.QuizPage} data-testid="QuizPage">
      <Button onClick={() => {gradient?.setAnswer(Answer.WRONG)}}>
        wrong
      </Button>
      <Button onClick={() => {gradient?.setAnswer(Answer.CORRECT)}}>
        correct
      </Button>
    </div>
  );
};

export default QuizPage;
