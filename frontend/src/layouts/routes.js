import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.js';
import Login from '../pages/signin/SignIn.js';
import Register from '../pages/signup/SignUp.js';
import Posts from '../pages/allPosts/Posts.js';
import ProfileForm from '../pages/profile/Profile.js';
import ContactUs from '../pages/contactUs/ContactUs.js';
import ForgotPassword from '../pages/resetPassword/ForgotPassword.js';
import Home from '../components/web/home/Home.js';
import PostDetails from '../pages/editPost/EditPost.js';
import ProtectedRouter from '../components/protectedRouter/ProtectedRouter.js';




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
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'allPosts',
                element: 
                <ProtectedRouter>
                    <Posts />
                </ProtectedRouter>
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
            }, {
                
                    path:'post/:id',
                    element: <PostDetails/>
                
            },
        ]
    }
]);
