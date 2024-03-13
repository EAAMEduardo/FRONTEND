import React from 'react'
import { useState, useEffect } from 'react'
import {getSearchedListings} from "../api/listing"
import { useNavigate } from 'react-router-dom'
import ubi from "../assets/ubi2.png"
import bed from "../assets/bed2.png"
import bath from "../assets/bath2.png"
import fav from "../assets/favorite.png"
import nofav from "../assets/nofavorite.png"
import {useAuth} from "../context/AuthContext"

function Search() {

  const {user, updateProfile, removeFav} = useAuth()

  const [sideTerms, setSideTerms] = useState({
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    order: "desc",
    sort: "createdAt"
  })
  const navigate = useNavigate()

  console.log(sideTerms)

  const [searchedListings, setSearchedListings] = useState([])
  console.log(searchedListings)


  useEffect(() => {
    
          const params = new URLSearchParams(location.search)
         const term = params.get("searchTerm")
      

         setSideTerms({
          ...sideTerms, searchTerm : term,
          
         })

         const getSearched = async () => {
           const url = params.toString()
            const listings = await getSearchedListings(url)
            setSearchedListings(listings.data)
         }

         getSearched()

  }, [location.search])

    

   const handleChange = (e) => {

      if(e.target.id === "all" || e.target.id === "sell" || e.target.id === "rent") {
          setSideTerms({
            ...sideTerms, type: e.target.id
          })
      }

     

      if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
        setSideTerms({
          ...sideTerms, [e.target.id] : e.target.checked
        })
      }


      if(e.target.id === "sort_order") {
        const sort = e.target.value.split("_")[0] || "createdAt"

        const order = e.target.value.split("_")[1] || "desc"

        setSideTerms({
          ...sideTerms, sort, order
        })
      }
   }

   const handleSearch =  () => {
    const urlParams = new URLSearchParams(location.search)
     urlParams.set("type", sideTerms.type)
     urlParams.set("order", sideTerms.order)
     urlParams.set("sort", sideTerms.sort)
     urlParams.set("furnished", sideTerms.furnished)
     urlParams.set("offer", sideTerms.offer)
     urlParams.set("parking", sideTerms.parking)

     const newUrl = urlParams.toString()
     navigate(`/search?${newUrl}`)
    
   }


   const handleFav = async  (listing) => {
     
      const contains = user.favorites.some(favs => {
        return favs.name === listing.name
      })

      if(contains) {

        const newFavs = {
          noFav : listing
        }

        removeFav(user.id, newFavs)
        

      } else if(!contains) {

        const newData = {
          username: user.username,
          avatar: user.avatar,
          email: user.email,
          favorite: listing
        }
       await  updateProfile(user.id, newData)

    
      }

      
   }

  return (
    <div className="search-container">
      <div className="search-left">
       

        <div className="search-type">
            <label>Type: </label>

            <div className="type-option">
              <input onChange={(e) => handleChange(e)} id="all" checked={sideTerms.type === "all"} type='checkbox'></input>
              <label>All</label>
            </div>

            <div className="type-option">
              <input onChange={(e) => handleChange(e)} id='rent' checked={sideTerms.type === "rent"} type='checkbox'></input>
              <label>Rent</label>
            </div>

            <div className="type-option">
              <input onChange={(e) => handleChange(e)} id='sell' checked={sideTerms.type === "sell"} type='checkbox'></input>
              <label>Sell</label>
            </div>

            <div className="type-option">
              <input onChange={(e) => handleChange(e)} id='offer' checked={sideTerms.type === "offer"} type='checkbox'></input>
              <label>Offer</label>
            </div>
        </div>

        <div className="amenities">
          <label>Amenities : </label>

          <div className="amenities-option">
            <input onChange={(e) => handleChange(e)} id='parking' checked={sideTerms.parking} type='checkbox'></input>
            <label>Parking</label>
          </div>

          <div className="amenities-option">
            <input onChange={(e) => handleChange(e)} id='furnished' checked={sideTerms.furnished} type='checkbox'></input>
            <label>Furnished</label>
          </div>
        </div>

        <div className="sorts">
          <label>Sort : </label>
          <select id='sort_order' onChange={(e) => handleChange(e)}>
             <option value={"regularPrice_desc"}>Price high to low</option>
             <option value={"regularPrice_asc"}>Price low to high</option>
             <option value={"createdAt_desc"}>Latest</option>
             <option value={"createdAt_asc"}>Oldest</option>
          </select>
        </div>

       <div className='search-div'>
         <button onClick={handleSearch} className='search-btn'>Search</button>
       </div>
      </div>

      <div className="search-right">
         <h1 className='search-title'>Listing results:</h1>
           <hr></hr>
         <div className="listings-searched">
          {searchedListings.length < 1 ? (
            <div className='listing-error'>There's no listings which fullfil the terms your looking for </div>
          ): (<></>)}
            {searchedListings.map(listing => {
              return (
                <div className="listing-card">
                   <div className="card-cover">
                      <img className='card-img' src={listing.imageUrls[0]}></img>
                   </div>

                   <div className="card-info">
                      <h2 onClick={() => navigate(`/listing/${listing._id}`)} className='card-name'>{listing.name.substring(0, 30)}...</h2>
                      <div className="card-ubi">
                        <img className='ubi' src={ubi}></img>
                        <p>{listing.address}</p>
                      </div>

                      <p className='card-desc'>{listing.description.substring(0,75)}...</p>

                      {listing.type === "rent" ? (
                        <h3 className='card-price'>$ {new Intl.NumberFormat().format(listing.regularPrice) } /month</h3>
                      ): (
                        <h3 className='card-price'>$ {new Intl.NumberFormat().format(listing.regularPrice) }</h3>
                      )}

                      <div className="card-furnish">
                      <div className='fav-flex'>
                        <div className="card-furn">
                          <img src={bath}></img>
                          <p>: {listing.bathrooms}</p>
                        </div>

                        <div className="card-furn">
                          <img src={bed}></img>
                          <p>: {listing.bedrooms}</p>
                        </div>
                      </div>

                      <div className="card-fav">
                        {user.favorites.some(favo => favo.name === listing.name) ? (
                          <img onClick={() => handleFav(listing)} src={fav}></img>
                        ): (<img onClick={() => handleFav(listing)} src={nofav}></img>)}
                      </div>
                      </div>
                   </div>
                </div>
              )
            })}
         </div>
      </div>
    </div>
  )
}

export default Search