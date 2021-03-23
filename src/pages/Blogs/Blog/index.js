import React from 'react'
import {NavLink} from "react-router-dom";
import './Blog.css'
import faker from 'faker/locale/en'


class Blog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: this.props.location.state.blog
        }
    }

    renderBlogCard() {
        return (
            <article className="blog-card entry">
                <img src={faker.image.image()}
                     alt="blog"
                     className="card-img"/>
                <div className="article-body">
                    <h2>{this.state.blog.title}</h2>
                    <ul className="row">
                        <li>
                            <i className="fas fa-user pr-1"></i>
                            {this.state.blog.writer}
                        </li>
                        <li>
                            <i className="far fa-clock pr-1"></i>
                            {faker.date.past().getDate() + ' ' +
                            faker.date.past().getMonth() + ' ' +
                            faker.date.past().getFullYear()}
                        </li>
                        <li>
                            <i className="far fa-comment-dots pr-1"></i>
                            Comments
                        </li>
                    </ul>
                    <div className="article-content">
                        <p>{this.state.blog.content}</p>
                        <hr/>
                        <ul className="row key-word"><i className="fas fa-tags pr-3"></i>
                            {this.state.blog.categories.map((category, index) => {
                                    return (
                                        <li key={index}> {category} </li>
                                    )
                                }
                            )}
                        </ul>
                    </div>
                </div>
            </article>
        )
    }

    renderComments() {
        let comment = [];
        for (let i = 1; i <= 8; i++) {
            comment.push(
                <div className="comment" key={i}>
                    <img src={faker.image.image()}
                         alt="blog"
                         className="avatar"/>
                    <div className="row">
                        <h5>{faker.name.firstName() + ' ' + faker.name.lastName()}</h5>
                        <p><i className="fas fa-reply"></i> Reply</p>
                    </div>
                    <time className="date">{faker.date.past().getDate() + ' ' +
                    faker.date.past().getMonth() + ' ' +
                    faker.date.past().getFullYear()}</time>
                    <p className="message">{faker.lorem.sentences()}</p>

                </div>
            )
        }
        return comment;
    }

    renderReply() {
        return (
            <div className="container">
                <h4>Leave a Reply</h4>
                <p>Your email address will not be published. Required fields are marked *</p>
                <div className="row">
                    <div className="col-md-6 form-group pl-0 reply-name">
                        <input className="form-control" type="text"
                               placeholder="your name"
                               required
                        />
                    </div>
                    <div className="col-md-6 form-group pl-0">
                        <input className="form-control"
                               type="email" placeholder="your Email"
                               required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group pl-0">
                        <input className="form-control" type="text"
                               placeholder="your website"
                               required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group pl-0 ">
                        <textarea className="form-control"
                               placeholder="your comment"
                                  rows="5"
                               required
                        ></textarea>
                    </div>
                </div>
                <div className="row send-message">
                    <button type="submit" className="my-btn">Post Comment</button>
                </div>
            </div>
        )
    }

    renderRecentPosts(){
        let recentPosts=[];
        for (let i=0;i<5;i++){
            recentPosts.push(
                <li className="row" key={i}>
                        <img src={faker.image.image()}
                             alt="blog"
                             className=""
                        />
                    <div className="col-md-8">
                            <p>{faker.lorem.sentence()}</p>
                            <time className="date">{faker.date.past().getDate() + ' ' +
                            faker.date.past().getMonth() + ' ' +
                            faker.date.past().getFullYear()}</time>
                    </div>
                </li>
            )
        }
        return recentPosts
    }

    render() {
        return (
            <div className="blog-view">
                <div className="title">
                    <p>{this.state.blog.title}</p>
                    <pre>
                        <NavLink to="/">Home</NavLink>   /   <NavLink
                        to={"/blogs/" + this.props.location.state.paramsId}>Blogs</NavLink>
                    </pre>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {this.renderBlogCard()}
                            <div className="user-comments">
                                <h4>8 comments</h4>
                                {this.renderComments()}
                            </div>
                            <div className="reply entry">
                                {this.renderReply()}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="search-panel entry">
                                <h3 className="search-title ">Search</h3>
                                <div className="search-bar d-flex justify-content-center">
                                    <input type="text"/>
                                    <button className="my-btn"><i className="fas fa-search"></i></button>
                                </div>
                                <div className="categories">
                                    <h3>Categories</h3>
                                    <ul>
                                        <li><a href="/">General <span>(15)</span></a></li>
                                        <li><a href="/">Lifestyle <span>(14)</span></a></li>
                                        <li><a href="/">Travel<span>(8)</span></a></li>
                                        <li><a href="/">Design<span>(12)</span></a></li>
                                        <li><a href="/">Creative<span>(5)</span></a></li>
                                        <li><a href="/">Education<span>(10)</span></a></li>
                                    </ul>
                                </div>
                                <div className="recent-posts">
                                    <h3>Recent Posts</h3>
                                    <ul>
                                        {this.renderRecentPosts()}
                                    </ul>
                                </div>
                                <div className="tags">
                                    <h3>Tags</h3>
                                    <ul>
                                        <li><a href="/">front-end</a></li>
                                        <li><a href="/">It</a></li>
                                        <li><a href="/">react.js</a></li>
                                        <li><a href="/">mac</a></li>
                                        <li><a href="/">vuejs</a></li>
                                        <li><a href="/">javaScript</a></li>
                                        <li><a href="/">computer</a></li>
                                        <li><a href="/">git</a></li>
                                        <li><a href="/">back-end</a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Blog