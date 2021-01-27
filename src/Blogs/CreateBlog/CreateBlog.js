import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import './CreateBlog.css'
import axios from "axios";

class createBlog extends Component {
    constructor() {
        super();
        this.state = {
            newBlog: {
                title: '',
                content: '',
                categories: [],
                writer: '',
            },
            submitted: false,
        }
    }

    renderPostBlogForm() {
        return (
            <div className="row main-form center">
                <form className="col-md-10 create-blog-body" onSubmit={this.postBlog}>
                    <div className="pb-3">
                        <input type="text"
                               className="form-control"
                               placeholder="title"
                               onChange={event => this.handleChange(event, 'title')}
                        />
                    </div>
                    <div className="pb-3">
                                    <textarea className="form-control" cols="30" rows="7"
                                              placeholder="please enter your content"
                                              onChange={event => this.handleChange(event, 'content')}
                                    ></textarea>
                    </div>
                    <div className="pb-3">
                        <label className="m-0 pt-2 pb-2">select categories :</label>
                        <div className="form-check p-0">
                            <label>
                                <input type="checkbox"
                                       name="front-end"
                                       checked={this.state.chkbox}
                                       onChange={event => this.handleChange(event, 'categories')}
                                />
                                <span className="label-text">front-end</span>
                            </label>
                            <label>
                                <input type="checkbox"
                                       name="back-end"
                                       onChange={event => this.handleChange(event, 'categories')}
                                /> <span
                                className="label-text">back-end</span>
                            </label>
                            <label>
                                <input type="checkbox"
                                       name="react.js"
                                       onChange={event => this.handleChange(event, 'categories')}
                                /> <span
                                className="label-text">react.js</span>
                            </label>
                            <label>
                                <input type="checkbox"
                                       name="seo"
                                       onChange={event => this.handleChange(event, 'categories')}
                                /> <span
                                className="label-text">seo</span>
                            </label>
                            <label>
                                <input type="checkbox"
                                       name="vue.js"
                                       onChange={event => this.handleChange(event, 'categories')}
                                /> <span
                                className="label-text">vue.js</span>
                            </label>

                        </div>
                    </div>
                    <hr/>
                    <div className="main-form p-4">
                        <h4 className="mb-5">Preview</h4>
                        <div className="">
                            <label className="m-0  pb-2">writer :</label><span className="pr-3"></span>
                            <p  className="d-inline-block">{this.state.newBlog.writer}</p>
                        </div>
                       <div className="">
                           <label className="m-0  pb-2">title :</label><span className="pr-3"></span>
                           <p className="d-inline-block">{this.state.newBlog.title}</p>
                       </div>
                        <div className="">
                            <label className="m-0  pb-2">content :</label><span className="pr-3"></span>
                            <p  className="d-inline-block">{this.state.newBlog.content}</p>
                        </div>
                        <div className="">
                            <label className="m-0  pb-2">categories :</label><span className="pr-3"></span>
                            {this.state.newBlog.categories.map((category,index)=>{
                                return<p  className="d-inline-block" key={index}>{category},<span className="pr-1"></span></p>

                            })}
                            {/*<p  className="d-inline-block">{this.state.newBlog.categories}</p>*/}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button type="submit" className="my-btn pr-5 pl-5 font-weight-bold">post</button>
                    </div>
                </form>
            </div>
        )
    }

    renderPostedBlog() {
        return (
            <div className="row main-form center alert-success">
                <div className="col-md-8 create-blog-body  ">
                    <p className="row">your blog was successfully send!</p>
                    <div className="row center">
                        <NavLink className="my-btn pr-3 pl-3" to="/blogs/1">back</NavLink>
                    </div>
                </div>
            </div>
        )
    }

    postBlog = (event) => {
        event.preventDefault();
        axios.post("https://my-shop-react-cdca2-default-rtdb.firebaseio.com/blog.json", this.state.newBlog)
            .then(response => {
                console.log('res', response)
                this.setState({submitted: true})
            })
            .catch(error => {
                console.log('err', error)
            })
    }

    handleChange(event, type) {
        switch (type) {
            case 'title':
                this.setState({
                    newBlog: {
                        ...this.state.newBlog,
                        title: event.target.value
                    }
                })
                break;
            case 'content':
                this.setState({
                    newBlog: {
                        ...this.state.newBlog,
                        content: event.target.value
                    }
                })
                break;
            case 'categories':
                if (event.target.checked) {
                    let blog = {...this.state.newBlog}
                    blog.categories.push(event.target.name)
                    this.setState({newBlog: blog})
                } else {
                    let blog = {...this.state.newBlog}
                    const index = blog.categories.indexOf(event.target.name);
                    blog.categories.splice(index, 1)
                    this.setState({
                        newBlog: blog
                    })
                }
                break;
            case 'writer':
                this.setState({
                    newBlog: {
                        ...this.state.newBlog,
                        writer: event.target.value
                    },
                })
                break;
            // no default

        }

        // var category = ['ss']
        // category.push(event.target.value)
        // console.log('ee',category)
        // console.log('2',type)
    }

    render() {
        return (
            <div className="create-blog">
                <div className="title">
                    <p>Create Blog</p>
                    <pre>
                        <NavLink to="/">Home</NavLink>   /   <NavLink
                        to={"/blogs/" + this.props.location.state.paramsId}>Blogs</NavLink>
                    </pre>
                </div>
                <div className="container center">
                    <div className="col-md-8">

                        {!this.state.submitted &&
                        this.renderPostBlogForm()
                        }
                        {this.state.submitted &&
                        this.renderPostedBlog()
                        }

                        {/*</div>*/}

                    </div>
                </div>
            </div>
        )
    }
}

export default createBlog;


