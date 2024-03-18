import { Button } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { Answer } from '../../../../models/enums/answer';
import { QuizQuestion, WrongAnswer } from '../../../../models/quiz';
import styles from './MultiChoiceQuestion.module.scss';
import { AdsClick, SpaceBar } from '@mui/icons-material';

interface MultiChoiceQuestionProps {
  question: QuizQuestion;
  onAnswer: (answer: Answer) => void;
  onNextQuestion: () => void;
}

const MultiChoiceQuestion: FC<MultiChoiceQuestionProps> = (props) => {
  const [answers, setAnswers] = useState<WrongAnswer[]>([]);
  const [answered, setAnswered] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  useEffect(() => {
    const answers = [...props.question.wrongAnswers, {
      answer: props.question.correctAnswer,
      userSentenceId: props.question.userSentenceId
    }];

    answers.sort(() => Math.random() - 0.5);

    setAnswers(answers);
    setAnswered(null);
  }, [props.question, setAnswers, setAnswered]);

  const callShowHint = useCallback(() => {
    if (answered !== null) {
      setShowHint(true);
    }
  }, [answered, setShowHint]);

  useEffect(() => {
    if (answered === null) {
      setShowHint(false);
    } else {
      setTimeout(() => {
        callShowHint();
      }, 3000);
    }
  }, [answered, setShowHint, callShowHint]);

  const onAnswerClick = useCallback((id: string) => {
    if (!answered) {
      props.onAnswer(id === props.question.userSentenceId ? Answer.Correct : Answer.Wrong);
      setAnswered(id);
    } else {
      props.onNextQuestion();
    }
  }, [props, answered, setAnswered]);

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
        <div className={styles.answersGrid}>
          {renderAnswers()}
        </div>
      </div>
      {
        !!answered &&
        <div className={styles.nextQuestion} onClick={() => props.onNextQuestion()}></div>
      }
      {
        showHint &&
        <div className={styles.hint}>
          <span>
            Press spacebar or click for next question
          </span>
          <div className={styles.hintIcons}>
            <SpaceBar />
            /
            <AdsClick />
          </div>
        </div>
      }
    </div>
  );
};

export default MultiChoiceQuestion;
