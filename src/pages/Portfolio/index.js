import React, {useState, useEffect} from 'react'
import Pagination from './Pagination'
import {NavLink, Route} from "react-router-dom";
import faker from 'faker/locale/en'
import './Portfolio.css'
import PageHOC from "../../components/PageHOC";

function Portfolio(props) {

    const [pageCount, setPageCount] = useState(null)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (!check) {
            const pCount = Math.ceil(faker.image.image().length / 8);
            setPageCount(pCount)
            setCheck(true)
        }
        // eslint-disable-next-line
    }, [])

    function renderVideos() {
        let videos = [];
        for (let i = 0; i < 9; i++) {
            videos.push(
                <div className="col-md-4 videos mt-4" key={i}>
                    <div className="w-auto videos-content">
                        <img src={faker.image.image()}
                             className="card-img"
                             alt="This is pic of video."/>
                        <div className="videos-info">
                            <p>
                                {faker.date.past().getDate() + ' ' +
                                faker.date.past().getMonth() + ' ' +
                                faker.date.past().getFullYear()}
                            </p>
                            <p>
                                {faker.random.number({'min': 10, 'max': 5000})} views
                            </p></div>
                    </div>
                </div>
            )
        }
        return videos;
    }

    return (
        <PageHOC>
            <div className="portfolio">
                <div className="title">
                    <p>portfolio</p>
                    <pre>
                        <NavLink to="/">Home</NavLink>   /   Portfolio
                    </pre>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12 d-flex justify-content-center">
                            <ul className="filter list-unstyled d-flex ">
                                <li><a className="active" href="/">All</a></li>
                                <li><a href={"/portfolio/" + props.match.params.id}>app</a></li>
                                <li><a href={"/portfolio/" + props.match.params.id}>card</a></li>
                                <li><a href={"/portfolio/" + props.match.params.id}>web</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row portfolio-content">
                        {renderVideos()}
                    </div>
                    <div className="portfolio-footer">
                        <Route component={() => <Pagination pageCount={pageCount}
                                                            pageId={props.match.params.id}/>}/>
                    </div>
                </div>
            </div>
        </PageHOC>
    )
}

export default Portfolio;