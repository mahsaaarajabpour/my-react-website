import React from 'react'
import {NavLink} from "react-router-dom";

function Pagination(props) {

    const renderPrevPage = () => {
        const pId = Number(props.pageId) - 1;
        if (props.pageCount) {
            if (Number(props.pageId) === 1)
                return <NavLink id="prevBtn" className="disabled-Btn " to={"/portfolio/" + pId}>
                    <i className="fas fa-angle-double-left"></i>
                </NavLink>
            else
                return <NavLink id="prevBtn" className="prev-page-btn " to={"/portfolio/" + pId}>
                    <i className="fas fa-angle-double-left"></i>
                </NavLink>

        }
    }

    const renderLi = () => {
        const j = props.pageCount;
        let link = [];
        if (props.pageCount !== null) {
            for (let i = 1; i <= j; i++) {
                link.push(<NavLink key={i} to={"/portfolio/" + i}>{i}</NavLink>)
            }
            return link;
        }
    }

    const renderNextPage = () => {
        const pId = Number(props.pageId) + 1;
        if (props.pageCount) {
            if (Number(props.pageId) >= props.pageCount) { //disable next-btn
                return <NavLink id="nextBtn" className="disabled-Btn" to={"/portfolio/" + pId}>
                    <i className="fas fa-angle-double-right"></i>
                </NavLink>
            } else {// enable next-btn
                return <NavLink id="nextBtn" className="next-page-btn" to={"/portfolio/" + pId}>
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
    );
}

export default Pagination;