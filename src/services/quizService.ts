import axios from 'axios';
import { environment } from '../environment';
import { QuizType } from '../models/enums/quizType';
import { QuizQuestion } from '../models/quiz';

const instance = axios.create({
  baseURL: `${environment.backendUrl}/api/quiz/`,
  withCredentials: true,
});

export const GetQuiz = (language: string, type: QuizType, noOfQuestions: number = 5) => {
  return instance.get<QuizQuestion[]>('', {
    params: {
      language,
      type,
      noOfQuestions
    }
  });
};