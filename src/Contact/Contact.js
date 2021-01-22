import React, {Component} from 'react'
import './Contact.css'
import {NavLink} from "react-router-dom";
import axios from "axios";

class contact extends Component {
    constructor() {
        super();
        this.state = {
            messageInfo: {
                name: '',
                email: '',
                subject: '',
                message: '',
            }
        }
    }

    handleChange(event, type) {
        event.preventDefault();
        switch (type) {
            case 'name':
                this.setState({
                    messageInfo: {
                        ...this.state.messageInfo,
                        name: event.target.value
                    }
                })
                break;
            case 'email':
                console.log('1', this.state.messageInfo)

                this.setState({
                    messageInfo: {
                        ...this.state.messageInfo,
                        email: event.target.value
                    }
                })
                break;
            case 'subject':
                console.log('2', this.state.messageInfo)

                this.setState({
                    messageInfo: {
                        ...this.state.messageInfo,
                        subject: event.target.value
                    }
                })
                break;
            case 'message':
                console.log('3', this.state.messageInfo)

                this.setState({
                    messageInfo: {
                        ...this.state.messageInfo,
                        message: event.target.value
                    }
                })
                break;
            // no default

        }
    }

    //handle submit
    SendMessage = (e) => {
        e.preventDefault();
        axios.post('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/contact.json', this.state.messageInfo)
            .then(response => {
                console.log(response)
            }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="contact">
                <div className="title">
                    <p>Contact</p>
                    <pre>
                        <NavLink to="/">Home</NavLink>   /   Contact
                    </pre>
                </div>
                <div className="container">
                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37544.996079770775!2d51.3323354014984!3d35.703984603857236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dfe05732c2e91%3A0xfcbec017befd15f4!2sAzadi%20Tower!5e0!3m2!1sen!2sus!4v1611089448083!5m2!1sen!2sus"
                            width="100%" height="260" frameBorder="0" title="map" allowFullScreen="" aria-hidden="false"
                            tabIndex="0"></iframe>
                    </div>
                    <div className="info row">
                        <div className="col col-md-4">
                            <div className="address">
                                <i className="fas fa-map-marker-alt"></i>
                                <h3>location:</h3>
                                <p>Tehran , Iran</p>
                            </div>
                            <div className="email">
                                <i className="fas fa-envelope"></i>
                                <h3>Email:</h3>
                                <p>mahsaa.rajabpour@gmail.com</p>
                            </div>
                            <div className="phone">
                                <i className="fas fa-phone-alt"></i>
                                <h3>call:</h3>
                                <p>09375970781</p>
                            </div>
                        </div>
                        <form className="col col-md-8" onSubmit={this.SendMessage}>
                            <div className="row">
                                <div className="col-md-6 form-group pl-0 pr-3">
                                    <input className="form-control"
                                           type="text"
                                           placeholder="your name"
                                           onChange={event => this.handleChange(event, 'name')}
                                           required/>
                                </div>
                                <div className="col-md-6 form-group p-0">
                                    <input className="form-control" type="email"
                                           placeholder="your Email"
                                           onChange={event => this.handleChange(event, 'email')}
                                           required/>
                                </div>
                            </div>
                            <div className="row form-group">
                                <input className="form-control" type="text"
                                       placeholder="subject"
                                       onChange={event => this.handleChange(event, 'subject')}
                                       required/>
                            </div>
                            <div className="row form-group">
                                <textarea className="form-control" name="subject" id="subject" cols="100"
                                          rows="5" placeholder="message"
                                          value={this.state.messageInfo.message}
                                          onChange={event => this.handleChange(event, 'message')}
                                          required>message</textarea>
                            </div>
                            <div className="row send-message">
                                <button type="submit" className="my-btn">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default contact;