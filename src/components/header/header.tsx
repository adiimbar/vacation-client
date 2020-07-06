import React, {  } from 'react';
import "./header.css";

// import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
// import { ActionType } from '../../redux/action-type';

import AddVacationComponent from '../addVacationComponent/addVacationComponent';
import { Button } from 'antd';


const Header = (props: any) => {

    const userType = store.getState().userType;

    function watchChartsHandler() {
        props.history.push('/charts');
    }

    function backToAdminPanelHandler() {
        props.history.push('/admin');
    }
    const url: string = "http://localhost:3001/uploads/Logo.png";
    
    return (
        <div className="headerClass">
            <div className="logoDivClass">
                <img src={url} className="logoClass" alt="logo"></img>
            </div>

            {
                userType === 'ADMIN' ? 
                    <div className="adminButtonsClass">
                    <AddVacationComponent />
                        {
                            props.location.pathname === '/admin' ?
                            <Button type="primary" className="statisticsButton" onClick={watchChartsHandler}>watch statistics</Button> :
                                <Button type="primary" className="statisticsButton" onClick={backToAdminPanelHandler}>back to panel</Button>
                        }
                    </div> : 
                        <> </>
            }
        </div>
    )

}

export default Header