import './Auth.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for react-toastify

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Perform signup
      const success = await signup(username, password);
      console.log('Signup result:', success);

      if (success) {
        // Display success notification
        toast.success('Signup successful! Redirecting...', {
          position: "top-right",
          autoClose: 3000, // Auto-close after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });

        // Delay the navigation to allow the toast to show first
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        // Display error notification
        toast.error('Invalid credentials. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('An error occurred during signup. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">Sign Up</button>
        </form>
      </div>

      {/* ToastContainer to display the toasts */}
      <ToastContainer />
    </div>
  );
}

export default Signup;
