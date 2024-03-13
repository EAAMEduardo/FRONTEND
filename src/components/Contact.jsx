import React from 'react'
import {getOwner} from "../api/auth"
import { useState } from 'react'
import { useEffect } from 'react'


function Contact({id, name}) {

  const [owner, setOwner] = useState()

  useEffect(() => {

   async function getUser () {
     const email = await getOwner(id)
     console.log(email.data)
     setOwner(email.data)
    
  }

  getUser()

  },[])


  return (
    <div className="contact-container">
       {owner && (
        <a className='mail' href={`mailto:${owner.email}?subject=Regarding ${name}`}>Contact With <span className='owner'>{owner.username}</span></a>
       )}
    </div>
  )
}

export default Contact