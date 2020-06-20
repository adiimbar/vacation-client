import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import apiService from '../../../services/api.service';

import './vacationUpdateForm.css';

const { TextArea } = Input;
const { RangePicker } = DatePicker;


const VacationUpdateForm = (props: any) => {
    // let destinationInput: any = null;
    const inputRef = useRef(null);
    // const [fileList, setFile] = useState([]);
    // const [uploading, setUploading] = useState(false);

    let [selectedFile, setFile] = useState(null);
    let [uploadedFileName, setUploadedFileName] = useState('');


    useEffect(() => {
        inputRef.current.focus();
    }, [])
    

	function onFileChange(event: any) { 	
        // Update the state 
        setFile(selectedFile = event.target.files[0]); 
    }; 
        
    // On file upload (click the upload button) 
    function onFileUpload() { 
        
        // Create an object of formData 
        const formData = new FormData(); 
        
        // Update the formData object 
        formData.append( "file", selectedFile);

        // send formData object 
        uploadFile(formData) 
    }; 

    async function uploadFile(formData: any) {
        console.log('form data:');
        console.log(formData);
        const response = await apiService.post("uploads", formData);

        console.log('response');
        console.log(response.data);
        if(response.status === 200) {
            message.success(`file uploaded successfully`);
            setUploadedFileName(uploadedFileName = response.data.name);
            console.log('uploadedFileName');
            console.log(uploadedFileName);
        }
    }

    // const uploadSetings = {
    //     name: 'file',
    //     action: 'http://localhost:3001/uploads',
    //     // headers: {
    //     //   authorization: 'authorization-text',
    //     // },
    //     onChange(info: any) {
    //       if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //   };
      

    const onFinish = (fieldsValue: any) => {

        const rangeValue = fieldsValue['range_picker'];
        const values = {
          ...fieldsValue,
          'range_picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        console.log('Received values of form: ', values);

        console.log('image path');
        console.log(uploadedFileName);
        if(uploadedFileName !== '') {
            // full image path should be done in the server
            let imagePath = `http://localhost:3001/uploads/${uploadedFileName}`
            props.vacationUpdateHandler(values, id, imagePath);
        } else {
            props.vacationUpdateHandler(values, id, image_path);
        }
    

    };

    const { id, destination, description, image_path, start_date, end_date, price} = props.formEdit;
    return (
        <div className='vacationUpdateClass'>
        <Form
            // {...formItemLayout}
            // form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                destination: destination,
                description: description,
                price: price,
                image_path: uploadedFileName,
                // range_picker: [start_date.toString().slice(0, 10), end_date.toString().slice(0, 10)],
                start_date: start_date.toString().slice(0, 10),
                end_date: end_date.toString().slice(0, 10),
              }}
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
                name="range_picker"
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

            {/* <Form.Item>
               <Upload {...uploadSetings}>
                    <Button>
                        <UploadOutlined /> Upload image
                    </Button>
                </Upload>
            </Form.Item> */}

            <Form.Item>
                Add image if you want to update the current one
                <Input type="file" name="file" onChange={onFileChange} /> 
				    <Button onClick={onFileUpload}> 
                        <UploadOutlined /> Upload image 
				    </Button> 
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Update vacation
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
}

export default VacationUpdateForm