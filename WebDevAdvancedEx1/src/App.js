import React, {Component} from "react";
import './App.css';
import Player from './components/Player';
import Grid from '@material-ui/core/Grid';


export default class App extends Component{

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
        <h1 class="title">Game Lobby</h1>
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

