import React from 'react'
import './app.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './layouts/routes.js';

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;