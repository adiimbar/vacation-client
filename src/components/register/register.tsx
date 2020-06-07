import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import './register.css';

interface RegisterState {
    visible: boolean,
    confirmLoading: boolean,
}

export default class Register extends Component<any, RegisterState> {

    constructor(props: any) {
        super(props);

        this.state = {
            visible: false,
            confirmLoading: false,
        };
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({
        //   ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };
    


    public render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div className="register">

                <Button type="primary" onClick={this.showModal}>
                    Open Modal with async logic
                </Button>

               <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    >
                    <p>modal content</p>
                </Modal>
            </div>
        );
    }
}