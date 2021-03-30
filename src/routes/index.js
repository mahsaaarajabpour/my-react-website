import React, {Suspense} from "react";
import {Route, Switch,} from "react-router-dom";

const Contact = React.lazy(() => import ('../pages/Contact'))
const SignUp = React.lazy(() => import('../pages/SignUp'))
const CreateBlog = React.lazy(() => import('../pages/CreateBlog'))
const BLog = React.lazy(() => import('../pages/Blog'))
const Portfolio = React.lazy(() => import('../pages/Portfolio'))
const Blogs = React.lazy(() => import('../pages/Blogs'))
const Login = React.lazy(() => import('../pages/Login'))

const Routes = () => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default Routes;