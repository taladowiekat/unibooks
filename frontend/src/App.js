import React, { useContext, useEffect } from 'react';
import './app.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './layouts/routes.js';
import { UserContext } from './components/context/UserContext.js';

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, [setUser]);

  return <RouterProvider router={router} />;
}

export default App;

