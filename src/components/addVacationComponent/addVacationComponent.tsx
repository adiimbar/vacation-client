import React, { Component } from 'react';
import { VacationsDetails } from '../../models/VacationsDetails';
import AddVacationForm from '../forms/add-vacation-form/addVacationForm';

import { Modal, Button, message } from 'antd';

import apiService from '../../services/api.service';

import 'antd/dist/antd.css';
import './addVacationComponent.css';

interface updateState {
  visible: boolean,
  confirmLoading: boolean,

}

export default class AddVacationComponent extends Component<any, updateState, VacationsDetails> {

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
      console.log('vacation update class - show modal');
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
    // this.props.closeModal()
  };

  successfulRegistrationMessage = () => {
    message.success('Registered successfully. please login...!', 3);
  };

  componentDidMount() {
      this.setState({
        visible: this.props.openModal,
      })

    //   console.log('vacation update class - show modal');
    //   console.log(this.props);

  }

    // private vacationUpdate = async (vacationObject: any, id: number, image_path: string) => {
    private vacationUpdate = async (vacationObject: any, image_path: string) => {

    // console.log('inside vacationUpdate');
    // console.log(vacationObject);
    // console.log(image_path);

    let startDate = vacationObject.range_picker[0];
    let endDate = vacationObject.range_picker[1];


    let addVacationDetails = {
        // id: id,
        destination: vacationObject.destination,
        description: vacationObject.description,
        image_path: image_path,
        price: vacationObject.price,
        start_date: startDate,
        end_date: endDate
    }


        console.log(addVacationDetails);
    try {
          
        const response = await apiService.post<VacationsDetails[]>("tours", addVacationDetails);
        // const serverResponse = response.data;
        // const statusResponse = response.status;
        // console.log(serverResponse);
        // console.log(statusResponse);
        if(response.status === 200) {
            message.success(`Vacation added successfully`);
            this.handleCancel();
        }
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
        <Button type="primary" className="addVacationButton" onClick={this.showModal}>
          Add vacation
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
          <AddVacationForm vacationUpdateHandler={this.vacationUpdate} formEdit={this.props.formEdit}/>
          {/* <AddVacationForm vacationUpdateHandler={this.vacationUpdate} openModal={this.showModal} /> */}
        </Modal>
      </React.Fragment>
      // </div>
    );
  }
}