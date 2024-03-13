import React from 'react'
import {useAuth} from "../context/AuthContext"
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import {app} from "../firebase"
import {Link, useParams} from "react-router-dom"
import { useNavigate } from 'react-router-dom'


function Profile() {

    const navigate = useNavigate()
    const {user, updateProfile, singOut, revomeAccount} = useAuth()

    const fileRef = useRef()
    const [porc, setPorc] = useState()
    const [formData, setFormData] = useState({
      username: user.username,
      email: user.email,
      avatar: user.avatar
    })
    const [fileImg, setFileImg] = useState()
    const params = useParams()
    const [updateSuccess, setUpdateSuccess] = useState(false)
   

    console.log(formData)
    console.log(user)
   
    useEffect(() => {
        if(fileImg) {
            handleFile(fileImg)
        }
    }, [fileImg])

    useEffect(() => {
        if(porc) {
            setTimeout(() => {
                setPorc()
            }, 4000);
        }
    }, [porc])
    

    const handleFile = (file) => {
       const storage = getStorage(app)
       const fileName = new Date().getTime() + file.name
       const storageRef = ref(storage, fileName)
       const uploadTask = uploadBytesResumable(storageRef, file)

       uploadTask.on(
        "state_changed",
       (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setPorc(Math.round(progress))
          console.log(progress)
       }, (error) => {
        console.log(error)
       }, () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL)
            setFormData({...formData, avatar: downloadURL})
         })
       }
        )

    }

    function handleForm (e) {
       const {name, value} = e.target
      setFormData({...formData, [name]: value})

    }

   async function handleUpdate() {
     const {id} = params

       await updateProfile(id, formData )

       
        setUpdateSuccess(true)
    
    }

    async function handleDelete() {
      const {id} = params
      await revomeAccount(id)
      navigate("/register")

      
    }

    

    useEffect(() => {
      if(updateSuccess) {
        setTimeout(() => {
          setUpdateSuccess(false)
        }, 4000);
      }
    })

  


  return (
    <div className="profile-container">
        <h1>Profile</h1>
        <input
        onChange={(e) => setFileImg(e.target.files[0])}
          hidden ref={fileRef} type='file' accept='image/*'></input>
        <img onClick={() => fileRef.current.click()} className='img-profile' src={formData.avatar || user.avatar}></img>
          {porc ? <p>Uploading is {porc}% done</p>: <></>}


          {updateSuccess ? <p>Update Successfully</p>: <></>}
        <form className='profile-form'>
            <input
            defaultValue={user.username}
            name='username'
              onChange={(e) => handleForm(e)}
             placeholder='Username'></input>
            <input
            name='email'
            defaultValue={user.email}
             onChange={(e) => handleForm(e)}
             placeholder='Email'></input>
            <input
            name='password'
            type='password'
            onChange={(e) => handleForm(e)}
             placeholder='Password'></input>

            <div className="button">
                <button onClick={handleUpdate} type='button'>Update</button>
                
               <Link  className='link' to="/create-listing">Create Listing</Link>

               <Link to={`/listings/${user.id}`} className='link show'>Show Listings</Link>
            </div>
        </form>

        <div className="accions">
            <p onClick={handleDelete} className='delete'>Delate Account</p>
            <p onClick={singOut} className='singout'>Sing Out</p>
        </div>
    </div>
  )
}

export default Profile