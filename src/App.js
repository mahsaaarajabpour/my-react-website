import React, {Component} from 'react'
import {BrowserRouter} from "react-router-dom";
import './App.css';
import Routes from "./routes";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <div>
                        <Routes/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
