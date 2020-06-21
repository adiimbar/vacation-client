import React, { Component } from 'react';
// import axios from "axios";
import { ToursFollowersDetails } from '../../models/toursFollowersDetails';
// import { ToursFollowersDetails } from '../../models/ToursFollowersDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import apiService from '../../services/api.service';

import { Button } from 'antd';
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

// let myChart:any

export default class Charts extends Component <any, ToursFollowersState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            toursFollowers:[],
            vacationsDestinations:[],
            vacationsFollowersNumbers:[] 
        
        };

        this.backToAdminHandler = this.backToAdminHandler.bind(this)
        // let tourDestinations: any = [];
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        // Typical usage (don't forget to compare props):
        if (this.state.toursFollowers !== prevState.toursFollowers) {
            this.state.toursFollowers.forEach(element => {
                // this.setState.tourDestinations.push(element.destination)
                this.setState({vacationsDestinations: this.state.vacationsDestinations.push(element.destination)})
                // console.log('inside foreach loop')
                // console.log(this.state.vacationsDestinations)
            });
        }
        console.log(prevProps);
        console.log(prevState);
        let asdf = store.getState().userType;
        console.log(asdf);

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



        // const myChart = new Chart(this.chartRef.current, {
        //     type: 'line',
        //     options: {
        //       scales: {
        //         xAxes: [
        //           {
        //             type: 'time',
        //             time: {
        //               unit: 'week'
        //             }
        //           }
        //         ],
        //         yAxes: [
        //           {
        //             ticks: {
        //               min: 0
        //             }
        //           }
        //         ]
        //       }
        //     },
        //     data: {
        //       labels: this.props.data.map(d => d.time),
        //       datasets: [{
        //         label: this.props.title,
        //         data: this.props.data.map(d => d.value),
        //         fill: 'none',
        //         backgroundColor: this.props.color,
        //         pointRadius: 2,
        //         borderColor: this.props.color,
        //         borderWidth: 1,
        //         lineTension: 0
        //       }]
        //     }
        //   });

    }

    getNumberOfFollowersForAllTours = async () => {
        const response = await apiService.get<ToursFollowersDetails[]>("follow");
        store.dispatch({ type: ActionType.getNumberOfFollowersForAllTours, payload: response.data});
        // this.setState({ vacations: response.data });
        console.log(this.state.toursFollowers);
        // console.log(response.data);
    }



    // addData = (chart:any, label:any, data:any) => {
    //     chart.data.labels.push(label);
    //     chart.data.datasets.forEach((dataset:any) => {
    //         dataset.data.push(data);
    //     });
    //     chart.update();
    // }
    
    // removeData = (chart:any) => {
    //     chart.data.labels.pop();
    //     chart.data.datasets.forEach((dataset:any) => {
    //         dataset.data.pop();
    //     });
    //     chart.update();
    // }

    backToAdminHandler() {
        this.props.history.push('/admin');
    }
    
    data = {
        // labels: ['aaa', 'bbb'],
        labels: ['aaa'],
        datasets: [
          {
            label: 'Amount of followers',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [20]
            // data: this.state.vacationsFollowersNumbers
          }
        ]
    };


    public render() {
        return (
            <div className='chartsContainer'>

                <div className="editingToolbar">
                    <Button type="primary" onClick={this.backToAdminHandler}>Editing panle</Button>
                </div>

                <div>
                    <h2>Vacations followers statistics</h2>
                    <Bar
                    data={this.data}
                    // width={100}
                    height={350}
                    options={
                        // maintainAspectRatio: false,
                        graphOptions
                    }
                    />
                </div>

            </div>
        );
    }
}