import { useEffect,useState } from "react"
import React from 'react'
import Logger from "./Logger"
import './homepage.css'
import Gainloose from "./Gainloose"
import News from "./News"
import './Home.css'
import Premium from "./Premium"
import Banner from "./Banner"

const Home = () => {
const [seed, setseed] = useState()
useEffect(() => {
 setseed(Math.random())
}, [])

  let token=sessionStorage.getItem("token")
  return (
    <div id={seed} className="homebody">
  
   {!token?<Logger  />:null}
 
   <Banner/>
   <Premium/>
    <Gainloose/>
    <News/>
    </div>
  )
}

export default Home