import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { name: string; email: string; role: 'admin' | 'editor' | 'moderator' } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    if (email === 'admin@icai.org' && password === 'admin') {
      setUser({ name: 'Admin User', email: 'admin@icai.org', role: 'admin' });
      return true;
    } else if (email === 'editor@icai.org' && password === 'editor') {
      setUser({ name: 'Editor User', email: 'editor@icai.org', role: 'editor' });
      return true;
    } else if (email === 'moderator@icai.org' && password === 'moderator') {
      setUser({ name: 'Moderator User', email: 'moderator@icai.org', role: 'moderator' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
