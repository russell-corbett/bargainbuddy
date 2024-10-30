"use client";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoginMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCredential.user);
      setLoginMessage(`Logged in as user: ${userCredential.user.email}`); // Set login message

      // Store user login status in local storage
      localStorage.setItem('isLoggedIn', 'true'); // Change this to whatever identifier you'd like
      localStorage.setItem('userEmail', userCredential.user.email!);

      // Redirect to homepage after successful login
      //navigate('/'); // Replace with your homepage route
    } catch (error: unknown) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      {loginMessage && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>
          {loginMessage}
        </p>
      )}
    </div>
  );
};

export default LoginPage;
