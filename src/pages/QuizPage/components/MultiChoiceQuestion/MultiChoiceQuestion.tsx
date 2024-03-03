import { Button } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { Answer } from '../../../../models/enums/answer';
import { QuizQuestion, WrongAnswer } from '../../../../models/quiz';
import styles from './MultiChoiceQuestion.module.scss';

interface MultiChoiceQuestionProps {
  question: QuizQuestion;
  onAnswer: (answer: Answer) => void;
  onNextQuestion: () => void;
}

const MultiChoiceQuestion: FC<MultiChoiceQuestionProps> = (props) => {
  const [answers, setAnswers] = useState<WrongAnswer[]>([]);
  const [answered, setAnswered] = useState<string | null>(null);

  useEffect(() => {
    const answers = [...props.question.wrongAnswers, {
      answer: props.question.correctAnswer,
      userSentenceId: props.question.userSentenceId
    }];

    answers.sort(() => Math.random() - 0.5);

    setAnswers(answers);
    setAnswered(null);
  }, [props.question, setAnswers, setAnswered]);

  const onAnswerClick = useCallback((id: string) => {
    props.onAnswer(id === props.question.userSentenceId ? Answer.Correct : Answer.Wrong);
    setAnswered(id);
  }, [props.question.userSentenceId, setAnswered]);

  const getAnsweredColor = useCallback((id: string) => {
    if (answered) {
      if (id === props.question.userSentenceId) {
        return 'success';
      } else if (id === answered) {
        return 'error';
      }
    }

    return 'primary';
  }, [answered, props.question.userSentenceId]);

  const renderAnswers = useCallback(() => {
    return answers.map((a, index) => {
      return (
        <Button key={index}
          onClick={() => onAnswerClick(a.userSentenceId)}
          variant='outlined'
          color={getAnsweredColor(a.userSentenceId)}
          sx={{ width: '100%' }}
          size='large'>
          {a.answer}
        </Button>
      );
    });
  }, [answers, onAnswerClick, getAnsweredColor]);

  return (
    <div className={styles.MultiChoiceQuestion} data-testid="MultiChoiceQuestion">
      <div className={styles.question}>{props.question.question}</div>
      <div className={styles.answers}>
        {renderAnswers()}
      </div>
      {
        !!answered &&
        <div className={styles.nextQuestion} onClick={() => props.onNextQuestion()}></div>
      }
    </div>
  );
};

export default MultiChoiceQuestion;
