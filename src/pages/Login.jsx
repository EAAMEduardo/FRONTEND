import React from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form"
import {useAuth} from "../context/AuthContext"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthGoogle from '../AuthGoogle'


function Login() {

  const {handleSubmit, register, formState: {errors}} = useForm()

  const {login, success, fails, isAuth} = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit( async(data) => {
       console.log(data)
       await login(data)

       
  })

  useEffect(() => {
    if(isAuth) navigate("/landing")
  }, [isAuth])


  return (
    <div className="login-container">
       <h1 className='singup'>Sing In</h1>

        
      {success ? (
        <div className="success">
         <p>User created Succesfully</p>
        </div>
 
      ): <></>}

   {fails.map((fail, i) => {
       return (
        <div className="fails">
           <p key={i}>{fail}</p>
        </div>
       
      )
   })}

  <form onSubmit={onSubmit}>

    <input
    {...register("email", {required: true})}
     type='text' placeholder='Email'></input>

    <input
    {...register("password", {required: true})}
     type='password' placeholder='Password'></input>

    <div className="buttons">
        <button className='blue'>SING IN</button>
        <AuthGoogle></AuthGoogle>
    </div>
   </form>

   <p className='p'>Dont have an account? <Link className='link' to="/register">Sing Up</Link></p>
       </div>
   )
}

export default Login