import React, {Component} from 'react'
import './Footer.css'

class footer extends Component {
    render() {
        return (
            <footer className="main-footer ">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 contact  ">
                        <h3>Company</h3>
                        <p>
                            Iran , Tehran
                            <br/>
                            <br/>
                            <strong>Phone: </strong>
                            09375970781
                            <br/>
                            <strong>Email: </strong>
                            mahsaa.rajabpour@gmail.com
                        </p>
                        <ul className="social-media">
                            <li>
                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                <a target="_blank" href="https://github.com/mahsaaarajabpour/my-react-website">
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i className="fab fa-gitlab"></i>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i className="fab fa-skype"></i>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-12  links  ">
                        <h4>Useful links</h4>
                        <ul>
                            <li className="">
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">About us</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Services</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Terms of service</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Privacy policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 links ">
                        <h4>our services</h4>
                        <ul>
                            <li className="">
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Web Design</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Web Development</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Product Management</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Marketing</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right pr-2"></i>
                                <a href="/">Graphic Design</a>
                            </li>
                        </ul>

                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 newsletter ">
                        <h4>our newsletter</h4>
                        <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                        <div className="subscribe">
                            <input id="email" type="email" placeholder="email"/>
                            <button type="submit">Subscribe</button>
                        </div>

                    </div>
                </div>
                <div className="row footer-copyright">
                    <p>© Copyright. All Rights Reserved</p>
                    <p>Design by Mahsa Rajabpour</p>
                </div>
            </footer>
        )
    }
}

export default footer;