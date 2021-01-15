import React from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';

import './Content.css';

import {withSuspense} from '../../hoc/withSuspense.js';

import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import MainPage from '../pages/MainPage/MainPage.jsx';
const AdminPage = React.lazy(() => import('../pages/AdminPage/AdminPage.jsx'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage/ProfilePage.jsx'));
const GamesPage = React.lazy(() => import('../pages/GamesPage/GamesPage.jsx'));
const PaymentPage = React.lazy(() => import('../pages/PaymentPage/PaymentPage.jsx'));

const Content = () => {
    return(
        <div className="main__content--content">
            <Header />

            <Switch>
                <Route exact path="/" render={() => withSuspense(MainPage)} />
                <Route path="/admin" render={() => withSuspense(AdminPage)} />
                <Route path="/profile" render={() => withSuspense(ProfilePage)} />
                <Route path="/games" render={() => withSuspense(GamesPage)} />
                <Route path="/payment" render={() => withSuspense(PaymentPage)} />
                <Route path="*" render={() => <Redirect to={"/"} />}/>
            </Switch>

            <Footer />
        </div>
    )
}

export default Content;