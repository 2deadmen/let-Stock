import React,{useEffect,useState} from 'react';
import SentimentItem from './SentimentItem';
import  DefaultNews from './DefaultNews.json';
const Sentiment = (props) => {
  const [data, setdata] = useState([])
    useEffect(() => {
      fetchnews()
    }, [])
    
 
    const fetchnews=async()=>{
        
        let response = await fetch(
            `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=earnings&apikey=${process.env.REACT_APP_API}&tickers=${props.element}` );
          let jsondata=await response.json();
         if(jsondata.feed)
          setdata(jsondata['feed']);
         else {
          let response = await fetch(
            `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=earnings&apikey=${process.env.REACT_APP_API}` );
          let jsondata=await response.json();
          setdata(jsondata['feed'].slice(0,6));
          if(jsondata.Note){
            setdata(DefaultNews['feed'].slice(0,6))
          }
         }

    }
 
    return (
    <div>
      <p> sentiment_score_definition: x &lt;= -0.35: Bearish; -0.35  x &lt;= -0.15: Somewhat-Bearish; -0.15  x &lt; 0.15: Neutral; 0.15 &lt;= x &lt; 0.35: Somewhat_Bullish; x &gt;= 0.35: Bullish"</p> 

      <div className="container">
       
      </div>
        <div className="container ">
                         
                        <div className="row">
                             {data.map((element) => {
                                 return <div className="col-md-4" key={element.url}>
                                     <SentimentItem title={element.title ? element.title : ""} description={element.summary ? element.summary : ""} imageUrl={element.banner_image} newsUrl={element.url} author={element.authors[0]} date={element.time_published} source={element.source} sentiment={element.overall_sentiment_label} sentiment_score={element.ticker_sentiment} topics={element.topics}/>
                                 </div>
                             })}
                         </div>
                         </div>
    </div>
  )
}

export default Sentiment