import React, {Component} from 'react';
import './Login.css'
import {NavLink} from "react-router-dom";
import Slider from "../Slider/Slider";
import {connect} from "react-redux"
import axios from "axios";
import * as actionCreators from '../../Store/actions'

class login extends Component {
    constructor() {
        super();
        this.state = {
            users: {
                email: '',
                password: null
            },
            userInfo: [],
            emailVerify: null,
            passVerify: null,
            error: false,
            // submit: false,
        }
    }

    handleChange(e, type) {
        e.preventDefault();
        switch (type) {
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
    signIn = (event) => {
        event.preventDefault();
        axios.get('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                for (let key in response.data) {
                    response.data[key].id = key
                    if (response.data[key].email === this.state.users.email) {
                        this.setState({emailVerify: true})
                        if (response.data[key].password.toString() === this.state.users.password) {
                            this.setState({passVerify: true})
                            this.setState({userInfo: response.data[key]})
                            this.props.onLogin(this.state.userInfo)
                        }
                    }
                }
                if (!this.state.emailVerify || !this.state.passVerify) {
                    this.setState({emailVerify: false})
                    this.setState({passVerify: false})
                    this.setState({error: true})
                }
            }).catch(error => {
                console.log(error)
            }
        )
    }

    renderLoginForm() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-10 p-0 main-form">
                <div className="form-header ">
                    <p>Sign In</p>
                </div>
                <div className="center">
                    <form className="col-10 login-body" onSubmit={this.signIn}>
                        {(this.state.emailVerify === false || this.state.emailVerify === false) &&
                        <p className="alert-danger text-center text-danger"> incorrect data </p>
                        }
                        {/*// <!--email-->*/}
                        <div className="form-group input-group">
                            <input className="form-control" type="email"
                                   placeholder="email"
                                   onChange={event => this.handleChange(event, 'email')}
                                   required
                            />
                        </div>

                        {/*// <!--password-->*/}
                        <div className="form-group input-group">
                            <input className="form-control" type="text"
                                   placeholder="password"
                                   onChange={event => this.handleChange(event, 'password')}
                                   required
                            />
                        </div>
                        {/*// <!--submit-btn-->*/}
                        <div className="form-group m-3 center">
                            <button type="submit" className="my-btn col-lg-6 col-md-6 col-sm-6">Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="form-footer d-flex flex-column align-items-center">
                    <p>Don't have an account?<a href="/sign-up">Sign Up</a></p>
                    <NavLink className="" to="/sign-up">Forgot password?</NavLink>
                </div>
            </div>
        )
    }

    renderWelcomeFrom() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-10 welcome-form">
                <div className="p-0 ">
                    <p className="text-center m-0">hi {this.props.info.name} </p>
                </div>
                <div>
                    <button className="my-btn" onClick={this.props.onLogOut}>log out</button>
                </div>
            </div>
        )
    }

    render() {
        let loginForm = '';
        if (!this.props.submit) {
            loginForm = this.renderLoginForm()
        } else {
            loginForm = this.renderWelcomeFrom()
        }
        return (
            <div>
                <Slider/>
                <div className="container login center">
                    {loginForm}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        info: state.loginInfo,
        submit: state.loginAuthenticate
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (value) => dispatch(actionCreators.userInfoLogin(value)),
        onLogOut: () => dispatch(actionCreators.userLogOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(login);