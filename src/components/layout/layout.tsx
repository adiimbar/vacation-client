import React, { useEffect, useState} from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

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

        const socketConnectionListener = setInterval(setUpFirstConnectionWithUserId, 1000);

        function setUpFirstConnectionWithUserId() {
            const userId = sessionStorage.getItem('userId');


            if (userId) {
                const socket = socketIOClient('localhost:3001', {
                    query: `userId=${userId}`
                });

                // const socket = setUpConnectionWithUserId()

                // listener for updated vacations
                socket.on('tour-update', (updatedTour: any) => {
                    store.dispatch({ type: ActionType.UpdateVacationInStore, payload: updatedTour});
                });
    
                // listener for added vacations
                socket.on('new-tour', (newTour: any) => {
                store.dispatch({ type: ActionType.AddVacationToStore, payload: newTour});
                });

                clearInterval(socketConnectionListener);
            }
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