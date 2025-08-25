'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { userStorage } from '@/lib/storage';
import { dummyCustomer, dummyServiceProviders, dummyAdmin } from '@/data/dummy-data';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = userStorage.get();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials against dummy data
      let foundUser: User | null = null;
      
      if (email === 'admin@site.com' && password === 'Admin@123') {
        foundUser = dummyAdmin;
      } else if (email === 'customer@site.com' && password === 'Customer@123') {
        foundUser = dummyCustomer;
      } else {
        // Check service providers
        const provider = dummyServiceProviders.find(p => p.email === email);
        if (provider) {
          const passwordMap: Record<string, string> = {
            'painter@site.com': 'Painter@123',
            'contractor@site.com': 'Contractor@123',
            'electrician@site.com': 'Electrician@123',
            'carpenter@site.com': 'Carpenter@123'
          };
          
          if (passwordMap[email] === password) {
            foundUser = provider;
          }
        }
      }
      
      if (foundUser) {
        setUser(foundUser);
        userStorage.set(foundUser);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    userStorage.clear();
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
