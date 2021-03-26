import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import './SignUp.css'
import axios from "axios";
import PageHOC from "../../components/PageHOC";

class signUp extends Component {
    constructor() {
        super();
        this.state = {
            users: {
                name: '',
                lastName: '',
                email: '',
                password: null
            },
            emailError: false,
            submit: false,
        }
    }

    //
    // mySubmitHandler = (event) => {
    //     event.preventDefault();
    //     this.signUp()
    // }
    handleChange(e, type) {
        e.preventDefault();
        switch (type) {
            case "name":
                this.setState({
                    users: {
                        ...this.state.users,
                        name: e.target.value
                    }
                })
                break;
            case "lastName":
                this.setState({
                    users: {
                        ...this.state.users,
                        lastName: e.target.value
                    }
                })
                break;
            case "email":
                this.setState({
                    users: {
                        ...this.state.users,
                        email: e.target.value
                    }
                })
                break;
            case "password":
                this.setState({
                    users: {
                        ...this.state.users,
                        password: e.target.value
                    }
                })
                break;
            // no default
        }
    }

    //handleSubmit
    signUp = (event) => {
        event.preventDefault();
        axios.get('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                this.setState({emailError: false})
                for (let key in response.data) {
                    response.data[key].id = key
                    if (response.data[key].email === this.state.users.email) {
                        this.setState({emailError: true})
                        return
                    }
                    // this.state.info.push(response.data[key])
                }
                if (this.state.emailError === false) {
                    axios.post('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/users.json', this.state.users)
                        .then(response => {
                            if (response.data != null) {
                                this.setState({submit: true})
                                // this.UserLogin(true)
                                // this.$store.state.userInfo = this.userInfo
                                // console.log(response)
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    logOut=()=>{
        return  this.setState({submit:false})
    }

    renderSignUpForm() {
        return (
            <PageHOC>
                <div className="container sign-up">
                    <div className="col-lg-6 col-md-6 col-sm-10 main-form ">
                        {this.state.emailError &&
                        <p className="alert-danger text-center text-danger">email error</p>
                        }
                        <form className="m-3" onSubmit={this.signUp}>
                            {/*firstname*/}
                            <div className="form-group input-group">
                                <div className="fix-input-icon">
                                    <span className="input-icon"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input className="form-control"
                                       placeholder="first name"
                                       type="text"
                                       onChange={event => this.handleChange(event, 'name')}
                                       required
                                />
                            </div>
                            {/*lastname */}
                            <div className="form-group input-group">
                                <div className="fix-input-icon">
                                    <span className="input-icon"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input className="form-control"
                                       placeholder="last name"
                                       type="text"
                                       onChange={event => this.handleChange(event, 'lastName')}
                                       required
                                />
                            </div>
                            {/*email*/}
                            <div className="form-group input-group">
                                <div className="fix-input-icon">
                                    <span className="input-icon"> <i className="fa fa-envelope"></i> </span>
                                </div>
                                <input className="form-control"
                                       placeholder="Email address"
                                       type="email"
                                       onChange={event => this.handleChange(event, 'email')}
                                       required
                                />
                            </div>
                            {/*password*/}
                            <div className="form-group input-group">
                                <div className="fix-input-icon">
                                    <span className="input-icon"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input className="form-control"
                                       placeholder="Create password"
                                       type="password"
                                       onChange={event => this.handleChange(event, 'password')}
                                       required
                                />
                            </div>
                            {/*create-account-btn*/}
                            <div className="form-group">
                                <button type="submit" className="btn-block my-btn"> Create Account</button>
                            </div>

                            <p className="text-center">Have an account?
                                <NavLink to="/">Log In</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </PageHOC>
        )
    }

    renderWelcomeForm() {
        return (
            <PageHOC>
                <div className="container center sign-up">
                    <div className="col-lg-6 col-md-6 col-sm-10 welcome-form">
                        <div className="p-0 ">
                            <p className="text-center m-0">hi {this.state.users.name} </p>
                        </div>
                        <div>
                            <button className="my-btn" onClick={this.logOut}>log out</button>
                        </div>
                    </div>
                </div>
            </PageHOC>
        )
    }

    render() {
        let form = '';
        if (!this.state.submit) {
            form = this.renderSignUpForm()
        } else {
            form = this.renderWelcomeForm()
        }
        return form
    }
}

export default signUp;