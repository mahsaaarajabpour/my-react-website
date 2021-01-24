import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './Navbar.css'

class navbar extends Component {
    // constructor() {
    //     super();
    // }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white ">
                <a className="nav-logo" href="/">My Shop</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavDropdown"
                        aria-controls="myNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="myNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact>Home</NavLink>
                        </li>
                        {/*<li className="nav-item dropdown">*/}
                        {/*    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button"*/}
                        {/*       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                        {/*        About*/}
                        {/*    </a>*/}
                        {/*    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">*/}
                        {/*        <a className="dropdown-item" href="/">About Us</a>*/}
                        {/*        <a className="dropdown-item" href="/">Team</a>*/}
                        {/*    </div>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item ">*/}
                        {/*    <a className="nav-link" href="/">Services</a>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/portfolio/1">Portfolio</NavLink>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="/">Pricing</a>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blogs/1">Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>

                    </ul>
                    <p className="m-0 p-0">hi</p>
                </div>
            </nav>
        )
    }
}

export default navbar;