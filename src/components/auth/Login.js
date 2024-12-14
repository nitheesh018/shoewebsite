import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for react-toastify






function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleforgot = async (e) => {
    // Send the POST request to the backend
    const response = await fetch('http://localhost:8080/api/forgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),  // Assuming `username` and `password` are defined in your state
    });
  
    // Check if the response is OK (status 200-299)
    if (response.ok) {
      // Parse the JSON response from the backend
      const data = await response.json();
      console.log("Response data:", data);  // Display the random number or response data
  
      // Optionally, display it on the page, e.g., set it in a state
      alert("Random number: " + data);  // Simple alert or update state/UI
    } else {
      console.log("Error with the request:", response.status);
      alert("Something went wrong! Please try again.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        // Display success notification
        toast.success('Login successful! Redirecting...', {
          position: "top-right",
          autoClose: 3000, // Auto-close after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
  
        // Delay navigation for 5 seconds to allow the toast to be visible
        setTimeout(() => {
          navigate('/'); // Redirect after the toast
        }, 3000); // 5 seconds delay
  
      } else {
        // Display error notification
        toast.error('Invalid credentials. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An error occurred during login. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
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
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Login</button ><br></br>
        <button onClick={()=>handleforgot()} className="submit-button">forgot password</button >
      </form>
      <ToastContainer />
      
    </div>
  );
}

export default Login;
