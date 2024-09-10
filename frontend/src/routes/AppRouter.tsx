import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import CallbackPage from '../pages/Callback';

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
