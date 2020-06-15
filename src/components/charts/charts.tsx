import React, { Component } from 'react';
import axios from "axios";
import { ToursFollowersDetails } from '../../models/toursFollowersDetails';
// import { ToursFollowersDetails } from '../../models/ToursFollowersDetails';
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';


interface ToursFollowersState {
    toursFollowers: ToursFollowersDetails[]
}

export default class Charts extends Component <any, ToursFollowersState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            toursFollowers:[]
        };

        // this.unsubscribeStore = store.subscribe(
        //     // In fact, the following function is our "listener", "refresh function"
        //     () => this.setState({

        //     })
        // );

    }

    componentWillUnmount(){
    }
    
    componentDidMount() {
        this.getNumberOfFollowersForAllTours()
    }

    getNumberOfFollowersForAllTours = async () => {
        const response = await axios.get<ToursFollowersDetails[]>("http://localhost:3001/follow/");
        store.dispatch({ type: ActionType.getNumberOfFollowersForAllTours, payload: response.data});
        // this.setState({ vacations: response.data });
        // console.log(this.state.vacations);
        // console.log(response.data);
    }


    public render() {
        return (
            <div className='chartsContainer'>
                charts component
            </div>
        );
    }
}