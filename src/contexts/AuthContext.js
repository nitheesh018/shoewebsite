import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    console.log("username = ", username, " password = ", password);
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      console.log("fe res = ", response);
  
      if (response.status === 200) {  // Check for HTTP status 200 (OK)
        const data = await response.json();
        setUser(data.user);  // Assuming the data includes the user
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);  // Assuming the Spring API sends a token
        return true;
      } else if (response.status === 401) {  // If status is 401 (Unauthorized)
        console.error('Invalid credentials');
        return false;
      } else {
        console.error('Unexpected response status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
