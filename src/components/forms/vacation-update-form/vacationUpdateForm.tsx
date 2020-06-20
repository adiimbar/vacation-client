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


    useEffect(() => {
        inputRef.current.focus();
    }, [])
    

	function onFileChange(event: any) { 
	
        // Update the state 
        setFile(selectedFile = event.target.files[0]); 
        console.log('on change handler'); 
        console.log(selectedFile);
        console.log('after setFile'); 
    }; 
        
    // On file upload (click the upload button) 
    function onFileUpload() { 
    
    // Create an object of formData 
    const formData = new FormData(); 
    
    console.log('formData before');
    console.log(formData); 

    // Update the formData object 
    formData.append( "file", selectedFile);
    console.log('formData');
    console.log(formData); 

    // formData.append( "file", selectedFile, selectedFile.name); 
    
    // Details of the uploaded file 
    console.log('in on file upload');
    console.log(selectedFile); 
    
    // Request made to the backend api 
    // Send formData object
    uploadFile(formData) 
    // axios.post("api/uploadfile", formData); 
    }; 
    async function uploadFile(formData: any) {
        console.log('form data:')
        console.log(formData);
        const response = await apiService.post("uploads", formData);
        console.log(response);
        // store.dispatch({ type: ActionType.AddUserFollow, payload: response.data});
    }


    // async function handleUpload(image: any) {
    //     console.log('uploadImage was clicked');

    //     const fileListArray = fileList;
    //     const formData = new FormData();
    //     // fileList.forEach(file => {
    //     //   formData.append('files[]', file);
    //     // });
    
    //     setUploading(true)
    

    //     // const response = await apiService.post("uploads", image);
    //     // return response.status
    // }

    // const uploadSettings = {
    //     name: 'file',
    //     multiple: false,
    //     // action: 'http://localhost:3001/uploads',
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
    

        props.vacationUpdateHandler(values, id, image_path);
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
                <Upload {...uploadSettings}>
                    <Button>
                        <UploadOutlined /> Upload image
                    </Button>
                </Upload>
                <Button
                    // type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                    >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>

            </Form.Item> */}

            <Form.Item>
                <Input type="file" name="file" onChange={onFileChange} /> 
				    <Button onClick={onFileUpload}> 
				    Upload image 
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