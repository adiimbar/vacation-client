import React, { Component } from 'react';
import { Menu } from 'antd';
import "./header.css";


export default class Header extends Component{
    public constructor(props: any) {
        super(props);
    }
    
    public render() {
        return (
            <div className="header">
                <h1>Header works!</h1>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </div>
        );
    }
}

