import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import axios from "axios";
import { VacationsDetails } from '../../models/VacationsDetails';
import 'antd/dist/antd.css';
import { Modal, Button, message } from 'antd';
// import VacationUpdateForm from '../forms/vacation-update-form';
import VacationUpdateForm from '../forms/vacation-update-form/vacationUpdateForm';
import './vacationUpdate.css';
import apiService from '../../services/api.service';

interface updateState {
  visible: boolean,
  confirmLoading: boolean,

}

export default class VacationUpdate extends Component<any, updateState, VacationsDetails> {

  constructor(props: any) {
    super(props);

    // this.container = container;

    this.state = {
      visible: false,
      confirmLoading: false,
    };

    // this.handleOk = this.handleOk.bind(this);
  }

  showModal = () => {
      console.log(this.props);
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
    this.props.closeModal()
  };

  successfulRegistrationMessage = () => {
    message.success('Registered successfully. please login...!', 3);
  };

  componentDidMount() {
      console.log('componentDidMount');
      console.log(this.props);
      console.log(this.props.openModal);
      this.setState({
        visible: this.props.openModal,
      })
  }

  private vacationUpdate = async (vacationObject: any) => {

    console.log('inside vacationUpdate');
    console.log(vacationObject);

    try {
        let vacationUpdateDetails = new VacationsDetails(                                                                
          vacationObject.firstName,
          vacationObject.lastName,
          vacationObject.userName,
          vacationObject.password);
          
        const response = await apiService.put<VacationsDetails[]>("tours", vacationUpdateDetails);
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
        {/* <Button onClick={this.showModal}>
          Update vacation
        </Button> */}

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
          <VacationUpdateForm vacationUpdateHandler={this.vacationUpdate} fromEdit={this.props} openModal={this.showModal}/>
        </Modal>
      </React.Fragment>
      // </div>
    );
  }
}
