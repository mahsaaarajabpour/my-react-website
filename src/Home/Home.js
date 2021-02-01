import React , {Component} from 'react'
// import {NavLink} from "react-router-dom";
import Slider from '../Slider/Slider'
import './Home.css'
export class home extends Component{
    // constructor() {
    //     super();
    // }
    render() {
        return(
            <div>
                <Slider/>
                <div className="home border">
                    salam
                </div>
            </div>

        )
    }
}
export default home