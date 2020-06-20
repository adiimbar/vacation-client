import React, { Component } from 'react';
import { VacationsDetails } from '../../models/VacationsDetails';
import VacationUpdateForm from '../forms/vacation-update-form/vacationUpdateForm';

import { Modal, message } from 'antd';

import apiService from '../../services/api.service';

import 'antd/dist/antd.css';
import './vacationUpdate.css';

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
    this.props.closeModal()
  };

  successfulRegistrationMessage = () => {
    message.success('Registered successfully. please login...!', 3);
  };

  componentDidMount() {
      this.setState({
        visible: this.props.openModal,
      })

      console.log('vacation update class - show modal');
      console.log(this.props);

  }

  private vacationUpdate = async (vacationObject: any, id: number, image_path: string) => {

    console.log('inside vacationUpdate');
    console.log(vacationObject);
    console.log(id);
    console.log(image_path);

    let startDate = vacationObject.range_picker[0];
    let endDate = vacationObject.range_picker[1];


    let vacationUpdateDetails = {
        id: id,
        destination: vacationObject.destination,
        description: vacationObject.description,
        image_path: image_path,
        price: vacationObject.price,
        start_date: startDate,
        end_date: endDate
    }


        console.log(vacationUpdateDetails);
    try {
          
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
          <VacationUpdateForm vacationUpdateHandler={this.vacationUpdate} formEdit={this.props.formEdit} openModal={this.showModal}/>
        </Modal>
      </React.Fragment>
      // </div>
    );
  }
}
