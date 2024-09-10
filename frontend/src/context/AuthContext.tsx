import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  loginWithSpotify,
  logoutWithSpotify,
} from '../features/auth/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (authState: boolean) => void;
  login: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Function to check if the token is valid
  const checkAuthToken = () => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    // Initial authentication check
    checkAuthToken();

    // Handle changes to localStorage from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authToken') {
        checkAuthToken(); // Check the updated token
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async () => {
    try {
      await loginWithSpotify();
      return true;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      logoutWithSpotify();
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
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
