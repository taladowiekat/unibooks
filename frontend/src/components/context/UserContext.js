import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Load token from localStorage if available
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (token) {
      try {
        const { data } = await axios.get('http://localhost:4000/user/getUserProfile', {
          headers: { Authorization: `Token__${token}` }
        });
        setUser(data); // Set user data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, loading, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
