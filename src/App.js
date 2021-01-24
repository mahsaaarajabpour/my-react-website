import React, {Component} from 'react'
import {BrowserRouter, Route} from "react-router-dom";

import './App.css';

import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import Blogs from './Blogs/Blogs'
// import Slider from './Slider/Slider'
import Portfolio from './Portfolio/Portfolio'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import Contact from './Contact/Contact'
import Blog from "./Blogs/Blog/Blog";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <Navbar/>
                    <div className="">
                        <Route component={Login} path="/" exact/>
                        <Route component={Portfolio} path="/portfolio" exact/>
                        <Route component={Portfolio} path="/portfolio/:id" exact/>
                        <Route component={SignUp} path="/sign-up" exact/>
                        <Route component={Contact} path="/contact" exact/>
                        <Route component={Blogs} path="/blogs" exact/>
                        <Route component={Blogs} path="/blogs/:id" exact/>
                        <Route component={Blog} path="/blog/:id"/>

                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
