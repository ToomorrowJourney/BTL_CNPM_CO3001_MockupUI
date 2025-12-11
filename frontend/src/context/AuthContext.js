import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MOCK_USERS } from '../services/mockData';

const API_DELAY_MS = 500;
const STORAGE_KEY = 'user';

/**
 *** Định nghĩa kiểu dữ liệu Auth Context
 *** Mở rộng AuthState với các phương thức login/logout
 **/

/**
 *** Tạo Auth Context
 *** Context để quản lý trạng thái xác thực trong toàn bộ ứng dụng
 **/
const AuthContext = createContext(undefined);

/**
 *** Component AuthProvider
 *** Cung cấp context xác thực và quản lý trạng thái auth
 **/
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  /**
   *** Khởi tạo trạng thái auth từ localStorage khi component mount
   **/
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  /**
   *** Đăng nhập người dùng
   *** @param email - Email người dùng để đăng nhập
   **/
  const login = useCallback(async (email) => {
    try {
      // Mô phỏng độ trễ API
      await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));

      const user = MOCK_USERS.find((u) => u.email === email);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      // Track login activity
      try {
        const { saveLoginActivity } = await import('../services/mockData');
        await saveLoginActivity(user.id);
      } catch (error) {
        console.error('Failed to track login activity:', error);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  /**
   *** Đăng xuất người dùng hiện tại
   **/
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const value= {
    ...state,
    login,
    logout,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

/**
 *** Hook useAuth
 *** Custom hook để truy cập auth context
 *** @throws Error nếu được sử dụng ngoài AuthProvider
 **/
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

