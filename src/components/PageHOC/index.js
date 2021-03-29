import React, { Fragment,useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import {useSelector} from "react-redux";

const PageHOC = ({ children }) => {
    const info = useSelector((state) => state.userInfo.info);
    // useEffect(()=>{
    //     console.log('5',info)
    // })
    return (
        <Fragment >
                <Navbar {...{info}} />
                <main>
                    <div>
                        {children}
                    </div>
                </main>
                <Footer/>
        </Fragment>
    );
};

export default PageHOC;
