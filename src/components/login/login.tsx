import React, { Component } from 'react';

import { AxiosResponse } from 'axios'
import jwtDecode from 'jwt-decode';
import { UserLoginDetails } from '../../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
// import { UserType } from '../../models/UserType';
// import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

import 'antd/dist/antd.css';
// import { Button } from 'antd';
// import Register from '../register/register';
import LoginForm from '../forms/login-form/loginForm';
import './login.css';
import apiService from '../../services/api.service';

export default class Login extends Component<any, UserLoginDetails, SuccessfulLoginServerResponse>{

    public constructor(props: any) {
        super(props);

        this.state = {
 
        }

        this.login = this.login.bind(this);
    }

    private login = async (loginObject: any) => {

        try {
            let userLoginDetails = new UserLoginDetails(loginObject.userName, loginObject.password);
            const response = await apiService.post<UserLoginDetails[], AxiosResponse<SuccessfulLoginServerResponse>>("users/login", userLoginDetails);

            // need to change dispatch to save the login response
            store.dispatch({ type: ActionType.SetUserType, payload: response.data.userType});
            // store.dispatch({ type: ActionType.SetUserDetails, payload: response.data});

            const serverResponse = response.data;
            console.log(serverResponse);
            let tokenDecoded = jwtDecode(serverResponse.token);
            console.log('jwt:');
            console.log(tokenDecoded);
            // need to save the token in the store
            sessionStorage.setItem("token", "Bearer " + serverResponse.token + "");
            sessionStorage.setItem("userId", serverResponse.userId);

            if (serverResponse.userType === "ADMIN") {
                this.props.history.push('/admin');
            }
            else if (serverResponse.userType === "CUSTOMER") {
                this.props.history.push('/main');
            }

        }
        catch (err) {
            // change to antd message
            alert(err.message);
            console.log(err);
        }
    }

    public render() {

        return (
            <div className='loginContainer'>
                <LoginForm loginHandler={this.login} />
                {/* <Register /> */}
            </div>
        );
    }
}