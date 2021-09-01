import React, {useState, useEffect, useHistory } from "react";
import './Lobby.css';
import { Button } from "react-bootstrap";
import Player from '../Player/Player';
import Grid from '@material-ui/core/Grid';
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase"



/*
export default class Lobby extends Component{

  constructor(props){
    super(props);
    this.state={
        playerOne: "#FFFFFF",
        playerTwo: "#FFFFFF",
        playerThree: "#FFFFFF",
        playerFour: "#FFFFFF"
    };
  }

  callbackFunctionOne = (childData) =>{
    if(childData === "#FFFFFF" ||
      (childData !== this.state.playerTwo && childData !== this.state.playerThree && childData !== this.state.playerFour)){
      this.setState({playerOne: childData});
    }
  }

  callbackFunctionTwo = (childData) =>{
    if(childData === "#FFFFFF" ||
      (childData !== this.state.playerOne && childData !== this.state.playerThree && childData !== this.state.playerFour)){
      this.setState({playerTwo: childData});
    }
  }

  callbackFunctionThree = (childData) =>{
    if(childData === "#FFFFFF" ||
      (childData !== this.state.playerTwo && childData !== this.state.playerOne && childData !== this.state.playerFour)){
      this.setState({playerThree: childData});
    }
  }

  callbackFunctionFour = (childData) =>{
    if(childData === "#FFFFFF" ||
      (childData !== this.state.playerTwo && childData !== this.state.playerThree && childData !== this.state.playerOne)){
      this.setState({playerFour: childData});
    }
  }

  render (){
    return(
      <div>
        <h1 className="title">Game Lobby</h1>
        <Grid container id="container" direction="row" justifyContent="center" alignItems="center">
          <Grid container item>
            <Player name="Player 1" parentCallback = {this.callbackFunctionOne} color={this.state.playerOne}></Player>
            <Player name="Player 2" parentCallback = {this.callbackFunctionTwo} color={this.state.playerTwo}></Player>
          </Grid>
          <Grid container item>
            <Player name="Player 3" parentCallback = {this.callbackFunctionThree} color={this.state.playerThree}></Player>
            <Player name="Player 4" parentCallback = {this.callbackFunctionFour} color={this.state.playerFour}></Player>
          </Grid>
        </Grid>
      </div>
    );
  }
}

*/


export default function Lobby(){
  const { currentUser } = useAuth();
  const [inLobby, setInLobby] = useState(null);
  const [curUsername, setCurrentUsername] = useState("");
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [username3, setUsername3] = useState("");
  const [username4, setUsername4] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [color4, setColor4] = useState("");


  async function getPlayerNumber(){
    const userRef1 = db.collection("lobby").doc("1");
    const doc1 = await userRef1.get();
    if(doc1.data().joined){
      const userRef2 = db.collection("lobby").doc("2");
      const doc2 = await userRef2.get();
      if(doc2.data().joined){
        const userRef3 = db.collection("lobby").doc("3");
        const doc3 = await userRef3.get();
        if(doc3.data().joined){
          const userRef4 = db.collection("lobby").doc("4");
          const doc4 = await userRef4.get();
          if(!(doc4.data().joined)){
            return "4";
          }
        }else{
          return "3";
        }
      }else{
        return "2";
      }
    }else{
      return "1";
    }
    return null;
  }


  async function joinLobby(){
    const player = await getPlayerNumber();

    db.collection("lobby").doc(player).update({
      username: curUsername,
      color: "white",
      joined: true
    })

    db.collection("users").doc(currentUser.email).update({
      inLobby: player
    })
    setInLobby(player);
  }

  async function leaveLobby(){
    db.collection("users").doc(currentUser.email).update({
      inLobby: 0
    })

    db.collection("lobby").doc(inLobby).update({
      username: "",
      color: "",
      joined: false
    })
    setInLobby(0);
  }


  const userInLobby = async() => {
    const userRef = db.collection("users").doc(currentUser.email);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      setInLobby(doc.data().inLobby);
    }
  }


  const getLobby = async() => {
    const userRef1 = db.collection("lobby").doc("1");
    const doc1 = await userRef1.get();
    if (!doc1.exists) {
      console.log('No such document!');
    } else {
      setUsername1(doc1.data().username);
      setColor1(doc1.data().color);
    }
    const userRef2 = db.collection("lobby").doc("2");
    const doc2 = await userRef2.get();
    if (!doc2.exists) {
      console.log('No such document!');
    } else {
      setUsername2(doc2.data().username);
      setColor2(doc2.data().color);
    }
    const userRef3 = db.collection("lobby").doc("3");
    const doc3 = await userRef3.get();
    if (!doc3.exists) {
      console.log('No such document!');
    } else {
      setUsername3(doc3.data().username);
      setColor3(doc3.data().color);
    }
    const userRef4 = db.collection("lobby").doc("4");
    const doc4 = await userRef4.get();
    if (!doc4.exists) {
      console.log('No such document!');
    } else {
      setUsername4(doc4.data().username);
      setColor4(doc4.data().color);
    }
  }

  const currentUsername = async() => {
    const userRef = db.collection("users").doc(currentUser.email);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      setCurrentUsername(doc.data().username);
    }
  }

  useEffect(() =>{
    userInLobby();
    currentUsername();
    getLobby();
    console.log("NUMBER", getPlayerNumber());
  }, []);


  return(
    
    <div>
      <h1 className="title">Game Lobby</h1>

      <div className="text-center mb-2">
        {currentUser && (inLobby===0) && <Button className="btn btn-primary w-25 mt-3" onClick={joinLobby}>Join</Button>}
      </div>

      <div className="text-center mb-2">
        {currentUser && !(inLobby===0) && <Button className="btn btn-primary w-25 mt-3" onClick={leaveLobby}>Leave</Button>}
      </div>
      
      <Grid container id="container" direction="row" justifyContent="center" alignItems="center">
        <Grid container item>
          <Player name={username1 || "Player 1"} color={color1} player={1}></Player>
          <Player name={username2 || "Player 2"} color={color2} player={2}></Player>
        </Grid>
        <Grid container item>
          <Player name={username3 || "Player 3"} color={color3} player={3}></Player>
          <Player name={username4 || "Player 4"} color={color4} player={4}></Player>
        </Grid>
      </Grid>
    </div>
  );
}