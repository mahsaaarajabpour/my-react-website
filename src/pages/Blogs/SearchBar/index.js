/* eslint-disable */
import React, {useState,useEffect} from 'react';
import '../Blogs.css'


function SearchBar(props){

    const [loading, setLoading] = useState(false);
    const [results,setResults] = useState([])
    const [error, setError] = useState('');

    useEffect(()=>{
        props.showResults(results,error)
    },[results,error])

    const searchBlogs=(input)=>{
        setLoading(false);
        if (input==='') {
            setResults([])
            setError('')
        }
        else {
            let search = props.blogs.filter(blog => blog.title.toLowerCase().includes(input))
            if (search.length<=0) setError('there is no result')
            else setError('')
            setResults(search)
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

    const debouncedSave = (debounce((input)=>searchBlogs(input), 5000));

    const handleChangeSearch = (event) => {
        let input = event.target.value.toLowerCase().trim();
        debouncedSave(input);
    };


    return(
        <div className="search-panel">
            <div className="search-bar d-flex justify-content-center">
                <input className="col-md-6 col-sm-8"
                       id="search-bar-blogs"
                       type="text"
                       placeholder="search your blog"
                       onChange={event => handleChangeSearch(event)}

                />
            </div>
            {loading === true &&
            <div className="col mb-5 loading">
                <p className="row justify-content-center"><i className="fa fa-spinner fa-spin p-1"/> </p>
            </div>
            }
        </div>
    )
}
export default SearchBar