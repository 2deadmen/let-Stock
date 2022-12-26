import React,{useState} from 'react'
import NoteContext from './NoteContext'

const StockState = (props) => {
    const [indi, setindi] = useState("")
    const [stockname, setstockname] = useState("")
    const [diffkey, setdiffkey] = useState([]);
    const [diffvalue, setdiffvalue] = useState([]);
    const [volarr, setvolarr] = useState([]);
    const [volkey, setvolkey] = useState([]);
    const [gdata, setgdata] = useState([])
  const [dailydata, setdailydata] = useState({})
  const [forgotemail, setforgotemail] = useState("")
  const [alert, setalert] = useState(null)
  const [report, setreport] = useState("")
  const [reporttype, setreporttype] = useState("")
  const showalert =(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }

    return (
    <>  <NoteContext.Provider value={{reporttype,setreporttype,report,setreport,alert,showalert,forgotemail,setforgotemail,indi,setindi,stockname,setstockname,diffkey,diffvalue,volarr,volkey,setdiffkey,setdiffvalue,setvolarr,setvolkey,gdata,setgdata,dailydata,setdailydata}}>
    {props.children}

</NoteContext.Provider></>
  )
}

export default StockState