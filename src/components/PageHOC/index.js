import React, { Fragment } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const PageHOC = ({ children }) => {
    return (
        <Fragment >
                <Navbar/>
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
