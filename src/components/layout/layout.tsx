import React, { Component } from 'react';
// import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./layout.css";
import Header from '../header/header';
import Footer from '../footer/footer';
// import Menu from '../menu/menu';
import Login from '../login/login';
// import Coupons from '../coupons/coupons';
// import About from '../about/about';



export default class Layout extends Component{
    public render() {
        return (

            <BrowserRouter>
                <section className="layout">
                    <header>
                        <Header displayedText="Welcome to the coupons website"/>
                    </header>

                    {/* <aside>
                        <Menu />
                    </aside> */}

                    <main>
                        <Switch>
                            {/* <Route path="/about" component={About} exact /> */}
                            <Route path="/home" component={Login} exact />
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