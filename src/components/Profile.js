import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const [name, setname] = useState()
  const [verified, setverified] = useState()
  const [email, setemail] = useState()
  const [save, setsave] = useState(false)
  const [stocknameobj, setstocknameobj] = useState({})
  const [stock, setstock] = useState([])
  const [stockid, setstockid] = useState({})
  const [seed, setseed] = useState()
useEffect(() => {
  fetchuserdata()
  getstocks()
  setTimeout(() => {
    setstate()
  }, 1100);
 
},[])
let navigate=useNavigate();



const fetchuserdata=async()=>{

  const response = await fetch(`https://let-stock.vercel.app/api/auth/getuser`, {
    method: "POST",
    
    headers: {
      "Content-Type": "application/json",
      "auth-token":sessionStorage.getItem('token')
    } 
  }
  )
  let json=await  response.json()
  setname(json.name)
  setemail(json.email)
  setverified(json.verified)
} 
const handleedit =async()=>{
  let details=document.getElementById('details')
  details.innerHTML=`Name  :<input type="text" value='${name}' placeholder='enter your name' id='name' />`;
  setsave(true)
}
const update=async(Name)=>{
let response
  try {
   response = await fetch(`https://let-stock.vercel.app/api/auth/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name:Name }),
  });
 } catch (error) {
  
 }
    fetchuserdata()
    const json = await response.json();
    let details=document.getElementById('details')
    details.innerHTML=`Name  :${name}`;
    setsave(false)
     
}
  
const getstocks = async () => {
  const response = await fetch(`https://let-stock.vercel.app/api/stocks/fetchall`, {
    method: "GET",
    headers: { "auth-token": sessionStorage.getItem("token") },
  });
  let json = await response.json()
  for (let i = 0; i < json.length; i++) {
    let value = json[i];
    let name = value["name"];
    let id=value["_id"];
    value = value["title"];
    stockid[value]=id
    stock[i]=value;
    stocknameobj[value] = name;
    

  }
 
};

const handledelete=async(id)=>{
  const response = await fetch(`https://let-stock.vercel.app/api/stocks/deletestock/${id}`, {
    method: "DELETE",
    headers: { "auth-token": sessionStorage.getItem("token") },
   
  });
  let json = await response.json()
  console.log(json)
  getstocks()
  setstate()
}

const setstate=()=>{
  setseed(Math.random(0,10))
}
  return (
    <>Profile
   <div className="container" > <div className="container">pic</div>
    <div className="container"  id='details'>Name : {name}</div>
{save?    <input type="button" value="save" onClick={()=>update(document.getElementById('name').value)} />
:null

}    <hr />

    <div key={seed} className="container" >
      email : { email} <br></br>
      account status : {verified?"verified":"not verified"}
      
      
      </div></div>
      <button align="center" onClick={handleedit}><i className="far fa-edit fa-lg"></i>Edit</button>
       <div className="container">
           {stock.map((element)=>{
            return(
            <p key={element}>   {element} ----{stocknameobj[element]} <button onClick={()=>handledelete(stockid[element])}><i className="fa fa-trash" aria-hidden="true"></i></button> </p>
            ); })}
       </div>
    </>
  )
}

export default Profile