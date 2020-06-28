import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './registerForm.css';


const RegistrationForm = (props: any) => {
    let firstNameInput: any = null;

    useEffect( () => {
        firstNameInput.focus();
    })
    
        
    const onFinish = (values: any) => {
          props.registrationHandler(values);
    };

    return (
        <div className='registrationClass'>
        <Form
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            initialValues={{
                firstName: '',
                lastName: '',
                userName: '',
                password: '',
                confirm: '',
              }}
        >

            <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please enter first name' }]}
            >
                <Input 
                    placeholder="First name"
                    ref={input => {
                        firstNameInput = input;
                      }}
                />
            </Form.Item>

            <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please enter last name' }]}
            >
                <Input placeholder="Last name" />
            </Form.Item>

            <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please enter username' }]}
            >
                <Input placeholder="username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please enter a password',
                    },
                ]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match');
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default RegistrationForm