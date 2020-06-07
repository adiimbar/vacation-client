import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
// import { useFormik } from 'formik';
import './login.css';

export default class Login extends Component {

    public constructor(props: any) {
        super(props);

        // this.state = {}
    }
    
    // // const formik = useFormik({
    // formik = useFormik({
    //     initialValues: {
    //         userName: '',
    //         password: ''
    //     },
    //     onSubmit: values => {
    //         console.log('form values', values);
    //     }
    // })

    // console.log('form values', formik.values);

    registerClick() {
        console.log('register was clicked');
    }

    public render() {
        return (
            <div className='login'>

                {/* <form onSubmit={this.formik.handleSubmit}> */}
                    <label htmlFor='userName'>username</label>
                    <input type='text' placeholder='User name' id='userName' name='userName' />
                    {/* <input type='text' placeholder='User name' id='userName' name='userName' onChange={this.formik.handleChange} value={this.formik.values.userName} /> */}
                    <br />
                    <label htmlFor='password'>password</label>
                    <input type='password' placeholder='Password' name='password' />
                    {/* <input type='password' placeholder='Password' name='password' onChange={this.formik.handleChange} value={this.formik.values.password} /> */}
                    <br />
                    {/* <input type='button' value='login' /> */}
                    <button>login</button>
                    <button onClick={this.registerClick} type='button'>Register</button>
                    {/* <button onClick={() => this.registerClick()} type='button'>Register</button> */}
                {/* </form> */}
            </div>
        );
    }
}