import { Answer } from './enums/answer';
import { QuizType } from './enums/quizType';

export interface Quiz {
  id: string;
  userSentenceId: string;
}

export interface QuizQuestion extends Quiz {
  question: string;
  correctAnswer: string;
  wrongAnswers: WrongAnswer[];
  type: QuizType;
}

export interface QuizAnswer extends Quiz {
  answer: Answer;
}

export interface WrongAnswer {
  userSentenceId: string;
  answer: string;
}