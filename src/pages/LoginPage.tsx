import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('nguyen.vinh@hcmut.edu.vn'); // Prefill for testing
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email);
            navigate('/'); // Redirect to Home after login
        } catch (err){
            setError('Invalid HCMUT email or password');
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Blue Header Bar simulating SSO portal style */}
      <div className="w-full bg-hcmut-blue h-16 fixed top-0 left-0 flex items-center px-10">
         <img src="/src/assets/01_logobachkhoatoi.png" alt="BK TP.HCM" className="h-12" />
      </div>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-10">
        <h1 className="text-2xl font-bold mb-2">Central Authentication Service</h1>
        <p className="text-gray-600 mb-6">Enter your HCMUT Email and Password</p>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">HCMUT Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hcmut-blue focus:border-hcmut-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-hcmut-blue focus:border-hcmut-blue"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-hcmut-blue hover:bg-blue-800 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    );
};
export default LoginPage;