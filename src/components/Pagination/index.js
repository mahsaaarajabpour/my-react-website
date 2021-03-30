import React from 'react'
import {NavLink} from "react-router-dom";

function Pagination(props) { // props=  pId ,  blogPageCount

    const renderPrevPage = () => {
        const pId = Number(props.pId) - 1;
        if (props.blogPageCount) {
            if (Number(props.pId) === 1) {
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

    const renderLi = () => {
        const j = props.blogPageCount;
        let link = [];
        if (props.blogPageCount !== null) {
            for (let i = 1; i <= j; i++) {
                link.push(
                    <NavLink key={i} to={"/blogs/" + i}>{i}</NavLink>
                )
            }
            return link;
        }
    }

    const renderNextPage = () => {
        const pId = Number(props.pId) + 1;
        if (props.blogPageCount) {
            if (Number(props.pId) >= props.blogPageCount) { //disable next-btn
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

export default Pagination;