import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
//   import TextError from './TextError';
// import { OmitProps } from 'antd/lib/transfer/ListBody';


import { Form, Input, Button } from 'antd';

const layout = {
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = (props: any) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        props.loginHandler(values)
    };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <Form
            {...layout}
            name="loginForm"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please enter username' }]}
            >
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter password' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>


            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">login</Button>
            </Form.Item>
        </Form>


    )

}

export default LoginForm