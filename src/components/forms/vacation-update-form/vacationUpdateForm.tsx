import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import './vacationUpdateForm.css';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

// const rangeConfig = {
//     rules: [
//       {
//         type: 'array',
//         required: true,
//         message: 'Please select time!',
//       },
//     ],
//   };

const VacationUpdateForm = (props: any) => {
    // let destinationInput: any = null;
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])
    
    
    const onFinish = (fieldsValue: any) => {
        // console.log('Received values of form: ', values);

        const rangeValue = fieldsValue['range-picker'];
        const values = {
          ...fieldsValue,
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        console.log('Received values of form: ', values);
    

        props.vacationUpdateHandler(values);
    };

      
    return (
        <div className='vacationUpdateClass'>
        <Form
            // {...formItemLayout}
            // form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >

            <Form.Item
                name="destination"
                rules={[{ required: true, message: 'Please enter a destination' }]}
            >
                <Input 
                    placeholder="Destination"
                    ref={inputRef}
                    // ref={input => {
                    //     destinationInput = input;
                    //   }}
                />
            </Form.Item>

            <Form.Item
                name="range-picker"
                rules={[
                    {
                      type: 'array',
                      required: true,
                      message: 'Please select time!'
                    }
                ]}
                // {...rangeConfig}
            >
                <RangePicker />
            </Form.Item>


            <Form.Item
                name="price"
                rules={[{ required: true, message: 'Please enter a price' }]}
            >
                <Input type="number" placeholder="price" />
            </Form.Item>

            <Form.Item
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
            >
                <TextArea placeholder="Vacation description" allowClear />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Add vacation
          </Button>
            </Form.Item>
        </Form>
        </div>
    )
}

export default VacationUpdateForm