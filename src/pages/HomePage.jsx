import React, { useEffect } from 'react'
import {useAuth} from "../context/AuthContext"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import bed from "../assets/bed.png"
import bath from "../assets/bath.png"
import { useNavigate } from 'react-router-dom'



function HomePage() {

  const navigate = useNavigate()

  const {getListings, user, listings, deleteListing} = useAuth()
  const [deleteSuccess, setDeleteSuccess] = useState(false)
 
  
useEffect(()=> {
  function checkListings() {

      getListings(user.id)

  }

  checkListings()
}, [deleteSuccess])


const handleDelete = async (id) => {
    await deleteListing(id)
    setDeleteSuccess(true)
  
}

const handleShow = (id) => {
   return navigate(`/listing/${id}`)
}

  return (
     
    <section className='hero-section'>
         {listings ? (
          <p className='listings-title'>{user.username}' listings</p>
         ): (<p>Theres No Listings Yet</p>)}

       {listings.map(listing => {
        return (
           <div   className="card-listing">
            <div className="left-side">
              <img className='card-img' src={listing.imageUrls[0]}></img>
            </div>

            <div className="right-side">
              <h2 onClick={() => handleShow(listing._id)}>{listing.name.substring(0,25)}...</h2>
              <p className='desc'>{listing.description.substring(0,70)}...</p>

              <div className="right-center">
                   <div className="room">
                    <div className="bath">
                       <img className='img-rooms' src={bath}></img>
                       <p>: {listing.bathrooms}</p>
                     </div>

                     <div className="bed">
                         <img className='img-rooms' src={bed}></img>
                         <p>: {listing.bedrooms}</p>
                     </div>
                   </div>

                   <div className='btns'>
                    <Link to={`/update/listing/${listing._id}`} className='edit-btn'>Edit</Link>
                    <button onClick={() => handleDelete(listing._id)} className='delete-btn'  type='button'>Delete</button>
                   </div>
              </div>

              {listing.salePrice > 0 ? (
                <div className="pricess">
                    <p>Regular Price: $ {new Intl.NumberFormat().format(listing.regularPrice) }</p>
                    <p>Sale Price: $ {new Intl.NumberFormat().format(listing.salePrice)}</p>
                </div>
               
              ): ( <div className="pricess">
                    <p>Regular Price: $ <span>${new Intl.NumberFormat().format(listing.regularPrice)}</span></p>
                </div>)}
            </div>
           </div>
        )
       })}
    </section>
  )
}

export default HomePage