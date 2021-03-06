import React from 'react';
//  import './../../css/common.css'
import {StyledContainerPc, StyledContainerSp, ItemCenter} from "./style";
import MediaQuery from "react-responsive/src";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgotPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from  '../../constants/routes'
import { withAuthentication } from '../Session';

const App = () => (
    <Router>
        <Navigation />

        <Route exact path={ROUTES.LANDING} component={LandingPage}/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
        <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgotPage}/>
        <Route path={ROUTES.HOME} component={HomePage}/>
        <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
        <Route path={ROUTES.ADMIN} component={AdminPage}/>
        {/*<MediaQuery query="(max-width: 767px)">*/}
        {/*    <StyledContainerSp>*/}
        {/*    </StyledContainerSp>*/}
        {/*</MediaQuery>*/}
        {/*<MediaQuery query="(min-width: 767px)">*/}
        {/*    <Navigation />*/}

        {/*    <Route exact path={ROUTES.LANDING} component={LandingPage}/>*/}
        {/*    <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>*/}
        {/*    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>*/}
        {/*    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgotPage}/>*/}
        {/*    <Route path={ROUTES.HOME} component={HomePage}/>*/}
        {/*    <Route path={ROUTES.ACCOUNT} component={AccountPage}/>*/}
        {/*    <Route path={ROUTES.ADMIN} component={AdminPage}/>*/}
        {/*    <StyledContainerPc>*/}
        {/*    </StyledContainerPc>*/}
        {/*</MediaQuery>*/}
    </Router>
);

export default withAuthentication(App);