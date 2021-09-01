import React, {useState, useEffect} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase"
import axios from "axios";
import './Player.css';


// export default class Player extends Component{


//     clearColor = () => {
//         this.props.parentCallback("#FFFFFF");
//     }

//     sendRed = () => {
//         this.props.parentCallback("#ff545d");
//     }

//     sendBlue = () => {
//         this.props.parentCallback("#5c82ff");
//     }

//     sendGreen = () => {
//         this.props.parentCallback("#7df589");
//     }

//     sendYellow = () => {
//         this.props.parentCallback("#faff70");
//     }

//     render(){
//         return(
//             <div className="lobby" style={{backgroundColor: this.props.color}}>
//                 <h1 className="header">{this.props.name}</h1>
//                 <FormControl>
//                     <InputLabel>Select Color</InputLabel>
//                     <Select>
//                         <MenuItem value={0} onClick={this.clearColor}>Select Color</MenuItem>
//                         <MenuItem value={1} onClick={this.sendRed}>Red</MenuItem>
//                         <MenuItem value={2} onClick={this.sendBlue}>Blue</MenuItem>
//                         <MenuItem value={3} onClick={this.sendGreen}>Green</MenuItem>
//                         <MenuItem value={4} onClick={this.sendYellow}>Yellow</MenuItem>
//                     </Select>
//                 </FormControl>
//             </div>
//         );
//     }

// }

export default function Player(props){

    const { currentUser, logout } = useAuth();
    const [curUserLobby, setCurUserLobby] = useState("");
    const [curUsername, setCurUsername] = useState("");
    const [curColor, setCurColor] = useState("");


    async function currentUserLobby(){
        if(currentUser){
            const userRef = db.collection("lobby").doc(props.player.toString());
            const doc = await userRef.get();
            if (!doc.exists) {
                console.log('Lobby not found!');
            } else {
                setCurUserLobby(doc.data().username);
            }
        }
    }

    async function currentUsername(){
        if(currentUser){
            const userRef = db.collection("users").doc(currentUser.email);
            const doc = await userRef.get();
            if (!doc.exists) {
                console.log('Lobby not found!');
            } else {
                setCurUsername(doc.data().username);
            }
        }
    }

    async function changeNone(){
        if(curUsername === curUserLobby){
            const url ="https://us-central1-dapp-backend-basics.cloudfunctions.net/changeColor" + "?user=" + props.player + "&color=" + "white";
            axios.post(url);
        }
        await sleep(1000);
        getColorRequest();
    }

    async function changeRed(){
        console.log(curUserLobby);
        if(curUsername === curUserLobby){
            const url ="https://us-central1-dapp-backend-basics.cloudfunctions.net/changeColor" + "?user=" + props.player + "&color=" + "red";
            axios.post(url);
        }
        await sleep(1000);
        getColorRequest();
    }

    async function changeBlue(){
        if(curUsername === curUserLobby){
            const url ="https://us-central1-dapp-backend-basics.cloudfunctions.net/changeColor" + "?user=" + props.player + "&color=" + "blue";
            axios.post(url);
        }
        await sleep(1000);
        getColorRequest();
    }

    async function changeGreen(){
        if(curUsername === curUserLobby){
            const url ="https://us-central1-dapp-backend-basics.cloudfunctions.net/changeColor" + "?user=" + props.player + "&color=" + "green";
            axios.post(url);
        }
        await sleep(1000);
        getColorRequest();
    }

    async function changeYellow(){
        if(curUsername === curUserLobby){
            const url ="https://us-central1-dapp-backend-basics.cloudfunctions.net/changeColor" + "?user=" + props.player + "&color=" + "yellow";
            axios.post(url);
        }
        await sleep(1000);
        getColorRequest();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getColorRequest(){
        if(curUsername === curUserLobby){
            const url ="https://us-central1-dapp-backend-basics.cloudfunctions.net/getColor?user=" + props.player;
            axios.get(url).then(function (response){
                setCurColor(response.data);
            })
        }
        console.log("CurColor:" + curColor);
    }

    // async function getColor(){
    //     const color = await getColorRequest();
    //     return color;
    // }

    useEffect(() =>{
        currentUserLobby();
        currentUsername();
        getColorRequest();
    }, []);


    return(
        <div className="lobby" style={{backgroundColor: curColor}}>
            <h1 className="header">{props.name}</h1>
            <FormControl>
                <InputLabel>Select Color</InputLabel>
                <Select>
                    <MenuItem value={0} onClick={changeNone}>Select Color</MenuItem>
                    <MenuItem value={1} onClick={changeRed}>Red</MenuItem>
                    <MenuItem value={2} onClick={changeBlue}>Blue</MenuItem>
                    <MenuItem value={3} onClick={changeGreen}>Green</MenuItem>
                    <MenuItem value={4} onClick={changeYellow}>Yellow</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
