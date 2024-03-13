import React from 'react'
import {useAuth} from "../context/AuthContext"
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'


function PrivateRoutes() {


    const {user, isAuth} = useAuth()

  return   isAuth ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
    
  
}

export default PrivateRoutes