"use client";
interface LoginResponse {
  error?: string;
  message?: string;
  user?: {
    id: number;
    email: string;
  };
  token: string;
}

import { useState } from 'react';
import { getSocket } from "../socket";
import { useNavigate } from 'react-router-dom'; //May need depending on how our routing works

const LoginPage = () => {
  const socket = getSocket(); // Get the socket instance
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      socket.emit('loginUser', { email, password });

      socket.on('loginResponse', (response: LoginResponse) => {
          setLoading(false);

          if (response.error) {
              setError(response.error);
          } else {
              console.log('Login successful:', response.user);
              localStorage.setItem('token', response.token);

          }
      });
  };

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    </div>
);
};

export default LoginPage;
