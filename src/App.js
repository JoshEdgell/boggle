import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import GameBoard from './components/GameBoard';
import PlayArea from './components/PlayArea';
import Timer from './components/Timer';
import WordList from './components/WordList';
import dice from './assets/dice';
import './App.css';

const _ = require('lodash');

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      boardLayout: [],
      gameInProgress: false,
      hodgmanOn: false,
      time: '',
      seconds: this.initialTime,
      timeRemaining: '',
      userGuess: ''
    }
    this.timer = 0;
  };

  initialTime = 10;

  // Useful across multiple components

  changeInput = (name, value) =>{
    this.setState({
      [name]: value
    })
  }

  // Game creation functions

  shuffle = array =>{
    for (let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i],array[j]] = [array[j],array[i]]
    }
    return array
  }

  rollDice = () =>{
    // "allDice" is the set of all dice in the game
    let allDice = dice.map((die)=>{return(die[Math.floor(Math.random()*die.length)])})
    // "board" is the arrangement of the dice in a 5x5 matrix
    let board = _.chunk(this.shuffle(allDice),5);
    // replace each element in the board with an object that contains the letter's value and and it's className
    for (let i = 0; i < board.length; i++){
      for (let j = 0; j < board[i].length; j++) {
        let die = {
          value: board[i][j],
          class: ''
        }
        let number = Math.floor(Math.random()*4);
        switch (number){
          case 0:
            die.class = 'tile left'
            break;
          case 1:
            die.classs = 'tile upside-down'
            break
          case 2:
            die.class = 'tile right'
            break;
          default:
            die.class = 'tile'
        }
        board[i][j] = die
      }
    }
    this.setState({
      boardLayout: board
    })
  };

  // Timing functions
  startTimer = () =>{
    if (this.timer === 0 && this.state.seconds > 0) {
      let seconds = this.state.seconds;
    this.setState({
      time: this.calculateTime(seconds),
      seconds: seconds
    })
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  resetTimer = () =>{
    this.timer = 0;
    this.setState({
      seconds: this.initialTime,
    })
  };

  countDown = () =>{
    let seconds = this.state.seconds;
    seconds--;
    this.setState({
      time: this.calculateTime(seconds),
      seconds: seconds
    })
    if (seconds === 0) {
      clearInterval(this.timer);
      this.resetTimer();
      this.setState({
        gameInProgress: false
      })
    }
  }

  calculateTime = (time) =>{
    let minutes = ("0" + Math.floor(time / 60)).substr(-1);
    let seconds = ("00" +time % 60).substr(-2);
    let timeLeft = `${minutes}:${seconds}`
    return timeLeft
  }

  // GameBoard props

  toggleHodgman = () =>{
    this.setState({
      hodgmanOn: !this.state.hodgmanOn
    })
  };

  // Start game

  startGame = () =>{
    // set "gameInProgress" to true
    this.setState({
      gameInProgress: true
    })
    // "roll" the dice to determine the game board
    this.rollDice();
    // reset the time in case the user clicks "start" during the middle of a game
    this.resetTimer();
    // start the game timer
    this.startTimer();
  };

  render(){
    return (
      <div className="App">
        <Container>
          <Row>
            <Col sm={8}>
              <GameBoard
                hodgmanOn={this.state.hodgmanOn}
                boardLayout={this.state.boardLayout}
              />
              <PlayArea
                gameInProgress={this.state.gameInProgress}
                toggleHodgman={this.toggleHodgman}
                startGame={this.startGame} 
                hodgmanOn={this.state.hodgmanOn} 
                userGuess={this.state.userGuess} 
                changeInput={this.changeInput} 
              />
            </Col>
            <Col sm={4}>
              <Timer
                // changeTime={this.changeTime}
                time={this.state.time}
              />
              <WordList/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
