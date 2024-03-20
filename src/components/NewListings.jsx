import React from 'react'
import {getSearchedListings} from "../api/listing"
import { useEffect } from 'react'
import { useState } from 'react'
import nofavorite from "../assets/nofavorite.png"
import favorite from "../assets/favorite.png"
import {useAuth} from "../context/AuthContext"
import {useNavigate} from "react-router-dom"




function NewListings() {

    const [newestListing, setNewestListing] = useState([])

    const {user, updateProfile, removeFav} = useAuth()

    const navigate = useNavigate()
  
 
    
    
    useEffect(() => {
        const getNewest = async () => {
  
          const params = new URLSearchParams()
          params.set("order", "desc")
          params.set("sort", "createdAt")
          const url = params.toString()
  
          const result = await getSearchedListings(`/get?${url}`)
          setNewestListing(result.data)
        }
  
        getNewest()
    }, [])




    const handleFavorites = async (listing) => {
      const contains = user.favorites.some(house => {
        return house.name === listing.name
      })

      if(!contains) {


        const newUserData = {
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          favorite: listing
       }

       console.log(newUserData)

      await updateProfile(user.id, newUserData)
       
       
       console.log("userfavs was updated succesfully")
      } else if(contains){
        const newFavs = {
          noFav : listing
        }

         await removeFav(user.id, newFavs)

       
      }
      
    
    }






  return (
    <div className="news-container">
      {newestListing.length > 0 ? 
         newestListing.map(listing => {
          return(
             <div  key={listing._id} className="landing-listing">
                <div className="landing-cover">
                  <img className='landing-img' src={listing.imageUrls[0]}></img>
                  {listing.type === "rent" ? (
                    <button>$ {new Intl.NumberFormat().format(listing.regularPrice) } /Month</button>
                  ): (<button>$ {new Intl.NumberFormat().format(listing.regularPrice) }</button>)}
                </div>
  
                <div className="landing-info">
                   <h5>{listing.address.substring(0,30)}...</h5>
                   <h2 onClick={() => navigate(`listing/${listing._id}`)}>{listing.name}</h2>
                  
  
                   <div className="landing-rooms">
                     <div className='rooms-flex'>
                       <p>{listing.bedrooms} Beds - </p>
                        <p>{listing.bathrooms} Baths</p>
                     </div>
  
                     <div className="favorite">
                        {user.favorites.some(fav => fav.name === listing.name) ? (
                          <img onClick={() => handleFavorites(listing)} src={favorite}></img>
                        ): <img onClick={() => handleFavorites(listing)} src={nofavorite}></img>}
                     </div>
                   </div>
                </div>
            </div>)}
      ) :(<></>) }
     </div>
  )
}

export default NewListings