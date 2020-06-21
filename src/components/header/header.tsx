import React, {  } from 'react';
import { useHistory  } from "react-router-dom";
import { Menu } from 'antd';
import "./header.css";


// export default class Header extends Component{
//     public constructor(props: any) {
//         super(props);
//     }
    
//     statisticsButton = () => {
//         console.log('statistics button was clicked');
//         return <Redirect to="/home" exact />
//       };

//     public render() {
//         return (
//             <div className="header">
//                 {/* <h1>Header works!</h1> */}
//                 <Menu theme="dark" mode="horizontal">
//                     <Menu.Item key="1">vacations</Menu.Item>
//                     <Menu.Item key="2" onClick={this.statisticsButton}>statistics</Menu.Item>
//                 </Menu>
//             </div>
//         );
//     }
// }

// import React, { useEffect, useRef} from 'react';


const Header = (props: any) => {
    // const history = useHistory();

    // function vacationsButton() {
    //     history.push('/admin');
    // }

    // function statisticsButton() {
    //     history.push("/charts");
    // };

    return (
        <div className="header">
        <h1>Header works!</h1>
        {/* <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"onClick={vacationsButton}>vacations</Menu.Item>
            <Menu.Item key="2" onClick={statisticsButton}>statistics</Menu.Item>
        </Menu> */}
    </div>
    )

}

export default Header