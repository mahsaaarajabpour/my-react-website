import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import faker from 'faker/locale/en'
import './Blogs.css'
import axios from "axios";
import './Blog/Blog.css'

class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            decreasedBlogs: [],
            blogPageCount: null,
            checked: false,
            pageSize: 6,
            searchInput: ''
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
        axios.get('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/blog.json')
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
                                                state: {
                                                    paramsId: this.props.match.params.id,
                                                    blog: blog
                                                }
                                            }}>
                                            {blog.title}
                                        </NavLink>
                                    </h2>
                                    <ul>
                                        <li className="col"><i className="fas fa-user"></i>
                                            <NavLink to={{
                                                pathname: '/blog/' + blog.id,
                                                state: {
                                                    paramsId: this.props.match.params.id,
                                                    blog: blog
                                                }
                                            }}>{blog.writer}</NavLink>
                                        </li>
                                        <li className="col"><i className="far fa-clock"></i>
                                            <NavLink to={{
                                                pathname: '/blog/' + blog.id,
                                                state: {
                                                    paramsId: this.props.match.params.id,
                                                    blog: blog
                                                }
                                            }}>
                                                {faker.date.past().getDate() + '.' +
                                                faker.date.past().getMonth() + '.' +
                                                faker.date.past().getFullYear()}
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <p>{blog.content}</p>
                                    <NavLink to={{
                                        pathname: '/blog/' + blog.id,
                                        state: {
                                            paramsId: this.props.match.params.id,
                                            blog: blog
                                        }
                                    }} className="my-btn">read more</NavLink>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        } else {
            return (
                <div className="col mb-5 loading">
                    <p className="row justify-content-center"><i className="fa fa-spinner fa-spin p-1"/> Loading ...</p>
                    <p className="row vpn">please connect to your vpn</p>
                </div>
            )
        }
    }

    renderPrevPage() {
        const pId = Number(this.props.match.params.id) - 1;
        if (this.state.blogPageCount) {
            if (Number(this.props.match.params.id) === 1) {
                return <NavLink id="prevBtn" className="disabled-Btn" to={"/blogs/" + pId}>
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
                return <NavLink id="nextBtn" className="disabled-Btn" to={"/blogs/" + pId}><i
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
                    <div className="search-panel">
                        <div className="search-bar d-flex justify-content-center">
                            <input className="col-md-6 col-sm-8"
                                   type="text"
                                   placeholder="search your blog"
                                   onChange={event => this.setState({searchInput: event.target.value})}
                            />
                            <button className="my-btn"><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                    <div className="row blogs-header justify-content-between">
                        <h5><NavLink to={{
                            pathname: '/create-blog',
                            state: {
                                paramsId: this.props.match.params.id,
                            }
                        }}><i className="fas fa-edit"></i>click to create new blog</NavLink></h5>
                        <p>page {this.props.match.params.id} of {this.state.blogPageCount}</p>
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