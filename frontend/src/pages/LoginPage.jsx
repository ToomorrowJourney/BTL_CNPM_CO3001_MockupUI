import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('nguyen.vinh@hcmut.edu.vn');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email);
            navigate('/');
        } catch (err){
            setError('Email hoặc mật khẩu HCMUT không hợp lệ');
        }
    };

    return (
        <div className="login-page">
            <div className="login-header">
                <img src="/src/assets/01_logobachkhoatoi.png" alt="BK TP.HCM" />
            </div>

            <div className="login-container">
                <h1 className="login-title">Dịch Vụ Xác Thực Trung Tâm</h1>
                <p className="login-subtitle">Nhập Email và Mật khẩu HCMUT của bạn</p>
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label className="form-label">Địa chỉ Email HCMUT</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Mật khẩu</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    
                    <button type="submit" className="btn-login">
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
