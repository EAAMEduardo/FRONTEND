import React from 'react'
import search from "../assets/search.png"
import { Link } from 'react-router-dom'
import {useAuth} from "../context/AuthContext"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Navbar() {

  const {user} = useAuth()
 const [searchTerm, setSearchTerm] = useState("")
 const navigate = useNavigate()

 useEffect(() => {
  const urlParams = new URLSearchParams(location.search)
  const urlSearchTerm = urlParams.get("searchTerm")
  setSearchTerm(urlSearchTerm)
 }, [location.search])


 const handleSubmit = () => {
   
  if(searchTerm.length > 0) {
    const urlParams = new URLSearchParams()

    urlParams.set("searchTerm", searchTerm)

    const searchQuery = urlParams.toString()
 
    navigate(`/search?${searchQuery}`)
    
  }
  
 }

  return (
    <div className="nav-container">
        <h1 className='title'>Eduardo <span>Estate</span></h1>

        <div className="search">
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search...'></input>
            <img onClick={handleSubmit} className='img' src={search}></img>
        </div>


        <div className="links">
            <Link className='link hidden' to="/">Home</Link>
            <Link className='link hidden' to="about">About</Link>
            {user ? (
              <Link className='link hidden' to={`/favorites/${user.id}`}>Favorites</Link>
            ): <></>}
              {user ? (
                <Link to={`/profile/${user.id}`}>
                  <img className='profile' src={user.avatar} alt='img'></img>
                </Link>
              ): (
                <Link className='link' to='/login'>Sing In</Link>
              )}
          
        </div>
    </div>
  )
}

export default Navbar