
import NoteContext from "../NoteContext";
import React,{useState,useContext} from 'react'
import Searchele from './Searchele';

const Add = () => {

  let Data=[]
  const [Results, setResults] = useState(Data)
const [stock,setstock]=useState({searchbar:""})
const onChange = (e) => {
  setstock({ ...stock, [e.target.name]: e.target.value });
//  search(e)
  console.log(stock)
  
};

    const search=async(e)=>{
      
     e.preventDefault();
   const response= await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock.searchbar}&apikey=FS77N1CHBPTE25F5`)
      let data= await response.json()
         data=data['bestMatches'] 
        // console.log(data.length)
        for (let i in data ){
          let newjson={}
          let value=data[i]
          let symbol= value["1. symbol"] 
          let name=value["2. name"] 
        //  console.log(symbol)  
           newjson['symbol']=symbol
           newjson['name']=name
           Data.push(newjson)
              
         }
       
         setResults(Data)
 
    }
    const styling=()=>{
      let btn  =document.getElementById('searchbar')
      btn.style.cssText='box-shadow: 0px 15px 10px -15px #0F393A;border:1px solid  #0F393A'
      
      btn.addEventListener('blur',()=>{
        btn.style.cssText=''
      })


    }

    return (
    <div className='container m-4'>
      <form   className="  form-inline m-3 " >
      <input className="form-control mr-sm-2 " name="searchbar" id='searchbar' onFocus={styling} type="search" onChange={onChange} placeholder="Search" aria-label="Search"/>
      <button className="btn  mx-2 my-2 my-sm-0 searchbar"  onClick={search} type="submit">Search</button>
    </form>
 
<table  cellPadding={10}>
    {Results.map((element) => {
                            return <tr className="" key={element.symbol}>
                              <Searchele symbol={element.symbol ? element.symbol : ""} name={element.name ? element.name : ""} />
                               </tr>
                        })} 
    
    {/* <button className="btn-primary" onClick={handle}>add new stock</button> */}</table>
    </div>
  )
}

export default Add
