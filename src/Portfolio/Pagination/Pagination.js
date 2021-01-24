import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

class pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: null,
            checkPage: true,
        }
    }


    renderPrevPage() {
        const pId = Number(this.props.pageId) - 1;
        if (this.props.pageCount) {
            if (Number(this.props.pageId) === 1) {
                return <NavLink id="prevBtn" className="disabled-prevBtn " to={"/portfolio/" + pId}>
                    <i className="fas fa-angle-double-left"></i>
                </NavLink>
            } else {
                return <NavLink id="prevBtn" className="prev-page-btn " to={"/portfolio/" + pId}>
                    <i className="fas fa-angle-double-left"></i>
                </NavLink>
            }
        }
    }

    renderLi() {
        const j = this.props.pageCount;
        let link = [];
        if (this.props.pageCount !== null) {
            for (let i = 1; i <= j; i++) {
                link.push(
                    <NavLink key={i} to={"/portfolio/" + i}>{i}</NavLink>
                )
            }
            return link;
        }
    }

    renderNextPage() {
        const pId = Number(this.props.pageId) + 1;
        if (this.props.pageCount) {
            if (Number(this.props.pageId) >= this.props.pageCount) { //disable next-btn
                return <NavLink id="nextBtn" className="disabled-nextBtn" to={"/portfolio/" + pId}>
                    <i className="fas fa-angle-double-right"></i>
                </NavLink>
            } else {// enable next-btn
                return <NavLink id="nextBtn" className="next-page-btn" to={"/portfolio/" + pId}>
                    <i className="fas fa-angle-double-right"></i>
                </NavLink>
            }
        }
    }

    render() {
        return (
            <div className="m-pagination">
                <div className="prev">
                    {this.renderPrevPage()}
                </div>
                <div className="col col-md-6 center-page">
                    {this.renderLi()}
                </div>
                <div className="next">
                    {this.renderNextPage()}
                </div>
            </div>
        );
    }
}

export default pagination;