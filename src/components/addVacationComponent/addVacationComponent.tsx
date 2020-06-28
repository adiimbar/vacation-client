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
      confirmLoading: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    // this.props.closeModal()
  };

  componentDidMount() {
      this.setState({
        visible: this.props.openModal,
      })

  }

    private vacationUpdate = async (vacationObject: any, image_path: string) => {

    let startDate = vacationObject.range_picker[0];
    let endDate = vacationObject.range_picker[1];


    let addVacationDetails = {
        destination: vacationObject.destination,
        description: vacationObject.description,
        image_path: image_path,
        price: vacationObject.price,
        start_date: startDate,
        end_date: endDate
    }

    try {
          
        const response = await apiService.post<VacationsDetails[]>("tours", addVacationDetails);
        if(response.status === 200) {
            message.success(`Vacation added successfully`);
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
        <Button type="primary" className="addVacationButton" onClick={this.showModal}>
          Add vacation
        </Button>

        { (this.state.visible) ? <Modal
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <AddVacationForm vacationUpdateHandler={this.vacationUpdate} formEdit={this.props.formEdit}/>
        </Modal>  : null }


      </React.Fragment>
    );
  }
}