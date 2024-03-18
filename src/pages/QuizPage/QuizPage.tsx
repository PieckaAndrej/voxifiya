import { Box, CircularProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGradient } from '../../hooks/useGradient';
import { Answer } from '../../models/enums/answer';
import { QuizType } from '../../models/enums/quizType';
import { QuizQuestion } from '../../models/quiz';
import { getQuiz, postQuiz } from '../../services/quizService';
import styles from './QuizPage.module.scss';
import MultiChoiceQuestion from './components/MultiChoiceQuestion/MultiChoiceQuestion';

interface QuizPageProps { }

const QuizPage: FC<QuizPageProps> = () => {
  const auth = useAuth();
  const gradient = useGradient();
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (quizQuestions.length <= 1 && !!auth?.user?.defaultLanguage) {
      getQuiz(auth?.user?.defaultLanguage.code, QuizType.GuessForeign,
        quizQuestions.length > 0 ? quizQuestions[quizQuestions.length - 1].userSentenceId : null)
        .then((response) => {
          if (response.data) {
            setQuizQuestions(prevQuizQuestions => {
              return [...prevQuizQuestions, ...response.data];
            });
          } else if (response.status === 204) {
            setError('Enter at least 5 unique sentences in the sentences page');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth, quizQuestions, setQuizQuestions, setError]);

  // When the language is changed
  useEffect(() => {
    setQuizQuestions([]);
  }, [auth?.user?.defaultLanguage, setQuizQuestions])

  const onAnswer = (answer: Answer) => {
    gradient?.setAnswer(answer);

    postQuiz({
      userSentenceId: quizQuestions[0].userSentenceId,
      id: quizQuestions[0].id,
      answer,
    });
  };

  const onNextQuestion = () => {
    setQuizQuestions(prevQuizQuestions => {
      prevQuizQuestions.shift();

      return [...prevQuizQuestions];
    });
  };

  const renderQuestion = () => {
    switch (quizQuestions[0].type) {
      case QuizType.GuessForeign:
        return (
          <MultiChoiceQuestion
            question={quizQuestions[0]}
            onNextQuestion={onNextQuestion}
            onAnswer={onAnswer} />
        );
    }
  };

  return (
    <div className={styles.QuizPage} data-testid="QuizPage">
      {
        quizQuestions.length > 0 ? (
          renderQuestion()
        ) : (
          <Box display='flex' alignItems='center' width='100%' justifyContent='center'>
            {
              error ? (
                <span className={styles.error}>{error}</span>
              ) : (
                <CircularProgress sx={{ width: '70px', height: '70px' }} />
              )
            }
          </Box>
        )
      }
    </div>
  );
};

export default QuizPage;
