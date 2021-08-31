import React, {Component} from "react";
import './Lobby.css';
import Player from '../Player/Player';
import Grid from '@material-ui/core/Grid';
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase"

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


// export default function Lobby(){
//   callbackFunctionOne = (childData) =>{
//     if(childData === "#FFFFFF" ||
//       (childData !== this.state.playerTwo && childData !== this.state.playerThree && childData !== this.state.playerFour)){
//       this.setState({playerOne: childData});
//     }
//   }

//   callbackFunctionTwo = (childData) =>{
//     if(childData === "#FFFFFF" ||
//       (childData !== this.state.playerOne && childData !== this.state.playerThree && childData !== this.state.playerFour)){
//       this.setState({playerTwo: childData});
//     }
//   }

//   callbackFunctionThree = (childData) =>{
//     if(childData === "#FFFFFF" ||
//       (childData !== this.state.playerTwo && childData !== this.state.playerOne && childData !== this.state.playerFour)){
//       this.setState({playerThree: childData});
//     }
//   }

//   callbackFunctionFour = (childData) =>{
//     if(childData === "#FFFFFF" ||
//       (childData !== this.state.playerTwo && childData !== this.state.playerThree && childData !== this.state.playerOne)){
//       this.setState({playerFour: childData});
//     }
//   }
//   return(
    
//     <div>
//       <h1 className="title">Game Lobby</h1>
//       <Grid container id="container" direction="row" justifyContent="center" alignItems="center">
//         <Grid container item>
//           <Player name="Player 1" parentCallback = {callbackFunctionOne} color={this.state.playerOne}></Player>
//           <Player name="Player 2" parentCallback = {callbackFunctionTwo} color={this.state.playerTwo}></Player>
//         </Grid>
//         <Grid container item>
//           <Player name="Player 3" parentCallback = {callbackFunctionThree} color={this.state.playerThree}></Player>
//           <Player name="Player 4" parentCallback = {callbackFunctionFour} color={this.state.playerFour}></Player>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }