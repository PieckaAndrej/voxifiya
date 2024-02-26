import { createContext, useMemo, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { useLocalStorage } from "./useLocalStorage";

export interface Auth {
  user: User;
  login: (data: User) => void;
  logout: () => void;
}

const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User>("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: User) => {
    setUser(data);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo<Auth>(() => ({
    user,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};