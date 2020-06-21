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
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   });
    //   // this.register();
    //   this.successfulRegistrationMessage();
    //   ;
    // }, 2000);
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

  }

  private vacationUpdate = async (vacationObject: any, id: number, image_path: string) => {

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

    try {
          
        const response = await apiService.put<VacationsDetails[]>("tours", vacationUpdateDetails);

        if(response.status === 200) {
            message.success(`Vacation updated successfully`);
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
        >
          <VacationUpdateForm vacationUpdateHandler={this.vacationUpdate} formEdit={this.props.formEdit} openModal={this.showModal} />
        </Modal>
      </React.Fragment>
    );
  }
}

