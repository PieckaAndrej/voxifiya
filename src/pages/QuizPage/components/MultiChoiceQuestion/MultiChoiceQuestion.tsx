import { Button } from '@mui/material';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Answer } from '../../../../models/enums/answer';
import { QuizQuestion, WrongAnswer } from '../../../../models/quiz';
import styles from './MultiChoiceQuestion.module.scss';
import { AdsClick, SpaceBar, TouchApp } from '@mui/icons-material';
import { useIsMobile } from '../../../../hooks/useIsMobile';

interface MultiChoiceQuestionProps {
  question: QuizQuestion;
  onAnswer: (answer: Answer) => void;
  onNextQuestion: () => void;
}

const MultiChoiceQuestion: FC<MultiChoiceQuestionProps> = (props) => {
  const [answers, setAnswers] = useState<WrongAnswer[]>([]);
  const [answered, setAnswered] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const answers = [...props.question.wrongAnswers, {
      answer: props.question.correctAnswer,
      userSentenceId: props.question.userSentenceId
    }];

    answers.sort(() => Math.random() - 0.5);

    setAnswers(answers);
    setAnswered(null);
  }, [props.question, setAnswers, setAnswered]);

  const callShowHint = () => {
    if (answered !== null) {
      setShowHint(true);
    }
  };

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
            {
              isMobile ? (
                'Tap for next question'
              ) : (
                'Press spacebar or click for next question'
              )
            }
          </span>
          <div className={styles.hintIcons}>
            {
              isMobile ? (
                <TouchApp />
              ) : (
                <Fragment>
                  <SpaceBar />
                  /
                  <AdsClick />
                </Fragment>
              )
            }
          </div>
        </div>
      }
    </div>
  );
};

export default MultiChoiceQuestion;
