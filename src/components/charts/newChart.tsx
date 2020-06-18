import React, { Component } from 'react';
// import axios from "axios";
import { ToursFollowersDetails } from '../../models/toursFollowersDetails';
// import { ToursFollowersDetails } from '../../models/ToursFollowersDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import apiService from '../../services/api.service';
import {Bar} from 'react-chartjs-2';


interface ToursFollowersState {
    toursFollowers: ToursFollowersDetails[],
    vacationsDestinations: any,
    vacationsFollowersNumbers: any
}

const graphOptions: any = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

export default class Charts extends Component <any, any, ToursFollowersState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                  {
                    label: 'Amount of followers',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: []
                    // data: this.state.vacationsFollowersNumbers
                  }
                ]
            }
        };
    }


    componentWillUnmount(){
        this.unsubscribeStore();
    }
    
    componentDidMount() {
        this.getNumberOfFollowersForAllTours();
        
        this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState({
                toursFollowers: store.getState().toursFollowers
            })
        );

    }

    getNumberOfFollowersForAllTours = async () => {
        const response = await apiService.get<ToursFollowersDetails[]>("follow");
        store.dispatch({ type: ActionType.getNumberOfFollowersForAllTours, payload: response.data});
        // this.setState({ vacations: response.data });
        // console.log(this.state.toursFollowers);
        console.log(response.data);
        // this.setState({
        //     chartData: 
        // })
    }

    public render() {
        return (
            <div className='chartsContainer'>


                <div>
                    <h2>Vacations followers statistics</h2>
                    <Bar
                    data={this.state.chartData}
                    // width={100}
                    height={350}
                    options={graphOptions}
                    />
                </div>

            </div>
        );
    }
}