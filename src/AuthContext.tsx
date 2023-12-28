// src/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface AuthContextType {
  auth: {
    isAuthenticated: boolean;
    user: any; // Replace 'any' with a more specific type or interface for your user
    token: string | null;
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setAuth({ isAuthenticated: true, user: data.user, token: data.token });
        localStorage.setItem('token', data.token);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
