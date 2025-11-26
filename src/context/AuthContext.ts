import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types/user';
import { MOCK_USERS } from '../services/mockData';
import { set } from 'date-fns';

interface AuthContextType extends AuthState {
    login: (email: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>  {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Check for existing session (mocked)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if ( storedUser ) {
            setState({
                user: JSON.parse(storedUser),
                isAuthenticated: true,
                isLoading: false,
            });
        }else {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = async (email: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const user = MOCK_USERS.find(u => u.email === email);

        if ( user ) {
            localStorage.setItem('user', JSON.stringify(user));
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
            });
        }else {
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };
    
    return React.createElement(AuthContext.Provider, { value: { ...state, login, logout } }, children);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if ( context === undefined ) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};