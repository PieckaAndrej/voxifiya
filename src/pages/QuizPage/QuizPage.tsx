import { Box, CircularProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGradient } from '../../hooks/useGradient';
import { Answer } from '../../models/enums/answer';
import { QuizType } from '../../models/enums/quizType';
import { QuizQuestion } from '../../models/quiz';
import { GetQuiz } from '../../services/quizService';
import styles from './QuizPage.module.scss';
import MultiChoiceQuestion from './components/MultiChoiceQuestion/MultiChoiceQuestion';

interface QuizPageProps {}

const QuizPage: FC<QuizPageProps> = () => {
  const auth = useAuth();
  const gradient = useGradient();
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    GetQuiz(auth?.user?.defaultLanguage ?? '', QuizType.GuessForeign)
      .then((response) => {
        setQuizQuestions(prevQuizQuestions => {
          return [...prevQuizQuestions, ...response.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auth, setQuizQuestions]);

  const onAnswer = (answer: Answer) => {
    gradient?.setAnswer(answer);
  };

  const renderQuestion = () => {
    switch (quizQuestions[0].type) {
      case QuizType.GuessForeign:
        return (
          <MultiChoiceQuestion question={quizQuestions[0]} onAnswer={onAnswer} />
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
            <CircularProgress sx={{width: '70px', height: '70px'}} />
          </Box>
        )
      }
    </div>
  );
};

export default QuizPage;
