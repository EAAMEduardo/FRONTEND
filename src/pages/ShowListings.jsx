import React from 'react'
import house from "../assets/house.jpg"
import search from "../assets/search-index.png"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewListings from '../components/NewListings'
import Sections from '../components/Sections'
import Footer from "../components/Footer"

function ShowListings() {

  const [terms, setTerms] = useState({
    type: "all",
    furnished: false,
    parking: false
  })
  console.log(terms)


  const navigate = useNavigate()

  

  const handleChange = (e) => {
     if(e.target.id === "type") {
         setTerms({
          ...terms, type: e.target.value
         })
     }

     if(e.target.id === "furnished") {
        if(e.target.value === "true") {
          setTerms({
            ...terms, furnished: true
          })
        } else {
          setTerms({
            ...terms, furnished: false
          })
        }
     }

     if(e.target.id === "parking"){
      
      if(e.target.value === "true") {
        setTerms({
          ...terms, parking: true
        })
      } else {
        setTerms({
          ...terms, parking: false
        })
      }
     }

     
  }

  const handleSearch = () => {
    const url = new URLSearchParams(location.search)
    url.set("parking", terms.parking)
    url.set("furnished", terms.furnished)
    url.set("type", terms.type)

    const newUrl = url.toString()
    navigate(`/search?${newUrl}`)
    
  }


  return (
    <>
    <div className="index-container">
      <div className="index-left">
          <h1>Find your next</h1>
          <br></br>
          <h1><span>perfect</span> place</h1>
          <br></br>
          <h1>to live.</h1>

          <p className='index-desc'>Real estate is real property that consists of land and improvements, 
            which includes buildings, fixtures, roads , strutures and systems. </p>

            <div className="index-search">
              <div className="selects">
              <p>Property Type</p>
                <select onChange={(e) => handleChange(e)} id='type'>
                   <option value={"rent"}>Rent</option>
                   <option value={"sell"}>Sell</option>
                   <option selected value={"all"}>Both</option>
                </select>
                
              </div>

              <div className="selects">
              <p>Furnished</p>
                <select onChange={(e) => handleChange(e)} id='furnished'>
                   <option value={true}>Yes</option>
                   <option selected value={false}>Not</option>
                </select>
                 
              </div>

              <div className="selects">
              <p>With Parking</p>
                <select onChange={(e) => handleChange(e)} id='parking'>
                   <option value={true}>Yes</option>
                   <option selected value={false}>Not</option>
                </select>
                
              </div>

              <div className="index-btn">
                <img onClick={handleSearch} src={search}></img>
              </div>
            </div>
      </div>

      <div className="index-right">
         <img src={house}></img>
      </div>
    </div>
     <h1 className='landing-title'>Newly Listed</h1>
    <NewListings></NewListings>
    <Sections></Sections>
    <Footer></Footer>
    </>
  )
}

export default ShowListings