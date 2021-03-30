import React from 'react'
import faker from "faker/locale/en";
import {NavLink} from "react-router-dom";
import '../Blogs.css'

function ShowBlogs(props) {
    if (props.blogs.length !== 0 && !props.error) {
        let showResult
        if (props.searchResults.length > 0) showResult = props.searchResults
        else showResult = props.decreasedBlogs
        return (
            showResult.map((blog, index) => {
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
                                                paramsId: props.paramsId,
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
                                                paramsId: props.paramsId,
                                                blog: blog
                                            }
                                        }}>{blog.writer}</NavLink>
                                    </li>
                                    <li className="col"><i className="far fa-clock"></i>
                                        <NavLink to={{
                                            pathname: '/blog/' + blog.id,
                                            state: {
                                                paramsId: props.paramsId,
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
                                        paramsId: props.paramsId,
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
        if (props.error) return <div className="col mb-5"><p className="row justify-content-center">{props.error}</p>
        </div>
        else
            return (
            <div className="col mb-5 loading">
                <p className="row justify-content-center"><i className="fa fa-spinner fa-spin p-1"/> Loading ...</p>
                <p className="row vpn">please connect to your vpn</p>
            </div>
        )
    }
}

export default ShowBlogs;