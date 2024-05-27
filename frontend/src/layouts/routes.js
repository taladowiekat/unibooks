import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.js';
import Login from '../pages/signin/SignIn.js';
import Register from '../pages/signup/SignUp.js';
import Posts from '../pages/allPosts/Posts.js';
import ProfileForm from '../pages/profile/Profile.js';
import ContactUs from '../pages/contactUs/ContactUs.js';
<<<<<<< HEAD
import PostDetails from '../pages/editPost/EditPost.js';
=======
import EditPost from '../pages/editPost/EditPost.js';
>>>>>>> 6ac70ed091608d19efe9d4dbfd485e632dc9d185
import ForgotPassword from '../pages/resetPassword/ForgotPassword.js';




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            // {
            //     path: 'Home',
            //     element: <Posts/>
            // },
            {
                path: 'allPosts',
                element: <Posts />
            },
            {
                path: 'forgotPassword',
                element: <ForgotPassword />
            },
            {
                path: 'profile',
                element: <ProfileForm />
            },
            {
                path: 'contactUs',
                element: <ContactUs />
<<<<<<< HEAD
            },
            // {
            //     path: 'allPosts/EditPost',
            //     element: <EditPost />
            // },
            {
                path:'post/:id',
                element: <PostDetails/>
            }
=======
            }, {
                path: 'allPosts/EditPost',
                element: <EditPost />
            },
>>>>>>> 6ac70ed091608d19efe9d4dbfd485e632dc9d185

        ]
    }
]);
