import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../NoteContext";
import { useNavigate } from "react-router-dom";
// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// // Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// // Step 4 - Include the chart type
import candlestick from "fusioncharts/fusioncharts.charts";

// // Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Sentiment from "./Sentiment";
import Premium from "../homepage/Premium";

// // Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, candlestick, FusionTheme);

const Stock = () => {
  const apikey = process.env.REACT_APP_API;
  //variables for data
  const context = useContext(NoteContext);
  let navigate = useNavigate();
   const [showchart, setshowchart] = useState(false)
  const [seed, setseed] = useState(1);
  let { setdailydata, dailydata,setreport ,setreporttype} = context;
  const [qhigh, setqhigh] = useState("");
  const [qlow, setqlow] = useState("");
  const [qopen, setqopen] = useState("");
  const [qclose, setqclose] = useState("");
  const [qchange, setqchange] = useState("");
  const [qprice, setqprice] = useState("");
  const [qchangepercent, setqchangepercent] = useState("");
  const [qvol, setqvol] = useState("");
  const [qlastdate, setqlastdate] = useState("");
const [weeklyData, setweeklyData] = useState({})
const [monthlyData, setmonthlyData] = useState({})
  const [chartConfigs, setchartConfigs] = useState();
  //for fetching data
  useEffect(() => {
    globalQuote(sessionStorage.getItem("indi"));
    fetchglobal()
    setTimeout(() => {
      // fetchdailydata(sessionStorage.getItem('indi'));
      globalQuote(sessionStorage.getItem("indi"));
    }, 2000);

  }, []);
  let stockname = sessionStorage.getItem("stockname");
  //
  
  const fetchglobal = async () => {
  let checkgdata =sessionStorage.getItem("gdata");
  if(!checkgdata) {
      let response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sessionStorage.getItem(
          "indi"
        )}&apikey=${apikey}`
      );
      let data = await response.json();
      sessionStorage.setItem("gdata", JSON.stringify(data));
    }else{
      globalQuote()
    }
  }

  //fetching market news and sentiment

  //fetching global quote data

  const globalQuote = async () => {
    let data;
    //console.log(gdata)//
    data = JSON.parse(sessionStorage.getItem("gdata"));

    setqopen(data["Global Quote"]["02. open"]);
    setqclose(data["Global Quote"]["08. previous close"]);
    setqhigh(data["Global Quote"]["03. high"]);
    setqlow(data["Global Quote"]["04. low"]);
    setqprice(data["Global Quote"]["05. price"]);
    setqvol(data["Global Quote"]["06. volume"]);
    setqlastdate(data["Global Quote"]["07. latest trading day"]);
    setqchange(data["Global Quote"]["09. change"]);
    setqchangepercent(data["Global Quote"]["10. change percent"]);
  };
  let datas = [];
  let count = 1;
  //fetching daily data
  const fetchdailydata = async (element) => {
    let response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${element}&outputsize=compact&apikey=${apikey}`
    );
    setdailydata(await response.json());

    let jsondata = dailydata["Time Series (Daily)"];

    try {
      for (let i in jsondata) {
        let json = {};
        json["open"] = jsondata[i]["1. open"];
        json["high"] = jsondata[i]["2. high"];
        json["low"] = jsondata[i]["3. low"];
        json["close"] = jsondata[i]["4. close"];
        json["x"] = count;
        json["volume"] = jsondata[i]["6. volume"];
        datas.push(json);
        count++;
      }
    } catch (error) {}
    //console.log(datas);

    setchartConfigs({
      type: "candlestick", // The chart type
      width: "800", // Width of the chart
      height: "400",
      // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        chart: {
          id: "chart",

          theme: "fusion",
          caption: `Daily Stock Price ${element}`,
          subCaption: "Last 2 months",
          numberprefix: "$",
          vNumberPrefix: " ",
          pyaxisname: "Price",
          vyaxisname: "Volume (In Millions)",
          toolTipColor: "#ffffff",
          toolTipBorderThickness: "0",
          toolTipBgColor: "#000000",
          toolTipBgAlpha: "80",
          toolTipBorderRadius: "2",
          toolTipPadding: "5",
        },
        categories: [
          {
            category: [
              {
                label: "2 month ago",
                x: "1",
              },
              {
                label: "1 month ago",
                x: "51",
              },
              {
                label: "Today",
                x: "100",
              },
            ],
          },
        ],
        dataset: [
          {
            data: datas,
          },
        ],
      },
    });
  };

  ///////////weekly
  const weeklydata = async (element) => {
    let response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${element}&apikey=${apikey}`
    );
    setweeklyData( await response.json())

    let jsondata = weeklyData["Weekly Time Series"];

    try {
      for (let i in jsondata) {
        let json = {};
        json["open"] = jsondata[i]["1. open"];
        json["high"] = jsondata[i]["2. high"];
        json["low"] = jsondata[i]["3. low"];
        json["close"] = jsondata[i]["4. close"];
        json["x"] = count;
        json["volume"] = jsondata[i]["5. volume"];
        datas.push(json);
        count++;
      }
    } catch (error) {}
    //console.log(datas);

    setchartConfigs({
      type: "candlestick", // The chart type
      width: "800", // Width of the chart
      height: "400",
      // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        chart: {
          id: "chart",

          theme: "fusion",
          caption: `Weekly Stock Price ${element}`,
          subCaption: "Covered Last 20+ years historic data",
          numberprefix: "$",
          vNumberPrefix: " ",
          pyaxisname: "Price",
          vyaxisname: "Volume (In Millions)",
          toolTipColor: "#ffffff",
          toolTipBorderThickness: "0",
          toolTipBgColor: "#000000",
          toolTipBgAlpha: "80",
          toolTipBorderRadius: "2",
          toolTipPadding: "5",
        },
        categories: [
          {
            category: [
              {
                label: " 20 years ago",
                x: "1",
              },
              {
                label: "10 years ago",
                x:  (Object.keys(jsondata).length)/2
              },
              {
                label: "Today",
                x: Object.keys(jsondata).length,
              },
            ],
          },
        ],
        dataset: [
          {
            data: datas,
          },
        ],
      },
    });
  };
  const monthlydata = async (element) => {
    let response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${element}&apikey=${apikey}`
    );
    setmonthlyData( await response.json());

    let jsondata = monthlyData["Monthly Time Series"];

    try {
      for (let i in jsondata) {
        let json = {};
        json["open"] = jsondata[i]["1. open"];
        json["high"] = jsondata[i]["2. high"];
        json["low"] = jsondata[i]["3. low"];
        json["close"] = jsondata[i]["4. close"];
        json["x"] = count;
        json["volume"] = jsondata[i]["5. volume"];
        datas.push(json);
        count++;
      }
    } catch (error) {}
    //console.log(datas);

    setchartConfigs({
      type: "candlestick", // The chart type
      width: "800", // Width of the chart
      height: "400",
      // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        chart: {
          id: "chart",

          theme: "fusion",
          caption: `Monthly Stock Price ${element}`,
          subCaption: "Covered Last 20+ years historic data",
          numberprefix: "$",
          vNumberPrefix: " ",
          pyaxisname: "Price",
          vyaxisname: "Volume (In Millions)",
          toolTipColor: "#ffffff",
          toolTipBorderThickness: "0",
          toolTipBgColor: "#000000",
          toolTipBgAlpha: "80",
          toolTipBorderRadius: "2",
          toolTipPadding: "5",
        },
        categories: [
          {
            category: [
              {
                label: "20 years ago",
                x:  "1"
              },
              {
                label: "10 years ago",
                x: (Object.keys(jsondata).length)/2
              },
              {
                label: "Today",
                x: Object.keys(jsondata).length,
              },
            ],
          },
        ],
        dataset: [
          {
            data: datas,
          },
        ],
      },
    });
  };

  ///todo

  const reload = (n) => {
    setseed(Math.random());
    switch (n) {
      case 1:
        fetchdailydata(sessionStorage.getItem("indi"));
        setshowchart(true)
        break;
      case 2:
        weeklydata(sessionStorage.getItem("indi"));
        setshowchart(true)
        break;
      case 3:
        monthlydata(sessionStorage.getItem("indi"));
        setshowchart(true)
        break;
      default:
        fetchdailydata(sessionStorage.getItem("indi"));
        setshowchart(true)
        break;
    }
    // navigate('/')
    // setTimeout(() => {
    //  navigate('/Stock')
    // }, 1);'
  };

  //report generation
  const reportdaily=()=>{
    setreport(dailydata)
    navigate('/Report')
    setreporttype("daily")

  }
  const reportweekly=()=>{
    setreport(weeklyData)
    setreporttype("weekly")
    navigate('/Report')

  }
  const reportmonthly=()=>{
    setreporttype("monthly")
    setreport(monthlyData)
    navigate('/Report')

  }
  return (
    <>
      <div>
        {sessionStorage.getItem("indi")}---{stockname}
      </div>

      <div className="container">
        <h2>global Quote data</h2>
        <div className="container">
          open :{qopen} <br />
          close :{qclose} <br />
          average price per stock :{qprice} <br />
          high :{qhigh} <br />
          low :{qlow} <br />
          volume :{qvol} <br />
          last traded day of this stock: {qlastdate} <br />
          change :{qchange} <br />
          change percentage :{qchangepercent}
        </div>
        <div className="container align-center">
          <button
            type="button"
            className="btn-primary"
            value="update graph"
            onClick={() => reload(1)}
          >
            update graph
          </button>
        </div>
      {showchart?  <div id="chart-container">
          <ReactFC {...chartConfigs} key={seed} />
        </div>:null}
        <div className="container">
          <button className="btn-primary" onClick={() => reload(1)}>
            daily
          </button>
          <button className="btn-primary" onClick={() => reload(2)}>
            weekly
          </button>
          <button className="btn-primary" onClick={() => reload(3)}>
            monthly
          </button>
        </div>
      </div>
      <Premium/>
      <Sentiment element={sessionStorage.getItem("indi")} />
   
      <div className="container"><h3>REPORT GENERATION SECTION</h3>
      <button onClick={reportdaily}>daily series report </button>
      <button  onClick={reportweekly}>weekly series report</button>
      <button  onClick={reportmonthly}>monthly series report</button>
      </div>

    </>

  );
};

export default Stock;
