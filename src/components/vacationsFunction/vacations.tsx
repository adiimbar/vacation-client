import React, { useState, useEffect } from 'react';
// import axios from "axios";
import { VacationsDetails } from '../../models/VacationsDetails';
import { FollowDetails } from '../../models/FollowDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import apiService from '../../services/api.service';

import './vacations.css';

// interface VacationsState {
//     vacations: VacationsDetails[]
// }

const { Meta } = Card;

function VacationsCards()  {
    const vacations = store.getState().vacations;
    
    // Mock need to be removed
    // const [userType, setUserType] = useState('CUSTOMER');
    const [userType, setUserType] = useState('CUSTOMER');


    let unsubscribeStore: Unsubscribe;

    unsubscribeStore = store.subscribe(
        // In fact, the following function is our "listener", "refresh function"
        () => {
            // const vacations = store.getState().vacations;
        }
    );
    
    useEffect( () => {
        getVacations();
        // getFollowers()
        // unsubscribeStore();

        return unsubscribeStore()
    }, []);


    async function getVacations() {
        const response = await apiService.get<VacationsDetails[]>("tours");
        // setVications(response.data);
        store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
        console.log('get vacations was called');
    }

    // async function getFollowers() {
    //     const response = await apiService.get<FollowDetails[]>("follow/userFollowings");
    //     store.dispatch({ type: ActionType.GetUserFollowings, payload: response.data});
    //     // this.setState({ vacations: response.data });
    //     // console.log(this.state.vacations);
    //     // console.log(response.data);
    // }


    // declaring element that will be assigned a button and rendered accordion to userType
    // the button will be assigned to each card in the Meta section
    let metaDiv: any
    // follow button for user
    if (userType === 'CUSTOMER') {
        metaDiv = <React.Fragment>
                        {<Button type="primary" shape="round">
                            follow
                        </Button>}
                    </React.Fragment>

    // edit button for admin
    } else if (userType === 'ADMIN') {
        metaDiv = <React.Fragment>
                        {<Button type="primary" shape="circle">
                            <EditOutlined />
                        </Button>}
                    </React.Fragment>
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
            </Card>

        )}
    </div>
)

}

export default VacationsCards