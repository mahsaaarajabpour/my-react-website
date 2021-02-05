import React, {Component, Suspense} from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'

const Contact = React.lazy(() => import ('./Components/Contact/Contact'))
const SignUp = React.lazy(() => import('./Components/SignUp/SignUp'))
const CreateBlog = React.lazy(() => import('./Components/Blogs/CreateBlog/CreateBlog'))
const BLog = React.lazy(() => import('./Components/Blogs/Blog/Blog'))
const Portfolio = React.lazy(() => import('./Components/Portfolio/Portfolio'))
const Blogs = React.lazy(() => import('./Components/Blogs/Blogs'))
const Login = React.lazy(() => import('./Components/Login/Login'))

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <div className="wrapper">
                        <Navbar/>
                        <div className="">
                            <Switch>
                                <Route exact path="/"
                                       render={() =>
                                           <Suspense fallback={<div>loading</div>}>
                                               <Login/>
                                           </Suspense>}/>

                                <Route exact path="/portfolio/:id" render={(props =>
                                    <Suspense fallback={<div>loading</div>}>
                                        <Portfolio {...props} />
                                    </Suspense>)}/>

                                <Route path="/sign-up" exact
                                       render={() => <Suspense fallback={<div>loading</div>}>
                                           <SignUp/>
                                       </Suspense>}/>

                                <Route path="/contact" exact
                                       render={() => <Suspense fallback={<div>loading</div>}>
                                           <Contact/>
                                       </Suspense>}/>

                                <Route path="/blogs/:id" exact
                                       render={(props) => <Suspense fallback={<div>loading</div>}>
                                           <Blogs {...props} />
                                       </Suspense>}/>

                                <Route exact path="/blog/:id"
                                       render={props => <Suspense fallback={<div>loading</div>}>
                                           <BLog {...props}/>
                                       </Suspense>}/>

                                <Route exact path="/create-blog"
                                       render={(props) => <Suspense fallback={<div>loading</div>}>
                                           <CreateBlog {...props}/>
                                       </Suspense>}
                                />
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default App;
