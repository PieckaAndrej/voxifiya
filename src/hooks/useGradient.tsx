import { useContext } from 'react';
import { GradientContext } from '../components/GradientProvider';

export const useGradient = () => {
  return useContext(GradientContext);
};