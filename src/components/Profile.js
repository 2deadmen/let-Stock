import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./NoteContext";
import "./Profile.css";
const Profile = () => {
  const [name, setname] = useState();
  const [verified, setverified] = useState();
  const [email, setemail] = useState();
  const [save, setsave] = useState(false);
  const [stocknameobj, setstocknameobj] = useState({});
  const [stock, setstock] = useState([]);
  const [stockid, setstockid] = useState({});
  const [seed, setseed] = useState();
  useEffect(() => {
    fetchuserdata();
    getstocks();
    setTimeout(() => {
      setstate();
    }, 1000);
  }, []);
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  let { showalert } = context;

  const fetchuserdata = async () => {
    const response = await fetch(
      `https://let-stock.vercel.app/api/auth/getuser`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("token"),
        },
      }
    );
    let json = await response.json();
    setname(json.name);
    setemail(json.email);
    setverified(json.verified);
    setstate();
  };
  const handleedit = async () => {
    let details = document.getElementById("details");
    details.innerHTML = `Name  :<input type="text" value='${name}' placeholder='enter your name' id='name' />`;
    setsave(true);
  };
  const update = async (Name) => {
    let response;
    try {
      response = await fetch(`https://let-stock.vercel.app/api/auth/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: document.getElementById("userEmail").innerHTML,
          name: Name,
        }),
      });
    } catch (error) {}
    fetchuserdata();
    const json = await response.json();
    let details = document.getElementById("details");
    details.innerHTML = `Name  :${name}`;
    setsave(false);
  };

  const getstocks = async () => {
    const response = await fetch(
      `https://let-stock.vercel.app/api/stocks/fetchall`,
      {
        method: "GET",
        headers: { "auth-token": sessionStorage.getItem("token") },
      }
    );
    let json = await response.json();
    for (let i = 0; i < Object.keys(json).length; i++) {
      let value = json[i];
      let name = value["name"];
      let id = value["_id"];
      value = value["title"];
      stockid[value] = id;
      stock[i] = value;
      stocknameobj[value] = name;
    }
    setstate();
  };

  const handledelete = async (id, element) => {
    const response = await fetch(
      `https://let-stock.vercel.app/api/stocks/deletestock/${id}`,
      {
        method: "DELETE",
        headers: { "auth-token": sessionStorage.getItem("token") },
      }
    );
    let json = await response.json();
    if (json["success"]) {
      showalert("deleted one stock", "success");
    }
    setstock(stock.filter((item) => item !== element));
    console.log(stock);
    reload();
  };
  const reload = () => {
    getstocks();
    setstate();
  };

  const setstate = () => {
    setseed(Math.random(0, 4));
  };
  return (
    <>
      <div className="container" key={seed}>
        <h3 className="icon mx-4">
          {" "}
          <i className="fa-solid  fa-user"></i>
        </h3>
        <div className="container">
          {" "}
          <div className="container"></div>
          <h4 className="">Personal Details </h4>
          <div className="container" id="details">
            Name : {name}{" "} &nbsp;
            <span className="icon" align="center" onClick={handleedit}>
              <i className="far fa-edit fa-lg"></i>
            </span>
          </div>
          {save ? (
            <input
              type="button"
              className="btn name-save"
              value="save"
              onClick={() => update(document.getElementById("name").value)}
            />
          ) : null}{" "}
          <hr />
          <div className="container">
            Email : <p id="userEmail">{email}</p>
            account status :{" "}
            {verified ? (
              <span className="verifi"> verified </span>
            ) : (
              "not verified"
            )}
          </div>
          <hr />
          <span style={{color:'black'}}>&nbsp; Your Favourites      <span className=" refresh-btn icon">
          <i onClick={reload} className="fa-solid fa-rotate-right   "></i>
          </span> </span>{" "}
       <hr />
        </div>

        <div className="container mx-3">
          {stock === [] ? (
            <div>
              Go to search page to find your favourite stocks among more than
              1,00,000 international equities
            </div>
          ) : (
            <div>
              {stock.map((element) => {
                return (
                  <p key={stocknameobj[element]}>
                    {" "}
                    {element} ----{stocknameobj[element]} &nbsp;&nbsp;
                    <span
                      className="icon"
                      onClick={() => handledelete(stockid[element], element)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </span>{" "}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
