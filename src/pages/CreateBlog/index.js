import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import './CreateBlog.css'
import axios from "axios";
import {connect} from 'react-redux'
import PageHOC from "../../components/PageHOC";

function CreateBlog(props) {

    const [postedBlog, setPostedBlog] = useState(false)
    const [newBlog, setNewBlog] = useState({title: '', content: '', categories: []})


    function renderPostBlogForm() {
        return (
            <div className="row main-form  d-flex justify-content-center">
                <form className="col-md-10 create-blog-body" onSubmit={postBlog}>
                    <div className="pb-3">
                        <input type="text"
                               className="form-control"
                               placeholder="title"
                               onChange={event => handleChange(event, 'title')}
                        />
                    </div>
                    <div className="pb-3">
                                    <textarea className="form-control" cols="30" rows="7"
                                              placeholder="please enter your content"
                                              onChange={event => handleChange(event, 'content')}
                                    ></textarea>
                    </div>
                    <div className="pb-3">
                        <label className="m-0 pt-2 pb-2">select categories :</label>
                        <div className="form-check p-0">
                            <label>
                                <input type="checkbox"
                                       name="front-end"
                                       onChange={event => handleChange(event, 'categories')}
                                />
                                <span className="label-text">front-end</span>
                            </label>
                            <label>
                                <input type="checkbox"
                                       name="back-end"
                                       onChange={event => handleChange(event, 'categories')}
                                /> <span
                                className="label-text">back-end</span>
                            </label>
                            <label>
                                <input type="checkbox"
                                       name="react.js"
                                       onChange={event => handleChange(event, 'categories')}
                                /> <span
                                className="label-text">react.js</span>
                            </label>
                            <label>
                                <input type="checkbox"
                                       name="seo"
                                       onChange={event => handleChange(event, 'categories')}
                                /> <span
                                className="label-text">seo</span>
                            </label>
                            <label>
                                <input type="checkbox"
                                       name="vue.js"
                                       onChange={event => handleChange(event, 'categories')}
                                /> <span
                                className="label-text">vue.js</span>
                            </label>

                        </div>
                    </div>
                    <hr/>
                    <div className="main-form p-4">
                        <h4 className="mb-5">Preview</h4>
                        {props.submit &&
                        <div className="">
                            <label className="m-0  pb-2">writer :</label><span className="pr-3"></span>
                            <p className="d-inline-block">{props.info.name + ' ' + props.info.lastName}</p>
                        </div>
                        }
                        <div className="">
                            <label className="m-0  pb-2">title :</label><span className="pr-3"></span>
                            <p className="d-inline-block">{newBlog.title}</p>
                        </div>
                        <div className="">
                            <label className="m-0  pb-2">content :</label><span className="pr-3"></span>
                            <p className="d-inline-block">{newBlog.content}</p>
                        </div>
                        <div className="">
                            <label className="m-0 pb-2">categories :</label><span className="pr-3"></span>
                            <p className="d-inline-block"> {newBlog.categories.join(', ')} </p>
                        </div>
                    </div>
                    {!props.submit &&
                    <div>
                        <div className="row justify-content-center">
                            <button type="submit" className="my-btn pr-5 pl-5 font-weight-bold disabled-Btn">post
                            </button>
                        </div>
                        <div className="row justify-content-center mt-1">
                            <p className="alert-danger p-1">for posting a blog , you should login first!</p>
                        </div>
                    </div>
                    }
                    {props.submit &&
                    <div className="row justify-content-center">
                        <button type="submit" className="my-btn pr-5 pl-5 font-weight-bold">post</button>
                    </div>
                    }

                </form>
            </div>
        )
    }

    function renderPostedBlog() {
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

    const postBlog = (event) => {
        event.preventDefault();
        let array = {...newBlog}
        array.writer = props.info.name + ' ' + props.info.lastName
        setNewBlog(array)
        axios.post("https://my-shop-react-cdca2-default-rtdb.firebaseio.com/blog.json", array)
            .then(response => {
                console.log('response', response)
                setPostedBlog(true)
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    function handleChange(event, type) {
        switch (type) {
            case 'title':
                setNewBlog({
                    ...newBlog,
                    title: event.target.value
                })
                break;
            case 'content':
                setNewBlog({
                        ...newBlog,
                        content: event.target.value
                    }
                )
                break;
            case 'categories':
                if (event.target.checked) {
                    let blog = {...newBlog}
                    blog.categories.push(event.target.name)
                    setNewBlog(blog)
                } else {
                    let blog = {...newBlog}
                    const index = blog.categories.indexOf(event.target.name);
                    blog.categories.splice(index, 1)
                    setNewBlog(blog)
                }
                break;
            case 'writer':
                setNewBlog({
                    ...newBlog,
                    writer: event.target.value
                })
                break;
            // no default
        }
    }

    return (
        <PageHOC>
            <div className="create-blog">
                <div className="title">
                    <p>Create Blog</p>
                    <pre><NavLink to="/">Home</NavLink>   / {props.location.state === null ? <p></p> :
                        <NavLink to={"/blogs/" + props.location.state.paramsId}>Blogs</NavLink>
                    }
                    </pre>
                </div>
                <div className="container center">
                    <div className="col-md-8">
                        {!postedBlog &&
                        renderPostBlogForm()
                        }
                        {postedBlog &&
                        renderPostedBlog()
                        }
                    </div>
                </div>
            </div>
        </PageHOC>
    )
}

export const mapStateToProps = state => {
    return {
        info: state.userInfo.info,
        submit: state.userInfo.authenticate
    }
}
export default connect(mapStateToProps)(CreateBlog);


