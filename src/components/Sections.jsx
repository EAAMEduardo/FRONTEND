import React from 'react'
import furnished from "../assets/furnishedhouse.jpg"
import onrent from "../assets/onrent.jpg"
import onsale from "../assets/onsale.jpg"
import over from "../assets/over.jpg"
import { useNavigate } from 'react-router-dom'

function Sections() {

  const navigate = useNavigate()

  const handleSection = (e) => {
      const params = new URLSearchParams()

      if(e.target.id === "furnished") {
        params.set("furnished", true)
        const url = params.toString()

        navigate(`/search?${url}`)
      }

      if(e.target.id === "rent") {
        params.set("type", "rent")
        const url = params.toString()

        navigate(`/search?${url}`)
      }

      if(e.target.id === "sell") {
        params.set("type", "sell")
        const url = params.toString()

        navigate(`/search?${url}`)
      }

      if(e.target.id === "over") {
        params.set("price", 350000)
        const url = params.toString()

        navigate(`/search?${url}`)
      }
  }



  return (
    <>
    <div className="sections-container">
        <div  className="section section-one">
            <img id='furnished' onClick={(e) => handleSection(e)} className='section-img' src={furnished}></img>
             
             <div className="section-info">
               <h4>Explore</h4>
               <h2>Furnished Houses</h2>
               <button>View Houses</button>
             </div>
        </div>

        <div className="section section-two">
            <img id='rent' onClick={(e => handleSection(e))} className='section-img' src={onrent}></img>
             <div className="section-info">
               <h4>Explore</h4>
              <h2>Houses to Rent </h2>
               <button>View Houses</button>
             </div>
        </div>

        <div className="section section-three">
            <img id='sell' onClick={(e) => handleSection(e)} className='section-img' src={onsale}></img>
            <div className="section-info">
              <h4>Explore</h4>
              <h2>Houses to Buy </h2>
              <button>View Houses</button>
            </div>
        </div>
    </div>

    <div className=" section over-section">
            <img id='over' onClick={(e) => handleSection(e)} className='section-img' src={over}></img>
            
            <div className="section-info">
              <h4>Explore</h4>
              <h2>Over ${new Intl.NumberFormat().format(350000) } </h2>
              <button>View Houses</button>
            </div>
        </div>
    </>
  )
}

export default Sections