import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

export const IsMobileContext = createContext<boolean>(false);

export const IsMobileProvider = ({ children }: { children: ReactNode }) => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const value = useMemo<boolean>(() => width <= 768, [width]);

  return <IsMobileContext.Provider value={value}>{children}</IsMobileContext.Provider>;
};