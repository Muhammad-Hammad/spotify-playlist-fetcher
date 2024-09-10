import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  // Effect to handle changes from other windows/tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authToken') {
        const authToken = localStorage.getItem('authToken');
        setIsAuthenticated(!!authToken);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setIsAuthenticated]);

  // Effect to handle local storage check and auth
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoute;
