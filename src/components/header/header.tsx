import React, { Component } from 'react';
import "./header.css";





// export default class Header extends Component {
//     public render() {
//         return (
//             <div className="header">
//                 <p>header works!</p>
//             </div>
//         );
//     }
// }



interface AboutProps {
    displayedText: string;
}

export default class Header extends Component<AboutProps>{
    public constructor(props: AboutProps) {
        super(props);
    }
    public render() {
        return (
            <div className="header">{this.props.displayedText}</div>
        );
    }
}

