import React, { Component } from 'react'
import axios from "axios";
import './vacations.css';
import { VacationsDetails } from '../../models/VacationsDetails';

interface VacationsInterface {
    vacations: VacationsDetails[]
}


export default class Vacations extends Component <any, VacationsInterface>{

    constructor(props: any) {
        super(props);
        this.state = {
            vacations:[]
        };
    }

    public async componentDidMount() {
        this.getVacations();
    }

    getVacations = async () => {
        const response = await axios.get<VacationsDetails[]>("http://localhost:3001/tours/");
        this.setState({ vacations: response.data });
        console.log(this.state.vacations);
    }


    public render() {
        return (
            <div>
                vacations works
            </div>
        );
    }
}