import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/web/navbar/Navbar.js'
import Footer from '../components/web/footer/Footer.js'

function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/> 
    <Footer/>
    </>
  )
}

export default Layout