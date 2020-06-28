import React, { Component } from 'react'
import './customer.css';
import '../../styles/vacationCards.css';
import VacationsCards from '../vacationsFunction/vacations';
import { VacationsDetails } from '../../models/VacationsDetails';
import { FollowDetails } from '../../models/FollowDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
// import { ActionType } from '../../redux/action-type';

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

    public render() {
        return (
            <div className='mainContainer'>
                <VacationsCards />               
            </div>
        );
    }
}