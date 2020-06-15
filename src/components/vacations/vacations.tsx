import React, { Component } from 'react'
import axios from "axios";
import './vacations.css';
import { VacationsDetails } from '../../models/VacationsDetails';
import { FollowDetails } from '../../models/FollowDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

import { Card, Button } from 'antd';


const { Meta } = Card;

// axios.defaults.baseURL = 'http://localhost:3001/';
// let token = sessionStorage.getItem('token');
// console.log('logging token');
// console.log(token);
// axios.defaults.headers.commom = {'Authorization': `Bearer ${token}`};

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token');
    // const token = store.getState().session.token;
    config.headers.Authorization = token;

    return config;
});
  


interface VacationsState {
    vacations: VacationsDetails[]
    userToursFollowings: FollowDetails[]
}


export default class Vacations extends Component <any, VacationsState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            vacations:[],
            userToursFollowings:[]
        };

        this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState(
            {
                vacations: store.getState().vacations,
                userToursFollowings: store.getState().userToursFollowings
            })
        );
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }
    
    public async componentDidMount() {
        this.getVacations();
        this.getFollowers();
    }


    getVacations = async () => {
        const response = await axios.get<VacationsDetails[]>("http://localhost:3001/tours/");
        store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
        // this.setState({ vacations: response.data });
        // console.log(this.state.vacations);
        // console.log(response.data);
    }

    getFollowers = async () => {
        const response = await axios.get<FollowDetails[]>("http://localhost:3001/follow/userFollowings");
        store.dispatch({ type: ActionType.GetUserFollowings, payload: response.data});
        // this.setState({ vacations: response.data });
        // console.log(this.state.vacations);
        // console.log(response.data);
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
                    >
                        <Meta
                        avatar={<Button type="primary" shape="round">follow</Button>}
                        title={vacation.destination}
                        />

                        <div className='userCardBodyStyle'>
                            {/* <p /> */}
                            <br />
                            <p className="description">{vacation.description}</p>
                            <div className="detailsClass">
                                {/* {`from: ${vacation.start_date.toString().slice(0, 10)} until: ${vacation.end_date.toString().slice(0, 10)}`} */}
                                {/* <br></br> */}
                                <div className="priceClass">
                                {`price: ${vacation.price}`}
                                </div>
                                {/* <br></br> */}
                                <div className="followersClass">
                                {`followers: ${vacation.followers}`}
                                </div>
                            </div>
                        </div>
                    </Card>

                )}
            </div>
        );
    }
}