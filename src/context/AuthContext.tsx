import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/types';

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      const userData = { id: user.id, username: user.username };
      setCurrentUser(userData);
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      sessionStorage.setItem('token', 'fake-jwt-token');
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.username === username)) {
      return false; // user already exist
    }

    const newUserId = Date.now().toString();
    const newUser = { id: newUserId, username, password };
    users.push(newUser);
    sessionStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};