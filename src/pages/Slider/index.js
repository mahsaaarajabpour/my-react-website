import React, {Component} from 'react'
import './Slider.css'
import slide1 from '../../assets/image/slider/6.jpg'
import slide2 from '../../assets/image/slider/3.jpg'
import slide3 from '../../assets/image/slider/7.jpg'


class slider extends Component {
    render() {
        return (
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slide1} className="d-block w-100" alt="slide1"/>
                        <div className="carousel-caption d-none d-sm-block">
                            <h2>Welcome</h2>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            <button className="btn btn-read-more">Read more</button>

                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={slide2} className="d-block w-100" alt="slide2"/>
                        <div className="carousel-caption d-none d-sm-block">
                            <h2>Second slide label</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <button className="btn btn-read-more">Read more</button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={slide3} className="d-block w-100" alt="slide3"/>
                        <div className="carousel-caption d-none d-sm-block">
                            <h2>Third slide label</h2>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            <button className="btn btn-read-more">Read more</button>

                        </div>
                    </div>
                </div>

                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default slider;