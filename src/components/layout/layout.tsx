import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import { Layout, Menu, Breadcrumb } from 'antd';

import "./layout.css";
import Header from '../header/header';
import Login from '../login/login';
import Footer from '../footer/footer';
import Vacations from '../vacations/vacations';
import Admin from '../admin/admin';

// need to remove this
// import Register from '../register/register'


export default class Layout extends Component{
    public render() {
        return (

            <BrowserRouter>
                <section className="layout">
                    <header>
                        <Header />
                    </header>

                    <main>
                        <Switch>
                            <Route path="/home" component={Login} exact />
                            <Route path="/main" component={Vacations} exact />
                            <Route path="/admin" component={Admin} exact />
         
                            {/* need to remove this */}
                            {/* <Route path="/register" component={Register} exact /> */}
         
                            <Redirect from="/" to="/home" exact />
                            {/* <Route component={PageNotFound} /> */}
                        </Switch>
                    </main>

                    <footer>
                        <Footer />
                    </footer>
                </section>
            </BrowserRouter >
        );
    }
}