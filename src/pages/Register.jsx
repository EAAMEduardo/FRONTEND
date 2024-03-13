import React from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form"
import {useAuth} from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import AuthGoogle from '../AuthGoogle';

function Register() {

  const {handleSubmit, register, formState: {errors}} = useForm()

  const {singup, success, fails, isAuth} = useAuth()
  const navigate = useNavigate()
   

  const onSubmit = handleSubmit( async(data) => {
       console.log(data)
       await singup(data)
  })

  useEffect(() => {
    if(isAuth) navigate("/login")
  
  }, [isAuth])


  return (
    <div className="register-container">
       <h1 className='singup'>Sing Up</h1>

        
      {success ? (
        <div className="success">
           <p>User created Succesfully</p>
        </div>
       
      ): <></>}

      {fails.map((fail, i) => {
          return (
            <p className='fails' key={i}>{fail}</p>
          )
      })}

       <form onSubmit={onSubmit}>
          <input
          {...register("username", {required: true})}
           type='text' placeholder='Username'></input>

          <input
          {...register("email", {required: true})}
           type='text' placeholder='Email'></input>

          <input
          {...register("password", {required: true})}
           type='password' placeholder='Password'></input>

          <div className="buttons">
              <button className='blue'>SING UP</button>
              <AuthGoogle></AuthGoogle>
          </div>
       </form>

       <p className='p'>Have an account? <Link className='link' to="/login">Sing In</Link></p>
    </div>
  )
}

export default Register