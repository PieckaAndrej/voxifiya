import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return auth?.user ? children : <Navigate to={'/login'}/>;
};