/* eslint-disable */
import React, {useState, useEffect, useRef,useCallback} from 'react'
import {NavLink} from "react-router-dom";
import './Blogs.css'
import axios from "axios";
import '../Blog/Blog.css'
import PageHOC from "../../components/PageHOC";
import ShowBlogs from "./ShowBlogs";
import SearchBar from "./SearchBar";
import Pagination from "../../components/Pagination";

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
                        <Pagination pageCount={blogPageCount}
                                    pageId={props.match.params.id}
                                    hrefLinkName="blogs"
                        />
                    </div>
                </div>
            </div>
        </PageHOC>
    )
}

export default Blogs;