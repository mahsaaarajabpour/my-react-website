import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import faker from 'faker/locale/en'
import './Blogs.css'
import axios from "axios";

// import * as path from "path";


class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            decreasedBlogs: [],
            blogPageCount: null,
            checked: false,
            pageSize: 6,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const nowPSize = this.props.match.params.id * this.state.pageSize;
        const firstVideoNumArray = nowPSize - this.state.pageSize;
        if (this.state.blogs.length !== 0) {
            if (this.state.checked === false || prevProps.match.params.id !== this.props.match.params.id) {
                const array = this.state.blogs.slice(firstVideoNumArray, nowPSize)
                this.setState({decreasedBlogs: array, checked: true})
            }
        }
    }

    componentDidMount() {
        axios.get('https://addblog-vuejs.firebaseio.com/posts.json')
            .then(res => {
                for (let key in res.data) {
                    res.data[key].id = key
                }
                var result = Object.keys(res.data).map((key) => res.data[key]);
                this.setState({blogs: result})

                let page = Math.ceil(this.state.blogs.length / 6);
                this.setState({blogPageCount: page})
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderBlogs() {
        if (this.state.blogs.length !== 0) {
            return (
                this.state.decreasedBlogs.map((blog, index) => {
                    return (
                        <div className="col-md-4 blog" key={index}>
                            <div className="entry">
                                <img src={faker.image.image()}
                                     alt="blog"
                                     className="card-img"/>
                                <div className="content">
                                    <h2 className="blog-title">
                                        <NavLink
                                            to={{
                                                pathname: '/blog/' + blog.id,
                                                state: {paramsId: this.props.match.params.id}
                                            }}>
                                            {blog.title}
                                        </NavLink>
                                    </h2>
                                    <ul>
                                        <li className=""><i className="fas fa-user p-1"></i>
                                            <NavLink to={{
                                                pathname: '/blog/' + blog.id,
                                                state: {paramsId: this.props.match.params.id}
                                            }}>{blog.writer}</NavLink>
                                        </li>
                                        <li className=""><i className="far fa-clock p-1"></i>
                                            <NavLink to={{
                                                pathname: '/blog/' + blog.id,
                                                state: {paramsId: this.props.match.params.id}
                                            }}>B</NavLink>
                                        </li>
                                    </ul>
                                    <p>{blog.content}</p>
                                    <NavLink to={{
                                        pathname: '/blog/' + blog.id,
                                        state: {paramsId: this.props.match.params.id}
                                    }} className="my-btn">read more</NavLink>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        } else {
            return (
                <div className="col center mb-5 loading">
                    <p><i className="fa fa-spinner fa-spin"/> Loading ...</p>
                </div>
            )
        }
    }

    renderPrevPage() {
        const pId = Number(this.props.match.params.id) - 1;
        if (this.state.blogPageCount) {
            if (Number(this.props.match.params.id) === 1) {
                return <NavLink id="prevBtn" className="disabled-prevBtn " to={"/blogs/" + pId}>
                    <i className="fas fa-angle-double-left"></i>
                </NavLink>
            } else {
                return <NavLink id="prevBtn" className="prev-page-btn " to={"/blogs/" + pId}>
                    <i className="fas fa-angle-double-left"></i>
                </NavLink>
            }
        }
    }

    renderLi() {
        const j = this.state.blogPageCount;
        let link = [];
        if (this.state.blogPageCount !== null) {
            for (let i = 1; i <= j; i++) {
                link.push(
                    <NavLink key={i} to={"/blogs/" + i}>{i}</NavLink>
                )
            }
            return link;
        }
    }

    renderNextPage() {
        const pId = Number(this.props.match.params.id) + 1;
        if (this.state.blogPageCount) {
            if (Number(this.props.match.params.id) >= this.state.blogPageCount) { //disable next-btn
                return <NavLink id="nextBtn" className="disabled-nextBtn" to={"/blogs/" + pId}><i
                    className="fas fa-angle-double-right"></i>
                </NavLink>
            } else {// enable next-btn
                return <NavLink id="nextBtn" className="next-page-btn" to={"/blogs/" + pId}>
                    <i className="fas fa-angle-double-right"></i>
                </NavLink>
            }
        }
    }

    renderPagination() {
        return (
            <div className="m-pagination">
                <div className="prev">
                    {this.renderPrevPage()}
                </div>
                <div className="col col-md-6 center-page">
                    {this.renderLi()}
                </div>
                <div className="next">
                    {this.renderNextPage()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="blogs-view">
                <div className="title">
                    <p>Blogs</p>
                    <pre>
                        <NavLink to="/">Home</NavLink>   /   Blogs
                    </pre>
                </div>
                <div className="container ">
                    <div className="row blogs-header">

                    </div>
                    <div className="row blogs-content">
                        {this.renderBlogs()}
                    </div>
                    <div className="row blogs-footer ">
                        {this.renderPagination()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Blogs