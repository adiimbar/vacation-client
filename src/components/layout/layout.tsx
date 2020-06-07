import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import { Layout, Menu, Breadcrumb } from 'antd';

import "./layout.css";
import Header from '../header/header';
import Login from '../login/login';
import Footer from '../footer/footer';


// need to remove this
import Register from '../register/register'


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
                            {/* <Route path="/about" component={About} exact /> */}
                            <Route path="/home" component={Login} exact />

                            {/* needto remove this */}
                            <Route path="/register" component={Register} exact />
                            {/* <Route path="/coupons" component={Coupons} exact /> */}
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