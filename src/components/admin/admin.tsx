import React, { Component } from 'react';
import './admin.css';
import '../../styles/vacationCards.css';
import { VacationsDetails } from '../../models/VacationsDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';

import VacationsCards from '../vacationsFunction/vacations';
import VacationUpdate from '../vacationUpdate/vacationUpdate';
// import AddVacationComponent from '../addVacationComponent/addVacationComponent';
// import { Button } from 'antd';


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

        // this.watchChartsHandler = this.watchChartsHandler.bind(this);

        this.unsubscribeStore = store.subscribe(

            () => this.setState(
                {
                    vacations: store.getState().vacations
                })
        );
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }
    
    componentDidMount() {
    }

    // watchChartsHandler() {
    //     this.props.history.push('/charts');
    // }

    public render() {
        return (
            <div className='mainContainer'>
                {/* <div className="adminToolbar">
                    <AddVacationComponent />
                    <Button type="primary" className="statisticsButton" onClick={this.watchChartsHandler}>watch statistics</Button>
                </div> */}
                <VacationUpdate />
                <VacationsCards />
            </div>
        );
    }
}