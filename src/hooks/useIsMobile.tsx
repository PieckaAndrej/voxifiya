import { useContext } from 'react';
import { IsMobileContext } from '../components/IsMobileProvider';

export const useIsMobile = () => {
  return useContext(IsMobileContext);
};