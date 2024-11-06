"use client"

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig.js'
const axios = require('axios');

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [userName, setUser] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError('');
  
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }
  
      try {
        //const auth = getAuth();
        // Register the user with Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        const response = await axios.post(
          "../backend/api/registerUser.js",
          {
            password: password,
            token: token
          }
        );

        /*
        // Optionally send the token to your backend to create a user record
        const response = await fetch('../../backend/api/login/register-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });
        */
  
        if (!response.ok) {
          throw new Error('Failed to register user in backend');
        }
  
        const userData = await response.json();
        console.log('User registered successfully:', userData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Registration error:', error.message);
          setError(error.message);
        } else {
          console.error('Unexpected error:', error);
          setError('Something went wrong!');
        }
      } finally {
        setLoading(false);
      }
    };
      

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type = "username"
          placeholder = "Username"
          value = {userName}
          onChange ={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
