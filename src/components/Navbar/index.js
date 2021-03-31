import React from 'react';
import {NavLink} from "react-router-dom";
import './Navbar.css'
import {connect} from "react-redux"
import * as actionCreators from '../../redux'

function Navbar(props) {

    const renderWelcomeName = () => {
        let subValue = ''
        if (props.submit) {
            subValue = (
                <div className="my-dropdown row">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        hi {props.info.name} <i className="fas fa-home"></i>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <p className="dropdown-item m-0" onClick={props.onLogOut}>log out</p>
                    </div>
                </div>
            )
        } else {
            subValue = <NavLink to="/">you are not login yet?</NavLink>
        }
        return subValue
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white ">
            <a className="nav-logo" href="/">My Shop</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavDropdown"
                    aria-controls="myNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="myNavDropdown">
                <div className="navbar-content">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/portfolio/1">Portfolio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blogs/1">Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create-blog">Add Blog</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    {renderWelcomeName()}
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        info: state.userInfo.info,
        submit: state.userInfo.authenticate
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actionCreators.userLogOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);