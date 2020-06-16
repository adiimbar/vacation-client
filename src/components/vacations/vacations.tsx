import React, { Component } from 'react'
import axios from "axios";
import './vacations.css';
import VacationsCards from '../vacationsFunction/vacations';
import { VacationsDetails } from '../../models/VacationsDetails';
import { FollowDetails } from '../../models/FollowDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

// import { Card, Button } from 'antd';
import apiService from '../../services/api.service';


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
    
    componentDidMount() {
    }


    // getVacations = async () => {
    //     const response = await apiService.get<VacationsDetails[]>("tours/");
    //     store.dispatch({ type: ActionType.GetAllVacations, payload: response.data});
    //     // this.setState({ vacations: response.data });
    //     // console.log(this.state.vacations);
    //     // console.log(response.data);
    // }

    // getFollowers = async () => {
    //     const response = await apiService.get<FollowDetails[]>("follow/userFollowings");
    //     store.dispatch({ type: ActionType.GetUserFollowings, payload: response.data});
    //     // this.setState({ vacations: response.data });
    //     // console.log(this.state.vacations);
    //     // console.log(response.data);
    // }



    public render() {
        return (
            <div className='cardsContainer'>
                <VacationsCards />               
            </div>
        );
    }
}