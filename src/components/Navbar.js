import React,{useContext} from 'react';
import {
  Link
  ,useNavigate,
  useLocation
  } from "react-router-dom";
import Alert from '../Alert';
import NoteContext from "./NoteContext";
import NavBarOff from './NavBarOff';
import './NavBar.css'
import pic from './logo-r.png'
const Navbar = () => {
  const context = useContext(NoteContext);
  let { showalert} =context;
  let navigate = useNavigate();
  let location=useLocation();
 let token=sessionStorage.getItem('token')
  const logout=()=>{
    sessionStorage.removeItem('token')
    showalert("come back soon","success")
   navigate('/Login')
   //sessionStorage.clear()

  }


  return (
    <>


    <nav className="navbar navbar-expand-lg  sticky-top navbar-light bg-light">

  
  <Link className="navbar-brand" to="/"> <img className='' src={pic} width={150} height={50} alt=""/> </Link> 
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Search">Search</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/About">About</Link>
      </li>
      <li><div><Alert/></div></li>
    </ul>
    
    {token?<>
      <NavBarOff/>
  <button className="btn mx-2" onClick={logout}>Logout</button>
 {/* {location.pathname==='/Profile'?null: <Link className='btn-primary mx-2 p-1' to="/Profile">profile</Link> */}


  </>
  :null
    }
    
  </div>

 

</nav>
{/* off canvas navbar*/}

    </>
  )
}

export default Navbar