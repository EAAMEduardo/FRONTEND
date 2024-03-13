import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {getUniquedListing} from "../api/listing"
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import "swiper/css/bundle"
import gif from "../assets/ubi.gif"
import share from "../assets/share.png"
import bed from "../assets/bed2.png"
import bath from "../assets/bath2.png"
import furnished from "../assets/furnished.png"
import parking from "../assets/parking.png"
import back from "../assets/back.png"
import {Toaster, toast} from "react-hot-toast"
import {useAuth} from "../context/AuthContext"
import Contact from '../components/Contact'


function Listing() {

    SwiperCore.use([Navigation])

    const [currentListing, setCurrentListing] = useState()
    const [contact, setContact] = useState(false)
   

    const {id} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        const getListing = async () => {
            const result = await getUniquedListing(id)
            setCurrentListing(result.data)
            console.log(result)
        }

        getListing()
    },[])


  return (
    <main>
        {currentListing ? (
            <div>
                <Swiper>
                    {currentListing.imageUrls.map((url, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div style={{
                                    background: `url(${url}) center no-repeat`,
                                    backgroundSize: "cover"
                                }} className="swiper-div">
                                 
                                 <div className="tooltip-right">
                                   <img onClick={() => navigate(-1)}     className='back' src={back}></img>
                                   <p className='left-tool left'>Go Back!</p>
                                 </div>
                                 
                                 <div className="tooltip-left">
                                    <img onClick={() =>{
                                        navigator.clipboard.writeText(window.location.href)
                                        toast("Url Copied!", {position: 'top-center'})
                                    }
                                    }  className='share' src={share}></img>
                                    <p className='right-tool right'>Copy Link!</p>
                                 </div>
                                 <Toaster toastOptions={{
                                    style: {
                                        backgroundColor: 'aliceblue',
                                        color: "blueviolet",
                                        fontWeight: 800
                                    }
                                 }}></Toaster>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>


                <div className="listing-show">
                    <h1 className='name-listing'>{currentListing.name}.</h1>

                    <div className="address-listing">
                        <img className='gif' src={gif}></img>
                        <h3> -  {currentListing.address}</h3>
                    </div>

                    <button className='type-btn'> For {currentListing.type}</button>

                    <h4 className='des-listing'>Description - <span className='span-listing'>{currentListing.description}</span> </h4>
                </div>

                <div className="spects-listing">
                    <div className="spect">
                        <img src={bed}></img>
                        <p>{currentListing.bedrooms} Beds</p>
                    </div>

                    <div className="spect">
                        <img src={bath}></img>
                        <p>{currentListing.bathrooms} Baths</p>
                    </div>

                   {currentListing.furnished && (
                    <div className="spect">
                       <img src={furnished}></img>
                        <p>Furnished</p>
                    </div>
                   )}

                   
                   {currentListing.parking && (
                      <div className="spect">
                         <img src={parking}></img>
                          <p>Parking</p>
                      </div>
                   )}
                </div>

                {user && user.id !== currentListing.userRef && !contact && (
                   <div className='lord'>
                       <button onClick={() => setContact(true)}  className='lord-btn'>GET IN TOUCH WITH THE OWNER</button>
                    </div>
                    ) }

                {contact && (
                    <Contact name={currentListing.name} id={currentListing.userRef}></Contact>
                )}
            </div>
        ): <h1>Something Went Wrong</h1>}
    </main>
  )
}

export default Listing