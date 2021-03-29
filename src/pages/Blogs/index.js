// eslint-disable-next-line
import React, {useState, useEffect, useRef,useCallback} from 'react'
import {NavLink} from "react-router-dom";
import faker from 'faker/locale/en'
import './Blogs.css'
import axios from "axios";
import './Blog/Blog.css'
import PageHOC from "../../components/PageHOC";

function Blogs(props) {
    const [blogs, setBlogs] = useState([])
    const [decreasedBlogs, setDecreasedBlogs] = useState([])
    const [blogPageCount, setBlogPageCount] = useState(null)
    const [checked, setChecked] = useState(false)
    const [pageSize] = useState(6)
    const [searchResults,setSearchResults] = useState([])
    const [loading, setLoading] = useState(false);
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

    // eslint-disable-next-line
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

    // eslint-disable-next-line
    useEffect(() => {
            if (!unMounted.current) getBlogs();
        },
        // eslint-disable-next-line
        [blogPageCount]
    );

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

    function renderBlogs() {
        if (blogs.length !== 0 && !error) {
            let showResult
            if (searchResults.length>0) showResult=searchResults
            else showResult=decreasedBlogs
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
                                                    paramsId: props.match.params.id,
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
                                                    paramsId: props.match.params.id,
                                                    blog: blog
                                                }
                                            }}>{blog.writer}</NavLink>
                                        </li>
                                        <li className="col"><i className="far fa-clock"></i>
                                            <NavLink to={{
                                                pathname: '/blog/' + blog.id,
                                                state: {
                                                    paramsId: props.match.params.id,
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
                                            paramsId: props.match.params.id,
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
            if (error) return <div className="col mb-5"><p className="row justify-content-center">{error}</p></div>
            else return (
                <div className="col mb-5 loading">
                    <p className="row justify-content-center"><i className="fa fa-spinner fa-spin p-1"/> Loading ...</p>
                    <p className="row vpn">please connect to your vpn</p>
                </div>
            )
        }
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

    const searchBlogs=(input)=>{
        setLoading(false);
        if (input==='') {
            setSearchResults([])
            setError('')
        }
        else {
            let search = blogs.filter(blog => blog.title.toLowerCase().includes(input))
            if (search.length<=0) setError('there is no result')
            else setError('')
            setSearchResults(search)
        }
    }

    const debounce = (fn,delay) => {
        let inDebounce = null;
        return args => {
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => fn(args), delay);
            setLoading(true);
        };
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSave = (debounce((input)=>searchBlogs(input), 5000));

    const handleChangeSearch = (event) => {
        let input = event.target.value.toLowerCase().trim();
        debouncedSave(input);
    };

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
                    <div className="search-panel">
                        <div className="search-bar d-flex justify-content-center">
                            <input className="col-md-6 col-sm-8"
                                   id="search-bar-blogs"
                                   type="text"
                                   placeholder="search your blog"
                                   onChange={event => handleChangeSearch(event)}
                            />
                            {/*<button className="my-btn" onClick={searchBlogs}><i className="fas fa-search"></i></button>*/}
                        </div>
                        {loading === true &&
                        <div className="col mb-5 loading">
                            <p className="row justify-content-center"><i className="fa fa-spinner fa-spin p-1"/> </p>
                        </div>
                        }
                    </div>
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
                        {renderBlogs()}
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