import React from 'react'
import { Link } from 'react-router-dom';

import './Banner.css';

const Banner = () => {
  return (
    <div className='img'>
        <br /><br /><br />
     <span className='head '>  Let'Stock</span> 
      <br /><span className='body-banner'> Better Analysing. <span className='body-banner2'>Smarter Investing.</span></span>
      <br /> <br /><span className='btn'>  <Link to="/Login" className='btn'><i className="fa-solid fa-cart-shopping"></i> &nbsp; Premium Coming soon</Link></span>
           </div>
  )
}

export default Banner