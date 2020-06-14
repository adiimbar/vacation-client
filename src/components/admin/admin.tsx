import React, { Component } from 'react';
import './admin.css';
import axios from "axios";
import { VacationsDetails } from '../../models/VacationsDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

import { Card, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';

// import VacationsCards from '../vacationsFunction/vacations';


const { Meta } = Card;

interface VacationsState {
    vacations: VacationsDetails[]
}


export default class Admin extends Component <any, VacationsState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            vacations:[]
        };

        this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState(
            {
                vacations: store.getState().vacations
            })
        );
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }
    
    public async componentDidMount() {
        this.getVacations();
    }

    getVacations = async () => {
        const response = await axios.get<VacationsDetails[]>("http://localhost:3001/tours/");
        store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
        // this.setState({ vacations: response.data });
        // console.log(this.state.vacations);
    }


    public render() {
        return (
            <div className='cardsContainer'>
                
                {this.state.vacations.map((vacation) => 


                    <Card
                        className='cardDiv'
                        key={vacation.id}
                        style={{ width: 300 }}
                        cover={
                        <img
                            alt="Oops I'm missing"
                            src={vacation.image_path}
                        />
                        }
                        actions={[
                        <EditOutlined key="edit" />
                        ]}
                    >
                        <Meta
                        // avatar={<Button type="primary" shape="circle-outline">f</Button>}
                        title={vacation.destination}
                        // description={`from: ${vacation.start_date.toString().slice(0, 10)} until: ${vacation.end_date.toString().slice(0, 10)}`}
                        />

                        <div className='adminCardBodyStyle'>
                            <p></p>
                            <p className="description">{vacation.description}</p>
                            <p className="details">
                                {`from: ${vacation.start_date.toString().slice(0, 10)} until: ${vacation.end_date.toString().slice(0, 10)}`}
                                <br></br>
                                {`price: ${vacation.price}`}
                                <br></br>
                                <b  className="followersClass">{`followers: ${vacation.followers}`}</b>
                                </p>
                        </div>
                    </Card>

                )}
            </div>
        );
    }
}