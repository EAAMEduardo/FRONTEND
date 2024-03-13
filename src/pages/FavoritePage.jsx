import React from 'react'
import { useEffect } from 'react'
import {getOwner} from "../api/auth"
import { useState } from 'react'
import {useAuth} from "../context/AuthContext"
import back from "../assets/backarrow.png"
import favorite from "../assets/whitefav.png"
import {useNavigate} from "react-router-dom"

function FavoritePage() {

  const {user, removeFav} = useAuth()
  const navigate = useNavigate()
  const [favs, setFavs] = useState([])

 useEffect(() => {
   const getFavs = async () => {
       const result = await getOwner(user.id)
       setFavs(result.data.favorites)
   }

   getFavs()

 }, [user])

 
   const remove = async (fav) => {

      const newData = {
        noFav : fav
      }

      await removeFav(user.id, newData)
   }


  return (
    <div className="favs-container">
      <div className="favs-title">
        <img onClick={() => navigate(-1)} src={back}></img>
        <h1>Favorites Listings</h1>
      </div>

      <div className="favs-listings">
        {favs.map(fav => {
          return (
            <div onClick={() => navigate(`/listing/${fav._id}`)} className="fav-listing">

               <img className='fav-img' src={fav.imageUrls[0]}></img>
                  
               <div className="fav-info">
                 <div className="info-flex">
                    <h5>{fav.name}</h5>
                    <p>{fav.description.substring(0,75)}...</p>
                 </div>

                 <div className="fav-logo">
                  <img onClick={() => remove(fav)} src={favorite}></img>
                 </div>
               </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FavoritePage