import React from 'react';
import {
    Link
    } from "react-router-dom";
import './logger.css';

const logger = () => {
  return (
    <div className='logger'>
          <span className='loggertxt'>Login to get personalized information</span>
      <span className='loggerbtn'> <span className='loginbtn primary mx-2 my-2'><Link to="/Login" className='btn primary'>Login</Link></span>
    <span className='signupbtn primary my-2 mx-2'><Link to="/Signup"  className='btn primary'>Signup</Link></span>
</span>
   </div>
  )
}

export default logger