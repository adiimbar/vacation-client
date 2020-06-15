import React, { useState, useEffect } from 'react';
import axios from "axios";
import { VacationsDetails } from '../../models/VacationsDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';
import apiService from '../../services/api.service';

interface VacationsState {
    vacations: VacationsDetails[]
}

const { Meta } = Card;

function VacationsCards()  {
    const vacations = store.getState().vacations;

    let unsubscribeStore: Unsubscribe;

    unsubscribeStore = store.subscribe(
        // In fact, the following function is our "listener", "refresh function"
        () => {
            const vactions = store.getState().vacations;
            // console.log('vactions', vactions);
            // setVications(vactions)
        }
    );
    
    useEffect( () => {
        getVacations();
        // unsubscribeStore();
        // console.log(vacations);

        return unsubscribeStore()
    }, []);


    async function getVacations() {
        const response = await apiService.get<VacationsDetails[]>("tours");
        // setVications(response.data);
        store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
    }


    if (!(vacations && vacations.length)) return <> </>;

    return (
        <div className='cardsContainer'>
                
        <p>cards div</p>

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
                actions={[
                <CheckOutlined key="follow" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                title={vacation.destination}
                description={`from: ${vacation.start_date.toString().slice(0, 10)} until: ${vacation.end_date.toString().slice(0, 10)}`}
                />

                <div>
                    <p></p>
                    <p className="description">{vacation.description}</p>
                    <p className="price">{`price: ${vacation.price}`}</p>
                </div>
            </Card>

        )}
    </div>
)

}

export default VacationsCards