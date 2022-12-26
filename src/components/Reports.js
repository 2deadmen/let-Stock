import React,{useContext} from 'react'
import NoteContext from "./NoteContext";

const Reports = () => {
  
  
   const context = useContext(NoteContext);
   let { report,reporttype } = context;
  let report_head=report['Meta Data']
  let report_body
  switch (reporttype) {
    case "daily":
      report_body=report['Time Series (Daily)']
      break;
    case "weekly":
        report_body=report['Weekly Time Series']
        break;
    case "monthly":
      report_body=report['Monthly Time Series']
      break;
    default:
      break;
  }
//report_body=JSON.stringify(report_body)
//  console.log(report_body)

  let arr=[]
  let datearr=[]
  Object.keys(report_body).forEach(function(key) {
    arr.push(report_body[key]);
    datearr.push(key)
    //console.log(report_body[key]['1. open'])
   // console.log(arr)
  });
  console.log(datearr)
    return (
    <div className='container'>Reports

       information--- {report_head['1. Information']} <br />
       ticker--- {report_head['2. Symbol']} <br /> <br /> <hr />
        {/* timezone---{report_head['5. Time Zone']} */}
      {/* {report_body} */}
    {
      arr.map((element,Index)=>{
        return( <div key={Index}>
             DATE : {datearr[Index]} <br /><br />

             open : {element['1. open']} <br />
             close : {element['4. close']} <br />
             high : {element['2. high']} <br />
             low : {element['3. low']} 
             <br /> <hr />
</div>)
      })
    }
   
    </div>

  )
}

export default Reports