import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';
import { storageService, DEMO_USERS } from '../services/storageService.js';
import { User } from '../models/User.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If no active user, initialize with Admin for instant preview, or leave null to show login
    // Let's keep null initially or allow quick login from login screen
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = authService.login(email, password);
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const user = authService.register(userData);
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Quick Demo Role Switcher helper for presentations
  const quickSwitchDemo = (role) => {
    const users = storageService.getUsers();
    let target = null;
    if (role === 'admin') {
      target = users.find(u => u.email === 'admin@demo.com');
    } else if (role === 'technician') {
      target = users.find(u => u.email === 'technician@demo.com');
    } else {
      target = users.find(u => u.email === 'user@demo.com');
    }

    if (target) {
      storageService.setActiveUser(target);
      setCurrentUser(target);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    quickSwitchDemo,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    isTechnician: currentUser?.role === 'technician',
    isUser: currentUser?.role === 'user'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
