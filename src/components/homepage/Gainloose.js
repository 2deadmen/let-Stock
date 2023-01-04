import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import NoteContext from "../NoteContext";
import "./Gainloose.css";

const Gainloose = () => {
  //let loaded=false
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    if (diffkey.length > 0) {
      setheading(true);
    } else {
      setheading(false);
    }
    getstocks();
    // eslint-disable-next-line
  }, []);

  let context = useContext(NoteContext);
  const {
    setindi,
    setstockname,
    setdiffkey,
    setdiffvalue,
    setvolarr,
    setvolkey,
    diffvalue,
    diffkey,
    volarr,
    volkey,
    indi,
    setgdata,
    gdata,
  } = context;
  let famous = {};
  // let stocknameobj={}
  const apikey = process.env.REACT_APP_API;
  const host = "https://let-stock.vercel.app";
  const [stocks, setstock] = useState(famous);
  const [stocknameobj, setstocknameobj] = useState({});
  const [heading, setheading] = useState(false);
  //get all notes

  const getstocks = async () => {
    const response = await fetch(`${host}/api/stocks/fetchall`, {
      method: "GET",
      headers: { "auth-token": sessionStorage.getItem("token") },
    });
    let json = {};
    if (token) {
      json = await response.json();
    } else {
      json = [
        {
          _id: "637675b481d6fa3760329804",
          user: "636e3ff818f443c9ae43279e",
          title: "TSLA",
          name: "Tesla Inc",
          __v: 0,
        },
        {
          _id: "6376769081d6fa3760329806",
          user: "636e3ff818f443c9ae43279e",
          title: "AAPL",
          name: "Apple Inc",
          __v: 0,
        },
        {
          _id: "6376769f81d6fa3760329808",
          user: "636e3ff818f443c9ae43279e",
          title: "APLE",
          name: "Apple Hospitality REIT Inc",
          __v: 0,
        },
        {
          _id: "637676cd81d6fa376032980a",
          user: "636e3ff818f443c9ae43279e",
          title: "TATACHEM.BSE",
          name: "TATA CHEMICALS LTD.",
          __v: 0,
        },
        {
          _id: "637676d281d6fa376032980c",
          user: "636e3ff818f443c9ae43279e",
          title: "TATACOMM.BSE",
          name: "TATA COMMUNICATIONS LTD.",
          __v: 0,
        },
        {
          _id: "6377c07547ad0b6a9b8f2773",
          user: "636e3ff818f443c9ae43279e",
          title: "TESS",
          name: "Tessco Technologies Inc",
          __v: 0,
        },
      ];
    }

    let newjson = {};

    for (let i = 0; i < json.length; i++) {
      let value = json[i];
      let name = value["name"];
      value = value["title"];

      stocknameobj[value] = name;
      newjson[i] = value;
    }

    setstock(newjson);
  };

  let gainers = 0;

  const myObj = stocks;
  //functions for getting dates
  // function getCurrentDate(separator = "-") {
  //   let newDate = new Date();
  //   let date = newDate.getDate() - 2;
  //   let month = newDate.getMonth() + 1;
  //   let year = newDate.getFullYear();

  //   return `${year}${separator}${
  //     month < 10 ? `0${month}` : `${month}`
  //   }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  // }

  // function getYesterdayDate(separator = "-") {
  //   let newDate = new Date();
  //   let date = newDate.getDate() - 3;
  //   let month = newDate.getMonth() + 1;
  //   let year = newDate.getFullYear();

  //   return `${year}${separator}${
  //     month < 10 ? `0${month}` : `${month}`
  //   }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  // }

  //declaring objects and arrays for storing data
  let diffarr = {};
  let vollarr = {};

  let difvalue = [];
  let volarray = [];

  let called = 0;
  //getting dates for data drilling
  // let date = getCurrentDate();
  // // console.log(date)
  // let ydate = getYesterdayDate();
  /////

  //have to put this function in a try catch to solve date error

  ///

  const fetchcompanies = async () => {
    //for loop that jumps +5 ....api convienience
    for (let i = called; i < Object.keys(myObj).length; i++) {
      gainers++;
      //fetching values
      // let value
      // let yvalue
      let vol;
      let diff;

      let response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${myObj[i]}&apikey=${apikey}`
      );
      let data = await response.json();
      gdata.push(data);

      //  value = data["Time Series (Daily)"][`${date}`]["4. close"];

      //  yvalue = data["Time Series (Daily)"][`${ydate}`]["4. close"];
      //  vol = data["Time Series (Daily)"][`${date}`]["6. volume"];
      //  diff = value - yvalue;
      try {
        vol = data["Global Quote"]["06. volume"];
        diff = data["Global Quote"]["09. change"];
      } catch (e) {
        continue;
      }
      volarray.push(vol);

      difvalue.push(diff);

      diffarr[`${myObj[i]}`] = diff;

      vollarr[`${myObj[i]}`] = vol;

      if (gainers >= called + 5) {
        break;
      }
    }

    diffarr = Object.keys(diffarr).sort(function (a, b) {
      return diffarr[b] - diffarr[a];
    });
    setdiffkey(diffarr);

    difvalue = difvalue.sort((a, b) => b - a);

    setdiffvalue(difvalue);

    setvolkey(
      Object.keys(vollarr).sort(function (a, b) {
        return vollarr[b] - vollarr[a];
      })
    );
    setvolarr(volarray.sort((a, b) => b - a));
    setheading(true);

    called += 5;
  };

  const taketoInd = (element, stockname, Index) => {
    sessionStorage.setItem("stockname", stockname);
    sessionStorage.setItem("searchbar", false);
    sessionStorage.setItem("gdata", JSON.stringify(gdata[Index]));
    sessionStorage.setItem("indi", element);
  };

  return (
    <div className="outer">
      <div className="gainloose container">
        Its free DATA ...so use it wisely{" "}
        <button
          className="btn float-right"
          // onMouseOver={getstocks}
          onClick={fetchcompanies}
        >
          {" "}
          fetch data
        </button>
        <br />
        <br />
        {/* <button className="btn-primary" onClick={getstocks}>to fetch from db</button> */}
        <>
          {" "}
          {heading ? (
            <div className=" container">
              <div className="container ">
                <h3> &nbsp;Trending by change in market</h3>
                <table>
                  <thead>
                    <tr>
                      <th>&nbsp; &nbsp; Name</th>
                      <th>&nbsp; &nbsp;Symbol</th>
                      <th>&nbsp; &nbsp; Change</th>
                    </tr>
                  </thead>{" "}
                  <tbody>
                    {diffkey.map((element, Index) => {
                      return (
                        <tr key={Index}>
                          {" "}
                          <Link
                            className="links"
                            to="/Stock"
                            onClick={() =>
                              taketoInd(element, stocknameobj[element], Index)
                            }
                          >
                            <td>{stocknameobj[element]}</td>
                          </Link>
                          <td>{element}</td>{" "}
                          <td>
                            {diffvalue[Index] > 0 ? 
                              <span style={{ color: "green" }}>
                                {" "}
                                +{diffvalue[Index]} &#8593;
                              </span>
                             : 
                              <span style={{ color: "brown" }}>
                                 {diffvalue[Index]} &#8595;
                              </span>
                            }
                          </td>
                          <hr />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="container my-2 ">
                <h3> &nbsp;Trending by volume in market</h3>
                <table>
                  <thead>
                    <tr>
                      <th>&nbsp; &nbsp; Name</th>
                      <th>&nbsp; &nbsp; Symbol</th>
                      <th> &nbsp;&nbsp; Volume</th>
                    </tr>
                  </thead>{" "}
                  <tbody>
                    {volkey.map((element, Index) => {
                      return (
                        <tr key={Index}>
                          <Link
                            className="links"
                            to="/Stock"
                            onClick={() =>
                              taketoInd(element, stocknameobj[element], Index)
                            }
                          >
                            <td>{stocknameobj[element]}</td>
                          </Link>{" "}
                          <td>{element}</td>
                          <td className="values">
                            {volarr[Index] > 0 ? (
                              <span>{volarr[Index]}</span>
                            ) : (
                              <span style={{ color: "brown" }}>
                                -{volarr[Index]}
                              </span>
                            )}{" "}
                          </td>
                          <hr />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default Gainloose;
