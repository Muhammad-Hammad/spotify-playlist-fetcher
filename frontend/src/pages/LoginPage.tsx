// pages/LoginPage.tsx
import React, { useEffect } from 'react';
import SpotifyButton from '../components/SpotifyButton';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <h1>Login to Your MVP</h1>
      <SpotifyButton onClick={handleLogin} text="Login" />
    </div>
  );
};

export default LoginPage;
