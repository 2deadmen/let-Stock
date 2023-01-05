import React from 'react'

const SentimentItem = (props) => {
  let {title,description,topics,imageUrl,newsUrl,author,date,source,sentiment,sentiment_score}=props
  description=description.substring(0,200)+"..." 
  
  let year=date.substring(0,4);
   let month=date.substring(4,6);
   let day=date.substring(6,8);
   date=year+"-"+month+"-"+day;
   sentiment_score=sentiment_score.slice(0,3)
   topics=topics.slice(0,3)
    return (
    <div> <div className="my-3">
    <div className="card">
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
        }
        }>

            <span className="badge rounded-pill bg-danger text-light"> {source} </span>
        </div>
        <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">{description}</p>
           
           
           <p>  sentiment---{sentiment} on {date}</p>
           <hr />

{sentiment_score.map((element)=>{
  return   <p>ticker --- {element['ticker']}  <br />sentiment --- {element['ticker_sentiment_label']} </p>

})
}



<hr />
{topics.map((element)=>{
  return   <p>topic --- {element['topic']}  <br />relevance score --- {element['relevance_score']} </p>

})
}


  
<p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} </small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
    </div>
</div></div>
  )
}

export default SentimentItem