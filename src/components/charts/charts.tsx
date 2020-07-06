import React, { Component } from 'react';
import { ToursFollowersDetails } from '../../models/toursFollowersDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import apiService from '../../services/api.service';

// import { Button } from 'antd';
import {Bar} from 'react-chartjs-2';
import './charts.css';


interface ToursFollowersState {
    toursFollowers: ToursFollowersDetails[],
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

export default class Charts extends Component <any, ToursFollowersState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            toursFollowers:[],        
        };

        // this.backToAdminHandler = this.backToAdminHandler.bind(this)
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }
    
    componentDidMount() {
        this.getNumberOfFollowersForAllTours();
        
        this.unsubscribeStore = store.subscribe(
            () => this.setState({
                toursFollowers: store.getState().toursFollowers
            })
        );

    }

    getNumberOfFollowersForAllTours = async () => {
        const response = await apiService.get<ToursFollowersDetails[]>("follow");
        store.dispatch({ type: ActionType.getNumberOfFollowersForAllTours, payload: response.data});
    }

    getChartData() {
        const vacationFollowers: any = this.state.toursFollowers;

        const labels: string[] = [];
        const values: number[] = [];

        if(vacationFollowers) {
            vacationFollowers.forEach((statFollowerObj: any) => {
                const { destination, numOfFollowers} = statFollowerObj;
                labels.push(destination);
                values.push(numOfFollowers);
            });
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Amount of followers',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: values
                }        
            ]
        }

    }

    backToAdminHandler() {
        this.props.history.push('/admin');
    }
    
    public render() {
        return (
            <div className='chartsContainer'>

                {/* <div className="editingToolbar">
                    <Button type="primary" onClick={this.backToAdminHandler}>Editing panle</Button>
                </div> */}

                <div>
                    <h2>Vacations followers statistics</h2>
                    <Bar
                    data={this.getChartData()}
                    height={350}
                    options={
                        graphOptions
                    }
                    />
                </div>

            </div>
        );
    }
}