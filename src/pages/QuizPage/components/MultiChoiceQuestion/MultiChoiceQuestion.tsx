import React, { FC, useCallback } from 'react';
import styles from './MultiChoiceQuestion.module.scss';
import { QuizQuestion } from '../../../../models/quiz';
import { Answer } from '../../../../models/enums/answer';
import { Button } from '@mui/material';

interface MultiChoiceQuestionProps {
  question: QuizQuestion;
  onAnswer: (answer: Answer) => void;
}

const MultiChoiceQuestion: FC<MultiChoiceQuestionProps> = (props) => {

  const onAnswerClick = useCallback((id: string) => {
    props.onAnswer(id === props.question.userSentenceId ? Answer.Correct : Answer.Wrong);
  }, [props]);

  const renderAnswers = useCallback(() => {
    const answers = [...props.question.wrongAnswers, {
      answer: props.question.correctAnswer,
      userSentenceId: props.question.userSentenceId
    }];

    answers.sort(() => Math.random() - 0.5);

    return answers.map((wa, index) => {
      return (
        <Button key={index}
          onClick={() => onAnswerClick(wa.userSentenceId)}
          variant='outlined'
          size='large'
          sx={{width: '100%'}}>
          {wa.answer}
        </Button>
      );
    });
  }, [props.question, onAnswerClick]);

  return (
    <div className={styles.MultiChoiceQuestion} data-testid="MultiChoiceQuestion">
      <div className={styles.question}>{props.question.question}</div>
      <div className={styles.answers}>
        {renderAnswers()}
      </div>
    </div>
  );
};

export default MultiChoiceQuestion;
