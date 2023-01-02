import React from 'react'
import  pic1 from './stock-1.jpg'
import pic2 from './stock-2.webp'
import './Slider.css'

const Slider = () => {
  return (
    <>
    <div id="carouselExampleIndicators" className="carousel slide container my-5 py-3" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
  <div className="carousel-item active">
  <img className='slider-pic pic1' src={pic1} alt="..."/>
  <div className="carousel-caption d-none d-md-block">
    <h5>...</h5>
    <p>...</p>
  </div>
</div>
    <div className="carousel-item">
  <img className='slider-pic pic2' src={pic2} alt="..."/>
  <div className="carousel-caption d-none d-md-block">
    <h5>...</h5>
    <p>...</p>
  </div>
</div>

  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
    </>
  )
}

export default Slider