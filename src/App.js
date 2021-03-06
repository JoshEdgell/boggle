import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import GameBoard from './components/GameBoard';
import PlayArea from './components/PlayArea';
import Timer from './components/Timer';
import WordList from './components/WordList';
import ScoreBox from './components/ScoreBox'
import dice from './assets/dice';
import StartModal from './components/StartModal';
import EndModal from './components/EndModal';
import './App.css'

const _ = require('lodash');
require('dotenv').config()

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      boardLayout: [],
      gameInProgress: false,
      hodgmanOn: false,
      time: '',
      seconds: this.initialTime,
      score: 0,
      timeRemaining: '',
      userGuess: '',
      correctWords: [],
      lastAnswer: {
        message: '',
        className: ''
      },
      display: {
        startModal: true,
        endModal: false
      }
    }
    this.timer = 0;
  };

  initialTime = 180; // Time in seconds

  updateScore = (length) => {
    let points = 0;
    if (length > 7) {
      points = 11
    } else {
      switch(length){
        case 3:
          points = 1
          break;
        case 4:
          points = 2
          break;
        case 5:
          points = 3
          break;
        case 6:
          points = 4
          break;
        case 7:
          points = 5
          break;
        default:
      }
    }
    let newScore = this.state.score
    newScore += points;
    this.setState({
      score: newScore 
    })
  };

  loseAPoint = () =>{
    let newScore = this.state.score;
    newScore--;
    this.setState({
      score: newScore
    })
  };

  changeInput = (name, value) =>{
    this.setState({
      [name]: value
    })
  };

  changeLastAnswer = (text, className) =>{
    let newObject = { message: text, className: className }
    this.setState({
      lastAnswer: newObject
    })
  };

  shuffle = array =>{
    for (let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i],array[j]] = [array[j],array[i]]
    }
    return array
  };

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
      });
      this.endGame();
    }
  };

  calculateTime = (time) =>{
    let minutes = ("0" + Math.floor(time / 60)).substr(-1);
    let seconds = ("00" +time % 60).substr(-2);
    let timeLeft = `${minutes}:${seconds}`
    return timeLeft
  };

  toggleHodgman = () =>{
    this.setState({
      hodgmanOn: !this.state.hodgmanOn
    })
  };

  addCorrectWord = word =>{
    let array = this.state.correctWords;
    array.unshift(word);
    this.setState({
      correctWords: array
    })
  };

  resetGuessInput = () =>{
    this.setState({
      userGuess: ''
    })
  };

  removeClickClass = () => {
    let clickedElements = document.getElementsByClassName('clicked');
    while (clickedElements[0]) {
      clickedElements[0].classList.remove('clicked');
    }
  }

  toggleStartModal = () => {
    let newDisplay = this.state.display;
    newDisplay.startModal = !this.state.display.startModal
    this.setState({
      display: newDisplay
    })
  };

  toggleEndModal = () => {
    let newDisplay = this.state.display;
    newDisplay.endModal = !this.state.display.endModal
    this.setState({
      display: newDisplay
    })
  };

  startGame = () =>{
    // set "gameInProgress" to true - pass this boolean to gameboard, playarea, timer, scorebox, and wordlist to affect their return
    this.setState({
      gameInProgress: true,
      hodgmanOn: false,
      correctWords: [],
      score: 0,
      userGuess: ''
    })
    // "roll" the dice to determine the game board
    this.rollDice();
    // reset the time in case the user clicks "start" during the middle of a game
    this.resetTimer();
    // start the game timer
    this.startTimer();
  };

  endGame = () => {
    this.toggleEndModal();
  };

  render(){
    return (
      <div className="App">
        <StartModal
          modal={this.state.display.startModal}
          toggleStartModal={this.toggleStartModal}
          startGame={this.startGame}
        />
        <EndModal
          modal={this.state.display.endModal}
          toggleEndModal={this.toggleEndModal}
          startGame={this.startGame}
          correctWords={this.state.correctWords}
          score={this.state.score}
        />
        <Container>
          <Row>
            <Col sm={8}>
              <GameBoard
                hodgmanOn={this.state.hodgmanOn}
                boardLayout={this.state.boardLayout}
                // toggleHodgman={this.toggleHodgman}
                gameInProgress={this.state.gameInProgress}
                changeInput={this.changeInput}
                userGuess={this.state.userGuess}
              />
              <PlayArea
                // toggleHodgman={this.toggleHodgman}
                startGame={this.startGame} 
                hodgmanOn={this.state.hodgmanOn} 
                userGuess={this.state.userGuess} 
                changeInput={this.changeInput} 
                addCorrectWord={this.addCorrectWord}
                resetGuessInput={this.resetGuessInput}
                boardLayout={this.state.boardLayout}
                correctWords={this.state.correctWords}
                changeLastAnswer={this.changeLastAnswer}
                updateScore={this.updateScore}
                loseAPoint={this.loseAPoint}
                gameInProgress={this.state.gameInProgress}
                removeClickClass={this.removeClickClass}
                toggleHodgman={this.toggleHodgman}
              />
            </Col>
            <Col sm={4}>
              <Timer
                // changeTime={this.changeTime}
                time={this.state.time}
                gameInProgress={this.state.gameInProgress}
              />
              <ScoreBox
                score={this.state.score}
                lastAnswer={this.state.lastAnswer}
                gameInProgress={this.state.gameInProgress}
              />
              <WordList
                correctWords={this.state.correctWords}
                incorrectGuess={this.state.incorrectGuess}
                gameInProgress={this.state.gameInProgress}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
