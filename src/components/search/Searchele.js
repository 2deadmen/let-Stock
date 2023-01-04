import React, { useContext } from "react";
import NoteContext from "../NoteContext";
import { Link } from "react-router-dom";
const Searchele = (props) => {
  let { symbol, name } = props;

  let context = useContext(NoteContext);
  const { setindi, setstockname, showalert } = context;

  const setname = (symbol, name) => {
    setindi(symbol);
    sessionStorage.setItem("indi", symbol);
    sessionStorage.setItem("stockname", name);
    setstockname(name);
    sessionStorage.setItem("searchbar", true);
  };

  const addtodb = async (symbol, name) => {
    try {
      const response = await fetch(
        `https://let-stock.vercel.app/api/stocks/addstock`,
        {
          method: "POST",
          headers: {
            "auth-token": sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: symbol, name: name }),
        }
      );
      if (response.status === 200) {
        showalert(`added ${name} to favourites`, "success");
      } else if (response.status === 400) {
        showalert(`${name} is already in your favourites `, "success");
      }
    } catch {}
  };

  return (
    <>
      {" "}
      
      
        <td  >
          {" "}
          <Link to="/Stock" onClick={() => setname(symbol, name)}>
            {symbol} --- {name}{" "}
          </Link>
        </td>{" "}
        <td>
          {" "}
          <span>
            {" "}
            <button className="btn" onClick={() => addtodb(symbol, name)}>
              {" "}
              add to favourites
            </button>{" "}
          </span>
        </td>
     
    </>
  );
};

export default Searchele;
