import React, {useState} from 'react';
import './Login.css'
import {NavLink} from "react-router-dom";
import Slider from "../Slider";
import {connect} from "react-redux"
import axios from "axios";
import * as actionCreators from '../../Store/actions'
import PageHOC from "../../components/PageHOC";

function Login(props) {

    const [users, setUsers] = useState({email: '', password: null})
    const [userInfo, setUserInfo] = useState([])
    const [emailVerify, setEmailVerify] = useState(null)
    const [passVerify, setPassVerify] = useState(null)

    function handleChange(e, type) {
        e.preventDefault();
        switch (type) {
            case "email":
                setUsers({...users, email: e.target.value})
                break;
            case "password":
                setUsers({...users, password: e.target.value})
                break;
            // no default
        }
    }

    //handleSubmit
    function signIn(event) {
        event.preventDefault();
        axios.get('https://my-shop-react-cdca2-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                for (let key in response.data) {
                    response.data[key].id = key
                    if (response.data[key].email === users.email) {
                        setEmailVerify(true)
                        if (response.data[key].password.toString() === users.password) {
                            setPassVerify(true)
                            setUserInfo(response.data[key])
                            props.onLogin(userInfo)
                        }
                    }
                }
                if (!emailVerify || !passVerify) {
                    setEmailVerify(false)
                    setPassVerify(false)
                }
            }).catch(error => {
                console.log(error)
            }
        )
    }

    function renderLoginForm() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-10 p-0 main-form">
                <div className="form-header ">
                    <p>Sign In</p>
                </div>
                <div className="center">
                    <form className="col-10 login-body" onSubmit={signIn}>
                        {(emailVerify === false || emailVerify === false) &&
                        <p className="alert-danger text-center text-danger"> incorrect data </p>
                        }
                        {/*// <!--email-->*/}
                        <div className="form-group input-group">
                            <input className="form-control" type="email"
                                   placeholder="email"
                                   onChange={event => handleChange(event, 'email')}
                                   required
                            />
                        </div>

                        {/*// <!--password-->*/}
                        <div className="form-group input-group">
                            <input className="form-control" type="password"
                                   placeholder="password"
                                   onChange={event => handleChange(event, 'password')}
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

    function renderWelcomeFrom() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-10 welcome-form">
                <div className="p-0 ">
                    <p className="text-center m-0">hi {props.info.name} </p>
                </div>
                <div>
                    <button className="my-btn" onClick={props.onLogOut}>log out</button>
                </div>
            </div>
        )
    }

    let loginForm = '';
    if (!props.submit) {
        loginForm = renderLoginForm()
    } else {
        loginForm = renderWelcomeFrom()
    }
    return (
        <PageHOC>
            <Slider/>
            <div className="container login center">
                {loginForm}
            </div>
        </PageHOC>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);