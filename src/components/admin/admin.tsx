import React, { Component } from 'react';
import './admin.css';
// import axios from "axios";
import { VacationsDetails } from '../../models/VacationsDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
// import { ActionType } from '../../redux/action-type';
// import apiService from '../../services/api.service';

// import { Button } from 'antd';

import VacationsCards from '../vacationsFunction/vacations';

// import Charts from '../charts/charts';


interface VacationsState {
    vacations: VacationsDetails[]
}


export default class Admin extends Component <any, VacationsState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            vacations:[]
        };

        this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState(
            {
                vacations: store.getState().vacations
            })
        );
    }

    componentWillUnmount(){
        // this.unsubscribeStore();
    }
    
    componentDidMount() {
    }



    public render() {
        return (
            <div className='adminContainer'>
                <VacationsCards />
            </div>
        );
    }
}