import React, {  } from 'react';
import "./header.css";

// import { Unsubscribe } from "redux";
// import { store } from '../../redux/store';
// import { ActionType } from '../../redux/action-type';

// import AddVacationComponent from '../addVacationComponent/addVacationComponent';
// import { Button } from 'antd';


const Header = (props: any) => {

    // const userType = store.getState().userType;

    // function watchChartsHandler() {
    //     console.log(props);
    //     // props.history.push('/charts');
    // }

    const url: string = "http://localhost:3001/uploads/Logo.png";
    
    return (
        <div className="headerClass">
            <img src={url} className="logoClass" alt="logo"></img>
                {/* {
                    userType === 'ADMIN' ? 
                        <div className="adminButtonsClass">
                        <AddVacationComponent />
                        <Button type="primary" className="statisticsButton" onClick={watchChartsHandler}>watch statistics</Button>
                        </div> : 
                            <> </>
                } */}
        </div>
    )

}

export default Header