import React, { useEffect, useState} from 'react';
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
import Charts from '../charts/charts';
import socketIOClient from 'socket.io-client';
import { store } from '../../redux/store';


// need to remove this
// import Register from '../register/register'

export default function Layout() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // const userId = sessionStorage.getItem('userId');
        const userId = store.getState().vacations;

        if (userId) setUserId(userId);
    }, []);

    useEffect(() => {
        if (userId) {
            console.log('connecting');
            console.log('userId', userId);
            const socket = socketIOClient('localhost:3001', {
                query: `userId=${userId}`
            });

            socket.on('new-tour-update', () => {
               console.log('a new update!!! i am so happy');
            });
        }

    }, [userId]);

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
                        <Route path="/charts" component={Charts} exact />


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