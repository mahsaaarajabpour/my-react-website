import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import PageHOC from "../../components/PageHOC";
import axios from "axios";
import * as actionCreators from "../../redux";
import {connect} from "react-redux";
import './SignUp.css'

function SignUp(props) {

    const [users, setUsers] = useState({name: '', lastName: '', email: '', password: null})
    const [emailError, setEmailError] = useState(false)

    const handleChange = (e, type) => {
        e.preventDefault();
        switch (type) {
            case "name":
                setUsers({...users, name: e.target.value})
                break;
            case "lastName":
                setUsers({...users, lastName: e.target.value})
                break;
            case "email":
                setUsers({...users, email: e.target.value})
                break;
            case "password":
                setUsers({...users, password: e.target.value})
                break;
            // no default
        }
    }

    const signUp = (event) => {
        event.preventDefault();
        axios.get('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                setEmailError(false)
                for (let key in response.data) {
                    response.data[key].id = key
                    if (response.data[key].email === users.email) {
                        setEmailError(true)
                        return
                    }
                }
                if (emailError === false) {
                    axios.post('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/users.json', users)
                        .then(response => {
                            if (response.data != null) {
                                const userUpdate = {...users, id: response.data.name}
                                props.onLogin(userUpdate)
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

    const renderSignUpForm = () => {
        return (
            <PageHOC>
                <div className="container sign-up">
                    <div className="col-lg-6 col-md-6 col-sm-10 main-form ">
                        {emailError &&
                        <p className="alert-danger text-center text-danger">email error</p>
                        }
                        <form className="m-3" onSubmit={signUp}>
                            {/*firstname*/}
                            <div className="form-group input-group">
                                <div className="fix-input-icon">
                                    <span className="input-icon"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input className="form-control"
                                       placeholder="first name"
                                       type="text"
                                       onChange={event => handleChange(event, 'name')}
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
                                       onChange={event => handleChange(event, 'lastName')}
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
                                       onChange={event => handleChange(event, 'email')}
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
                                       onChange={event => handleChange(event, 'password')}
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

    const renderWelcomeForm = () => {
        return (
            <PageHOC>
                <div className="container center sign-up">
                    <div className="col-lg-6 col-md-6 col-sm-10 welcome-form">
                        <div className="p-0 ">
                            <p className="text-center m-0">hi {props.info.name} </p>
                        </div>
                        <div>
                            <button className="my-btn" onClick={props.onLogOut}>log out</button>
                        </div>
                    </div>
                </div>
            </PageHOC>
        )
    }

    let form = '';
    if (!props.submit) {
        form = renderSignUpForm()
    } else {
        form = renderWelcomeForm()
    }
    return form
}

const mapStateToProps = state => {
    return {
        info: state.userInfo.info,
        submit: state.userInfo.authenticate
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (value) => dispatch(actionCreators.userInfoLogin(value)),
        onLogOut: () => dispatch(actionCreators.userLogOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);