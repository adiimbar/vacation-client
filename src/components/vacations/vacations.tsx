import React, { Component } from 'react'
import axios from "axios";
import './vacations.css';
import { VacationsDetails } from '../../models/VacationsDetails';

import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';


const { Meta } = Card;

interface VacationsInterface {
    vacations: VacationsDetails[]
}


export default class Vacations extends Component <any, VacationsInterface>{

    constructor(props: any) {
        super(props);
        this.state = {
            vacations:[]
        };
    }

    
    public async componentDidMount() {
        this.getVacations();
    }

    getVacations = async () => {
        const response = await axios.get<VacationsDetails[]>("http://localhost:3001/tours/");
        this.setState({ vacations: response.data });
        console.log(this.state.vacations);
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
                        <CheckOutlined key="follow" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                        title={vacation.destination}
                        description={`from: ${vacation.start_date} until: ${vacation.end_date}`}
                        />

                        {/* <br></br> */}
                        <div>
                            <p className="description">{vacation.description}</p>
                            <p className="price">{`price: ${vacation.price}`}</p>
                        </div>
                    </Card>

                )}
            </div>
        );
    }
}