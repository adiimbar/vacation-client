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
    // let vacations: VacationsDetails[] = [];
    let vacations = store.getState().vacations;
    // const [vacations, setVacations] = useState([]);

    // let followedTours = store.getState().userToursFollowings;
    // const [followedTours, updateFollowedTours] = useState();

    
    // Mock need to be removed
    // const [userType, setUserType] = useState('CUSTOMER');
    // const [userType, setUserType] = useState('ADMIN');
    const userType = store.getState().userType;


    let unsubscribeStore: Unsubscribe;

    unsubscribeStore = store.subscribe(
        // In fact, the following function is our "listener", "refresh function"
        () => {
            // vacations = store.getState().vacations;
            // followedTours = store.getState().userToursFollowings;
            // setUserType(store.getState().userType)
        }
    );
    
    useEffect( () => {
        unsubscribeStore();

        return unsubscribeStore()
    }, [unsubscribeStore]);

    useEffect( () => {
        getVacations();
        getFollowers();
        // followedTours = store.getState().userToursFollowings;
        
    }, []);

    async function getVacations() {
        const response = await apiService.get<VacationsDetails[]>("tours");
        // setVications(response.data);
        store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
        console.log('get vacations was called');
    }

    async function getFollowers() {
        const response = await apiService.get<FollowDetails[]>("follow/userFollowings");
        store.dispatch({ type: ActionType.GetUserFollowings, payload: response.data});
    }

    async function follow(vacationObj: any) {
        const response = await apiService.post<FollowDetails[]>("follow/addFollower", vacationObj);
        store.dispatch({ type: ActionType.AddUserFollow, payload: response.data});
    }

    async function unfollow(vacationId: any) {
        const response = await apiService.delete<FollowDetails[]>(`follow/${vacationId}`);
        store.dispatch({ type: ActionType.RemoveUserFollow, payload: response.data});
    }

    function followClickHandler(vacationId: any) {

        console.log('userToursFollowings state')

        if(true) {
            let vacationObj = {
                tourId: vacationId
            }
    
            follow(vacationObj)

        } else if(false) {
            unfollow(vacationId)
        }

        console.log(store.getState().userToursFollowings);

    }   


    // declaring element that will be assigned a button and rendered accordion to userType
    // the button will be assigned to each card in the Meta section
    let metaButtonDiv: any
    // follow button for user

    if (userType === 'CUSTOMER') {

        metaButtonDiv = 'follow';
        // metaButtonDiv = <React.Fragment>
        //                 {<Button type="primary" shape="round" onClick={() => follow('HTMLElementObject.id')}>
        //                     follow
        //                 </Button>}
        //             </React.Fragment>

    // edit button for admin
    } else if (userType === 'ADMIN') {
        metaButtonDiv = <EditOutlined />
        // metaButtonDiv = <React.Fragment>
        //                 {<Button type="primary" shape="circle">
        //                     <EditOutlined />
        //                 </Button>}
        //             </React.Fragment>
    }

    
    if (!(vacations && vacations.length)) return <> </>;

    return (
        <div className='cardsContainer'>
                
        {vacations.map((vacation) => 


            <Card
                className='cardDiv'
                id={vacation.id.toString()}
                key={vacation.id}
                style={{ width: 300 }}
                cover={
                <img
                    alt="Oops I'm missing"
                    src={vacation.image_path}
                />
                }
            >
                <Meta
                title={vacation.destination}
                avatar={<Button type="primary" shape="round" value={vacation.id.toString()} onClick={() => followClickHandler(vacation.id)}>
                            {metaButtonDiv}
                        </Button>}
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