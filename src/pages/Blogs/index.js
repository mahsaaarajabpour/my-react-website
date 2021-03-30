/* eslint-disable */
import React, {useState, useEffect, useRef,useCallback} from 'react'
import {NavLink} from "react-router-dom";
import './Blogs.css'
import axios from "axios";
import './Blog/Blog.css'
import PageHOC from "../../components/PageHOC";
import ShowBlogs from "./ShowBlogs";
import SearchBar from "./SearchBar";

function Blogs(props) {
    const [blogs, setBlogs] = useState([])
    const [decreasedBlogs, setDecreasedBlogs] = useState([])
    const [blogPageCount, setBlogPageCount] = useState(null)
    const [checked, setChecked] = useState(false)
    const [pageSize] = useState(6)
    const [searchResults,setSearchResults] = useState([])
    const [error, setError] = useState('');

    const prevFavRef = useRef();
    useEffect(() => {
        prevFavRef.current = props.match.params.id;
    });
    const prevPropsId = prevFavRef.current;

    //*** set component is mounted or not ***//
    const unMounted = useRef(false);
    useEffect(() => {
        return () => {
            unMounted.current = true;
            setBlogs([])
        };
    }, []);

    useEffect(() => {
        const nowPSize = props.match.params.id * pageSize;
        const firstVideoNumArray = nowPSize - pageSize;
        if (blogs.length !== 0) {
            if (checked === false || prevPropsId !== props.match.params.id) {
                const array = blogs.slice(firstVideoNumArray, nowPSize)
                setDecreasedBlogs(array);
                setChecked(true)
            }
        }
    })

    useEffect(() => {
            if (!unMounted.current) getBlogs();
        }, [blogPageCount]);

    function getBlogs() {
        axios.get('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/blog.json')
            .then(res => {
                for (let key in res.data) {
                    res.data[key].id = key
                }
                const result = Object.keys(res.data).map((key) => res.data[key]);
                setBlogs(result)
                let page = Math.ceil(blogs.length / 6);
                setBlogPageCount(page)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function renderPrevPage() {
        const pId = Number(props.match.params.id) - 1;
        if (blogPageCount) {
            if (Number(props.match.params.id) === 1) {
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

    function renderLi() {
        const j = blogPageCount;
        let link = [];
        if (blogPageCount !== null) {
            for (let i = 1; i <= j; i++) {
                link.push(
                    <NavLink key={i} to={"/blogs/" + i}>{i}</NavLink>
                )
            }
            return link;
        }
    }

    function renderNextPage() {
        const pId = Number(props.match.params.id) + 1;
        if (blogPageCount) {
            if (Number(props.match.params.id) >= blogPageCount) { //disable next-btn
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

    function renderPagination() {
        return (
            <div className="m-pagination">
                <div className="prev">
                    {renderPrevPage()}
                </div>
                <div className="col col-md-6 center-page">
                    {renderLi()}
                </div>
                <div className="next">
                    {renderNextPage()}
                </div>
            </div>
        )
    }

    function getResults(results,error) {
        setSearchResults(results)
        setError(error)
    }

    return (
        <PageHOC>
            <div className="blogs-view">
                <div className="title">
                    <p>Blogs</p>
                    <pre>
                        <NavLink to="/">Home</NavLink>   /   Blogs
                    </pre>
                </div>
                <div className="container ">
                    <SearchBar blogs={blogs}
                               showResults={(results,error)=>getResults(results,error)}
                    />

                    <div className="row blogs-header justify-content-between">
                        <h5><NavLink to={{
                            pathname: '/create-blog',
                            state: {
                                paramsId: props.match.params.id,
                            }
                        }}><i className="fas fa-edit"></i>click to create new blog</NavLink></h5>
                        <p>page {props.match.params.id} of {blogPageCount}</p>
                    </div>
                    <div className="row blogs-content">
                        <ShowBlogs
                            paramsId={props.match.params.id}
                            blogs={blogs}
                            searchResults={searchResults}
                            error={error}
                            decreasedBlogs={decreasedBlogs}/>
                    </div>
                    <div className="row blogs-footer ">
                        {renderPagination()}
                    </div>
                </div>
            </div>
        </PageHOC>
    )
}

export default Blogs;