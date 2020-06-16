import React, { useState, useEffect } from 'react';
import axios from "axios";
import { VacationsDetails } from '../../models/VacationsDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

import { Card, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';
import apiService from '../../services/api.service';

import './vacations.css';

// interface VacationsState {
//     vacations: VacationsDetails[]
// }

const { Meta } = Card;

function VacationsCards()  {
    const vacations = store.getState().vacations;
    
    // Mock need to be removed
    // const userType = 'ADMIN';
    // const [userType, setUserType] = useState('CUSTOMER');
    const [userType, setUserType] = useState('ADMIN');


    let unsubscribeStore: Unsubscribe;

    unsubscribeStore = store.subscribe(
        // In fact, the following function is our "listener", "refresh function"
        () => {
            const vacations = store.getState().vacations;
        }
    );
    
    useEffect( () => {
        getVacations();
        // unsubscribeStore();

        return unsubscribeStore()
    }, [unsubscribeStore]);


    async function getVacations() {
        const response = await apiService.get<VacationsDetails[]>("tours");
        // setVications(response.data);
        store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
    }


    let metaDiv: any
    if (userType === 'CUSTOMER') {
        metaDiv = <React.Fragment>
                        {<Button type="primary" shape="round">follow</Button>}
                    </React.Fragment>

    } else if (userType === 'ADMIN') {
        metaDiv = <React.Fragment />
    }

    let editButtonDiv: any
    if (userType === 'CUSTOMER') {
        editButtonDiv = <React.Fragment />
    } else if (userType === 'ADMIN') {
        editButtonDiv = <Button type="primary" shape="circle">
                            <EditOutlined />
                        </Button>
    }

    if (!(vacations && vacations.length)) return <> </>;

    return (
        <div className='cardsContainer'>
                
        {vacations.map((vacation) => 


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
                // actions={[
                // <EditOutlined key="edit" />,
                // ]}
            >
                <Meta
                title={vacation.destination}
                avatar={metaDiv}
                />

                <div className='CardBodyClass'>
                    <br />
                    <p className="description">{vacation.description}</p>
                    <div className="detailsClass">
                        <div className="priceClass">
                            {`price: ${vacation.price}`}
                        </div>
                        <div className="followersClass">
                            {`followers: ${vacation.followers}`}
                        </div>
                    </div>
                    <br />
                    <div className="datesClass">
                        {`starts: ${vacation.start_date.toString().slice(0, 10)} ends: ${vacation.end_date.toString().slice(0, 10)}`}
                    </div>
                </div>
                <div className="editButtonClass">
                    {editButtonDiv}
                </div>
            </Card>

        )}
    </div>
)

}

export default VacationsCards