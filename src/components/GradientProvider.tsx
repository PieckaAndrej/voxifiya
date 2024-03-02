import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import { Answer } from '../models/enums/answer';

export interface Gradient {
  answer: Answer | null;
  countKey: number;
  setAnswer: (newAnswer: Answer) => void;
}

export const GradientContext = createContext<Gradient | null>(null);

export const GradientProvider = ({ children }: { children: ReactNode }) => {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [count, setCount] = useState<number>(0);

  const changeAnswer = useCallback((newAnswer: Answer) => {
    setAnswer(newAnswer);
    setCount(prevCount => prevCount + 1);
  }, [setAnswer, setCount]);

  const value = useMemo<Gradient>(() => ({
    answer,
    countKey: count,
    setAnswer: changeAnswer
  }), [answer, count, changeAnswer]);

  return <GradientContext.Provider value={value}>{children}</GradientContext.Provider>;
};