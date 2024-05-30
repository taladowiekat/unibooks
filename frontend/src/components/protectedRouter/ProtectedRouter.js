import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

function isTokenValid() {
    const decodedtoken = jwtDecode(localStorage.getItem("token"))
    if (decodedtoken && Date.now() >= decodedtoken.exp * 1000)
        return false;
    return true;
}

function ProtectedRouter({ children }) {
    if (localStorage.getItem("token") == null || isTokenValid) {
        return <Navigate to='/login' />
    }
    return (
        children
    )
}
export default ProtectedRouter