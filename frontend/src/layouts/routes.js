import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.js';
import Login from '../pages/signin/SignIn.js';
import Register from '../pages/signup/SignUp.js';
import Posts from '../pages/allPosts/Posts.js';
import ResetPassword from '../pages/resetPassword/ResetPass.js';
import ProfileForm from '../pages/profile/Profile.js';
import ContactUs from '../pages/contactUs/ContactUs.js';
import EditPost from '../pages/editPost/EditPost.js';




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
                path: 'resetPass',
                element: <ResetPassword />
            },
            {
                path: 'profile',
                element: <ProfileForm />
            },
            {
                path: 'contactUs',
                element: <ContactUs />
            }, {
                path: 'allPosts/EditPost',
                element: <EditPost />
            },

        ]
    }
]);
