import React from 'react';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function Redirect({ page }) {
  const { auth, setAuth } = useAuth();

  if (auth.token) {
    switch (auth.userType) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'customer':
        return <Navigate to="/customer/dashboard" replace />;
      case 'vendor':
        return <Navigate to="/vendor/dashboard" replace />;
      default:
        setAuth(null);
        localStorage.removeItem('auth');
        return page === 'signup' ? <Signup /> : <Login />;
    }
  } else {
    return page === 'signup' ? <Signup /> : <Login />;
  }
}

export default Redirect;
