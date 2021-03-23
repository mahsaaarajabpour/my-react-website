import React, {Component} from 'react'
import {BrowserRouter} from "react-router-dom";
import './App.css';
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Routes from "./routes";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <Navbar/>
                    <div>
                        <Routes/>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
