import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './registerForm.css';


// const formItemLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 },
//     },
// };

// const tailFormItemLayout = {
//     wrapperCol: {
//         xs: {
//             span: 24,
//             offset: 0,
//         },
//         sm: {
//             span: 16,
//             offset: 8,
//         },
//     },
// };



const RegistrationForm = (props: any) => {
    // const [form] = Form.useForm();
    let firstNameInput: any = null;

    useEffect( () => {
        firstNameInput.focus();
    })
    
    
    const onFinish = (values: any) => {
        // console.log('Received values of form: ', values);
          props.registrationHandler(values);
    };

    return (
        <div className='registrationClass'>
        <Form
            // {...formItemLayout}
            // form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
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