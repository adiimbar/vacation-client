import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//   import TextError from './TextError';
import { Button } from 'antd';
// import { OmitProps } from 'antd/lib/transfer/ListBody';


const initialValues = {
    userName: '',
    password: ''
}

const onSubmit = (values: any) => {
    console.log(values);
}

const validationSchema = Yup.object({
    userName: Yup.string().required('Required'),
    password: Yup.string()
    //   .email('Invalid password format')
      .required('Required'),
  })



function LoginForm (props: any) {
    
    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>

        <Form>
            <div className='form-control'>
                <Field
                    type='text'
                    placeholder='User name'
                    name='userName'
                />
                <ErrorMessage name='userName' />
            </div>
            <div>
                <Field
                    type='password'
                    placeholder='Password'
                    name='password'
                />
                <ErrorMessage name='password' />
            </div>

            {/* <Button type="primary" htmlType="submit">login</Button> */}
            <button type='submit' onClick={props.loginHandler}>login</button>

        </Form>
    </Formik>
    )
}

export default LoginForm