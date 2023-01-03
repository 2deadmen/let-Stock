import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import './News.css'

const News = () => {
    const [articles, setArticles] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const api="5beeaf5b46fa43218177b1a7a1ec5891"
    const updateNews = async ()=> {
        const url = ` https://newsapi.org/v2/everything?q=stocks&apiKey=${api}&pageSize=6`; 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)

    }

    useEffect(() => {
        updateNews(); 
      // eslint-disable-next-line
    }, [])
 
    return (
    <><div className='outer'> <div className="news container  ">
    <h4>The News Board <i class="fa-solid fa-thumbtack"></i></h4>
    The top news articles from across the world are pinned here...Just for you...
<div className="row">
{articles.map((element) => {
return <div className="col-md-4" key={element.url}>
<NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
</div>
})}
</div>
</div> </div></>
  )
}

export default News