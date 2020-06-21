import React, { useEffect, useRef} from 'react';
import { Form, Input, Button } from 'antd';
import Register from '../../register/register';
import './loginForm.css';


const layout = {
    wrapperCol: { offset: 8, span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 11, span: 8 },
};

const LoginForm = (props: any) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        props.loginHandler(values)
    };

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

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
                <Input ref={inputRef} type="text" placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter password' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>


            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" className="loginButtonClass" >login</Button>
                <Register />
            </Form.Item>
        </Form>


    )

}

export default LoginForm