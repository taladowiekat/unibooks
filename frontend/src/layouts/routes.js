import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.js';
import Login from '../pages/logIn/LogIn.js';
import Register from '../pages/register/Register.js';
import EditPost from '../pages/editPost/EditPost.js';
import Posts from '../pages/allPosts/Posts.js';




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: 'register',
            element: <Register/>
        },
        {
            path: 'login',
            element: <Login/>
        },
        // {
        //     path: 'Home',
        //     element: <Posts/>
        // },
        {
            path: 'allPosts',
            element: <Posts/>
        }
    ,{
        path:'editPost/:postId',
        element: <EditPost/>
    }]}
]);
