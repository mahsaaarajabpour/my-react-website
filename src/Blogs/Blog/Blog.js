import React from 'react'
import {NavLink} from "react-router-dom";

class Blog extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('1',prevProps,prevState,snapshot)
    }

    render() {
        return(
            <div className="Blog">
                <div className="title">
                    <p>blog</p>
                    <pre>
                        <NavLink to="/">Home</NavLink>   /   <NavLink to={"/blogs/" + this.props.location.state.paramsId} >Blogs</NavLink>
                    </pre>
                </div>
                <div className="container">

                </div>
            </div>
        )
    }
}

export default Blog