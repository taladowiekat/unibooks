import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (token) {
      try {
        const { data } = await axios.get('http://localhost:4000/user/getUserProfile', {
          headers: { Authorization: `Token__${token}` }
        });
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [token]); // token is a dependency for fetchUser

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // fetchUser is now a stable function and a dependency for useEffect

  return (
    <UserContext.Provider value={{ user, token, loading, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};