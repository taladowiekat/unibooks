import React from 'react'
import './app.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './layouts/routes.js';
import CreateListing from './components/web/createPost/CreatPost.js';

function App() {
  return (
    <>
<CreateListing/>    </>
  );
}

export default App;