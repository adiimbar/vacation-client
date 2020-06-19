import React, { Component } from 'react';
// import axios from "axios";
import { UserRegistrationDetails } from '../../models/UserRegistrationDetails';
import 'antd/dist/antd.css';
import { Modal, Button, message } from 'antd';
// import VacationUpdateForm from '../forms/vacation-update-form';
import VacationUpdateForm from '../forms/vacation-update-form/vacationUpdateForm';
import './vacationUpdate.css';
import apiService from '../../services/api.service';

interface RegisterState {
  visible: boolean,
  confirmLoading: boolean,

}

export default class VacationUpdate extends Component<any, RegisterState, UserRegistrationDetails> {

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
      //   ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      // this.register();
      this.successfulRegistrationMessage();
      ;
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  successfulRegistrationMessage = () => {
    message.success('Registered successfully. please login...!', 3);
  };


  private vacationUpdate = async (registerObject: any) => {

    console.log('inside register');
    console.log(registerObject);

    try {
        let userRegistrationDetails = new UserRegistrationDetails(                                                                
          registerObject.firstName,
          registerObject.lastName,
          registerObject.userName,
          registerObject.password);
          
        const response = await apiService.post<UserRegistrationDetails[]>("users/register", userRegistrationDetails);
        const serverResponse = response.data;
        const statusResponse = response.status;
        console.log(serverResponse);
        console.log(statusResponse);

    }
    catch (err) {
        // alert(err.message);
        console.log(err);
        console.log(err.response.status);
    }
}


  public render() {
    const { visible, confirmLoading } = this.state;
    return (
      // <div className="register">
      <React.Fragment>
        <Button onClick={this.showModal}>
          Update vacation
        </Button>

        <Modal
          // title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
          // footer={[
            // <Button key="back" onClick={this.handleCancel}>
            //   Cancel
            // </Button>,
            // <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
            //   Submit
            // </Button>,
          // ]}
        >
          <VacationUpdateForm vacationUpdateHandler={this.vacationUpdate} />
        </Modal>
      </React.Fragment>
      // </div>
    );
  }
}
