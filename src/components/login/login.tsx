import React, { Component } from 'react';

import { AxiosResponse } from 'axios'
import { UserLoginDetails } from '../../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import 'antd/dist/antd.css';
// import { Button } from 'antd';
// import { useFormik } from 'formik';
import Register from '../register/register';
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

            const serverResponse = response.data;
            console.log(serverResponse);
            sessionStorage.setItem("token", "Bearer " + serverResponse.token + "");
            // const userType = serverResponse.userType;
            // console.log(userType);

            if (serverResponse.userType === "ADMIN") {
                this.props.history.push('/admin');
                // sessionStorage.setItem("userType", "ADMIN");
            }
            else if (serverResponse.userType === "CUSTOMER") {
                this.props.history.push('/main');
                // sessionStorage.setItem("userType", "CUSTOMER");
            }

        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    public render() {

        return (
            <div className='login'>
                <LoginForm loginHandler={this.login} />
                <Register />
            </div>
        );
    }
}