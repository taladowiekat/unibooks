import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
      if (user) {
        try {
          const {data} = await axios.get('http://localhost:4000/user/getUserProfile', {
            headers: { Authorization: `Token__${token}` }
          });
          setToken(data.user)
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
      }
    };


  useEffect(() => {
    fetchUser();
}, [token]);



  return (
    <UserContext.Provider value={{ user, token , loading, setUser ,setToken}}>
      {children}
    </UserContext.Provider>
  );
};