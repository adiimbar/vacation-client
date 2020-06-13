import React, { useState, useEffect } from 'react';
import axios from "axios";
import { VacationsDetails } from '../../models/VacationsDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';

interface VacationsState {
    vacations: VacationsDetails[]
}

const { Meta } = Card;

function VacationsCards()  {
    const [vacations, setVications] = useState<VacationsDetails[]>()
    // const [vacations, setVications] = useState([])

    let unsubscribeStore: Unsubscribe;

    unsubscribeStore = store.subscribe(
        // In fact, the following function is our "listener", "refresh function"
        () => setVications(
                store.getState().vacations

            // {
            //     vacations: store.getState().vacations
            //     store.getState().vacations
            // }
            )
    );
    
    useEffect( () => {
        getVacations();
        // unsubscribeStore();
        console.log(vacations);

        return unsubscribeStore()
    }, [vacations, unsubscribeStore])


    async function getVacations() {
        const response = await axios.get<VacationsDetails[]>("http://localhost:3001/tours/");
        // setVications(response.data);
        store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
    }

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