import { QuizType } from './enums/quizType';

export interface QuizQuestion {
  id: string;
  userSentenceId: string;
  question: string;
  correctAnswer: string;
  wrongAnswers: WrongAnswer[];
  type: QuizType;
}

export interface WrongAnswer {
  userSentenceId: string;
  answer: string;
}