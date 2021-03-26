import React, {Component} from 'react'
import Pagination from './Pagination'
import {NavLink, Route} from "react-router-dom";
import faker from 'faker/locale/en'
import './Portfolio.css'
import PageHOC from "../../components/PageHOC";

class portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: null,
            check: false,
            pageId: null,
            myData: []
        }
    }

    componentDidMount() {
        if (!this.state.check) {
            const pCount = Math.ceil(faker.image.image().length / 8);
            this.setState({pageCount: pCount, check: true})
        }
    }

    renderVideos() {
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

    render() {
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
                                    <li><a href={"/portfolio/" + this.props.match.params.id}>app</a></li>
                                    <li><a href={"/portfolio/" + this.props.match.params.id}>card</a></li>
                                    <li><a href={"/portfolio/" + this.props.match.params.id}>web</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row portfolio-content">
                            {this.renderVideos()}
                        </div>
                        <div className="portfolio-footer">
                            <Route component={() => <Pagination pageCount={this.state.pageCount}
                                                                pageId={this.props.match.params.id}/>}/>
                        </div>
                    </div>

                </div>
            </PageHOC>
        )
    }

}

export default portfolio;