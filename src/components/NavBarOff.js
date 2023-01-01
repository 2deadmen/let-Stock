import React ,{useState}from 'react'
import {
    Link
    } from "react-router-dom";
import './NavBarOff.css'
import Profile from './Profile';

const NavBarOff = () => {
    

  const [open, setopen] = useState(false)
    function openNav() {
      document.getElementById("mySidenav").style.width = "400px";
      setopen(true)
     

    }
    


    function closeNav() {
     if (open) {
        document.getElementById("mySidenav").style.width = "0";
        setopen(false)
       
     }
    }
   
   // const concernedElement = document.querySelector(".sidenav");

    document.addEventListener("mousedown", (event) => {
      const concernedElement = document.querySelector(".sidenav");
      if (!concernedElement.contains(event.target)) {
      
        closeNav()
      }
    });

  
    return (
    <>
  
<div  id="mySidenav" className="sidenav">
  <Link  className="closebtn" onClick={closeNav}>&times;</Link>
  <Profile />
</div>


 
 <button onClick={openNav}><i class="fa-regular fa-user"></i>
</button>
 


   
    </>
  )
}

export default NavBarOff