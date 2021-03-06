import React from 'react'
import {BrowserRouter} from "react-router-dom";
import './App.css';
import Routes from "./routes";

function App() {
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

export default App;
