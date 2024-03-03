import axios from 'axios';
import { environment } from '../environment';
import { QuizType } from '../models/enums/quizType';
import { QuizAnswer, QuizQuestion } from '../models/quiz';

const instance = axios.create({
  baseURL: `${environment.backendUrl}/api/quiz/`,
  withCredentials: true,
});

export const getQuiz = (language: string, type: QuizType, noOfQuestions: number = 5) => {
  return instance.get<QuizQuestion[]>('', {
    params: {
      language,
      type,
      noOfQuestions
    }
  });
};

export const postQuiz = (quiz: QuizAnswer) => {
  return instance.post('', {
    id: quiz.id,
    userSentenceId: quiz.userSentenceId,
    answer: quiz.answer
  });
};