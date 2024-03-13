import React from 'react'
import {signInWithPopup, getAuth, GoogleAuthProvider} from "firebase/auth"
import {app} from "./firebase"
import {useAuth} from "./context/AuthContext"

function AuthGoogle() {

  const {googleIn} = useAuth()

    

  const handleGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)
        console.log(result)

        const user = {
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL
        }

        await googleIn(user)
       
        
    } catch (error) {
        console.log(error)
    }
 
  }
    



  return (
    <button onClick={handleGoogle} className='red' type='button'>CONTINUE WITH GOOGLE</button>
  )
}

export default AuthGoogle