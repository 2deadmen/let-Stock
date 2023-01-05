import React,{useContext} from 'react'
import NoteContext from "./components/NoteContext";
function Alert() {
  const context = useContext(NoteContext);
    let { alert} =context;

  return (
  alert &&<span className={`alert mx-2 alert-${alert.type}`} role="alert">
    {alert.msg}
  </span>
  )
}

export default Alert