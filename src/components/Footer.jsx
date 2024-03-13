import React from 'react'
import x from "../assets/x.png"
import ig from "../assets/ig.png"
import github from "../assets/github.png"

function Footer() {
  return (
   
    <div className="footer-container">

        <h4>Follow Us!</h4>
         <div className="social-footer">
            <img src={x}></img>
            <img src={ig}></img>
            <img src={github}></img>
         </div>

         <div className="footer-info">
            <div><a href='/about'>About</a></div>
            <div><a href='/'>Advertasing</a></div>
            <div><a href='/'>Privacy</a></div>
            <div><a href='/'>Need Help!</a></div>
            <div><a href='/'>Terms</a></div>
            <div><a href='/'>Jobs</a></div>
         </div>

         <p className='footer-text'>Created by <span>Eduardo Moreno</span> with❤️</p>
    </div>
  )
}

export default Footer