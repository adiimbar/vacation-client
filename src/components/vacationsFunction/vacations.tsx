import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import axios from "axios";
import { VacationsDetails } from '../../models/VacationsDetails';
import { FollowDetails } from '../../models/FollowDetails';
import VacationUpdate from '../vacationUpdate/vacationUpdate';

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

    const userType = store.getState().userType;

    // let [vacationToFormEdit, setVacationToFormEdit] = useState();

    // can probably be replaced with jest a const:
    // const showModal: boolean = true;
    const [showModal, setShowModal] = useState(true);


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
        store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
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

    // async function addVacation(vacationObj: any) {
    //     const response = await apiService.post<VacationsDetails[]>("tours", vacationObj);
    //     // store.dispatch({ type: ActionType.AddVacation, payload: response.data});
    //     console.log('add vacation response');
    //     console.log(response.data);
    //     console.log(store.getState().vacations);
    // }

    // async function updateVacation(vacationObj: any) {
    //     const response = await apiService.put<VacationsDetails[]>("tours", vacationObj);
    //     // store.dispatch({ type: ActionType.AddVacation, payload: response.data});
    //     console.log('update vacation response');
    //     console.log(response.data);
    //     console.log(store.getState().vacations);
    // }

    function UserCardFollow(vacation: any) {
        // console.log(vacation);
        let isFollowedStatus: boolean;
        let isFollowedText: string;
        if (vacation.isFollowed) {
            // console.log(`vacation ${vacation.id} is followed`);
            isFollowedStatus = true;
            isFollowedText = 'Unfollow';
        } else {
            // console.log(`vacation ${vacation.id} is not followed`);
            isFollowedStatus = false;
            isFollowedText = 'Follow';
        }
        return <Button type="primary" shape="round" onClick={() => followClickHandler(vacation.id, isFollowedStatus)}>
            {isFollowedText}
        </Button>
    }

    function UserAdminEdit(vacation: any) {
        return <Button type="primary" shape="circle" onClick={() => editHandler(vacation)}>
            <EditOutlined />
        </Button>
    }
    

    function editHandler(vacation: any) {
        console.log('editHandler was clicked');
        console.log(vacation);
        // console.log('vacation to edit state');
        // console.log(vacationToFormEdit);
        // setVacationToFormEdit(preVacation => vacation);
        // console.log(vacationToFormEdit);

        // calling vacation form modal and passing it the selected vacation data
        ReactDOM.render(<VacationUpdate formEdit={vacation} openModal={showModal} closeModal={unmoutModalElement} />, document.getElementById('modalContainer'))
        // need to call an editing form - the api Call can be in the form
    }

    // unmounts the vacation form modal from the DOM
    function unmoutModalElement() {
    ReactDOM.unmountComponentAtNode(document.getElementById('modalContainer'))
    }

    function followClickHandler(vacationId: any, isFollowedStatus: boolean) {

        // console.log(`follow status: ${!isFollowedStatus}`)

        if(isFollowedStatus === false) {
            let vacationObj = {
                tourId: vacationId
            }
    
            follow(vacationObj)

        } else if(isFollowedStatus === true) {
            // console.log('inside followClickHandler - unfollow');
            unfollow(vacationId)
        }
    }
    
    if (!(vacations && vacations.length)) return <> </>;

    return (
        <div className='cardsContainer' id='cardsContainer'>

        {/* <VacationUpdate fromEdit={vacationToFormEdit}
            open={true}
            openModal={showModal}
            // show={true}
            // onClose={this.toggleModal}
        /> */}

        <div id='modalContainer'></div>
                
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
                avatar={
                    userType === 'CUSTOMER' ? 
                    <UserCardFollow {...vacation} /> : 
                        <UserAdminEdit  {...vacation} />
                        }
                />

                <div className='CardBodyClass'>
                    <br />
                    <div className="descriptionClass">
                        <p>{vacation.description}</p>
                    </div>
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