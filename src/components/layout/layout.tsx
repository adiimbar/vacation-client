import React, { useEffect, useState} from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import { Layout, Menu, Breadcrumb } from 'antd';
import jwtDecode from 'jwt-decode';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import "./layout.css";
import Header from '../header/header';
import Login from '../login/login';
import Footer from '../footer/footer';
import Customer from '../customer/customer';
import Admin from '../admin/admin';
import Charts from '../charts/charts';
import socketIOClient from 'socket.io-client';
// import { store } from '../../redux/store';

// need to remove this
// import Register from '../register/register'

export default function Layout() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        // const userId = store.getState().;

        if (userId) {
            setUserId(userId);
            const fullToken = sessionStorage.getItem('token');
            const tokenOnly = fullToken.replace('Bearer ', '');

            const userData: {userType: string} = jwtDecode(tokenOnly);
            store.dispatch({ type: ActionType.SetUserType, payload: userData.userType});
        }
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
                        <Route path="/main" component={Customer} exact />
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