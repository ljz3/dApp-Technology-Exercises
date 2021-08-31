import React, {Component} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase"

import './Player.css';


export default class Player extends Component{


    clearColor = () => {
        this.props.parentCallback("#FFFFFF");
    }

    sendRed = () => {
        this.props.parentCallback("#ff545d");
    }

    sendBlue = () => {
        this.props.parentCallback("#5c82ff");
    }

    sendGreen = () => {
        this.props.parentCallback("#7df589");
    }

    sendYellow = () => {
        this.props.parentCallback("#faff70");
    }

    render(){
        return(
            <div className="lobby" style={{backgroundColor: this.props.color}}>
                <h1 className="header">{this.props.name}</h1>
                <FormControl>
                    <InputLabel>Select Color</InputLabel>
                    <Select>
                        <MenuItem value={0} onClick={this.clearColor}>Select Color</MenuItem>
                        <MenuItem value={1} onClick={this.sendRed}>Red</MenuItem>
                        <MenuItem value={2} onClick={this.sendBlue}>Blue</MenuItem>
                        <MenuItem value={3} onClick={this.sendGreen}>Green</MenuItem>
                        <MenuItem value={4} onClick={this.sendYellow}>Yellow</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }

}

// export default function Player(){

//     const { currentUser, logout } = useAuth();


//     function stub(){

//     }

//     function changeColor(url){
//         if(currentUser){
//             db.collection("users").doc(currentUser.email).update({
//                 color: "red"
//             })
//         }
//     }

//     return(
//         <div className="lobby" style={{backgroundColor: "red"}}>
//             <h1 className="header">{currentUser.email}</h1>
//             <FormControl>
//                 <InputLabel>Select Color</InputLabel>
//                 <Select>
//                     <MenuItem value={0} onClick={stub}>Select Color</MenuItem>
//                     <MenuItem value={1} onClick={stub}>Red</MenuItem>
//                     <MenuItem value={2} onClick={stub}>Blue</MenuItem>
//                     <MenuItem value={3} onClick={stub}>Green</MenuItem>
//                     <MenuItem value={4} onClick={stub}>Yellow</MenuItem>
//                 </Select>
//             </FormControl>
//         </div>
//     );
// }
