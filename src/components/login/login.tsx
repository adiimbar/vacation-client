import React, { Component, ChangeEvent } from 'react';
import axios from "axios";
import { AxiosResponse } from 'axios'
import { UserLoginDetails } from '../../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import 'antd/dist/antd.css';
// import { Button } from 'antd';
// import { useFormik } from 'formik';
import Register from '../register/register';
import './login.css';


export default class Login extends Component<any, UserLoginDetails, SuccessfulLoginServerResponse>{

    public constructor(props: any) {
        super(props);

        this.state = {
            userName: '',
            password: ''
        }
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        const userName = args.target.value;
        this.setState({ userName });
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password });
    }

    private login = async () => {

        try {
            let userLoginDetails = new UserLoginDetails(this.state.userName, this.state.password);
            const response = await axios.post<UserLoginDetails[], AxiosResponse<SuccessfulLoginServerResponse>>("http://localhost:3001/users/login", userLoginDetails);
            const serverResponse = response.data;
            console.log(serverResponse);
            sessionStorage.setItem("token", "Bearer " + serverResponse.token + "");
            const userType = serverResponse.userType;
            console.log(userType);

        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }


    public render() {
        const { userName, password } = this.state;

        return (
            <div className='login'>
                <form>
                    <div>
                        <input type='text' placeholder='User name' name='userName' value={userName} onChange={this.setUserName} />
                    </div>
                    <div>
                        <input type='password' placeholder='Password' name='password' value={password} onChange={this.setPassword} />
                    </div>
                    <input type='button' value='login' onClick={this.login} />

                    {/* <button value='login' onClick={this.login}>login</button> */}
                    <Register />
                    {/* <button onClick={this.registerClick} type='button'>Register</button> */}
                </form>
            </div>
        );
    }
}