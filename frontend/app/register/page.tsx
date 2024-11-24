"use client";

import { useState } from 'react';
import { getSocket } from "../socket";

const RegisterPage = () => {
    const socket = getSocket()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      if (password.length < 8)
      {
        setError("Password too short.")
        setLoading(false)
      }
      if (!password.match(/[A-Z]/))
      {
        setError("Password does not contain a capital letter.")
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      try {
        console.log("Emitting the createUser stuff");
        socket.emit(
          "createUser", 
          {email, password, username}, 
          (response: { error?: string; user?: any }) => {
            if (response.error) {
              console.error("Error from server:", response.error);
              setError(response.error); // Update UI with the error
              return;
            }
          console.log("Successfully emitted");
      
            // Successful registration
            const userData = response.user;
            console.log("User registered successfully:", userData);
          }
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("General error:", error.message);
          setError(error.message);
        } else {
          console.error("Unexpected error:", error);
          setError("Something went wrong!");
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
          type ="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
