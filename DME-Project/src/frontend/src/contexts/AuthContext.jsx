import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logoutUser, initializeAuth, selectAuth, selectAuthLoading } from '../store/slices/authSlice';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleLogin = async (email, password) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error 
      };
    }
  };

  const handleRegister = async (email, password, firstName, lastName) => {
    try {
      await dispatch(registerUser({ firstName, lastName, email, password })).unwrap();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error 
      };
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error 
      };
    }
  };

  const hasRole = (role) => {
    return auth.user?.roles?.includes(role) || false;
  };

  const value = {
    user: auth.user,
    token: auth.token,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    hasRole,
    isAuthenticated: auth.isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
