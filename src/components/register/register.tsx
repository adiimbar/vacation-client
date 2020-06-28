import React, { Component } from 'react';
import { UserRegistrationDetails } from '../../models/UserRegistrationDetails';
import 'antd/dist/antd.css';
import { Modal, Button, message } from 'antd';
import RegistrationForm from '../forms/register-form/registerForm';
import './register.css';
import apiService from '../../services/api.service';

interface RegisterState {
  visible: boolean,
  confirmLoading: boolean,

}

export default class Register extends Component<any, RegisterState, UserRegistrationDetails> {

  constructor(props: any) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
    };

    // this.handleOk = this.handleOk.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  private register = async (registerObject: any) => {

    try {
        let userRegistrationDetails = new UserRegistrationDetails(                                                                
          registerObject.firstName,
          registerObject.lastName,
          registerObject.userName,
          registerObject.password);
          
        const response = await apiService.post<UserRegistrationDetails[]>("users/register", userRegistrationDetails);

        // need to put a message - registerd sucsseccfuly
        if(response.status === 200) {
          message.success(`Registered successfully`);
          this.handleCancel();
        }

      }
      catch (err) {
          console.log(err);
          console.log(err.response.status);
      }
  }


  public render() {
    const { visible, confirmLoading } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.showModal} className="registerButtonClass">
          register
        </Button>

        { (this.state.visible) ? <Modal
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <RegistrationForm registrationHandler={this.register} />
        </Modal> : null }
      </React.Fragment>
    );
  }
}
