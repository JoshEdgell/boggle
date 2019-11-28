import React from 'react';
import { Container, Row, Col } from 'reactstrap';

// var _ = require('lodash');

function GameBoard(props){

    // const toggleHodgman = () =>{
    //     props.toggleHodgman();
    // };

    const handleClick = event => {
        const letter = event.target.innerHTML;
        let target = event.target;
        let array = Array.from(event.target.classList);
        if (array.includes('clicked')) {
            // show the letter as unclicked
            target.classList.remove('clicked');
            // go through the word backward and remove the last occurrence of the letter from the word
            let newWord = props.userGuess.split('');
            newWord = newWord.reverse().join('').replace(letter,'');
            newWord = newWord.split('').reverse().join('');
            // update the user guess
            props.changeInput('userGuess',newWord);
        } else {
            // show the letter as clicked
            target.classList.add('clicked');
            // put the clicked letter at the end of the user guess
            let newWord = props.userGuess;
            newWord += letter;
            // update the user guess
            props.changeInput('userGuess',newWord)
        };
    };

    // props.boardLayout is now an array of 5 arrays, each containing 5 objects.  Each object has a key of "value" which is the letter's value and "class" which is the class that determines the orientation of the tile itself

    let createBoard = props.boardLayout.map((array, i)=>{
        return(
            <Row className='letter-row' key={`row ${i}`}>
                {array.map((die, j)=>{
                    return(
                        <Col key={`die ${i},${j}`} className='tile-col'>
                            <div className={props.hodgmanOn ? `tile` : `tile ${die.class}`} onClick={handleClick}>
                                {die.value}
                            </div>
                        </Col>
                    )
                })}
            </Row>
        )
    })

    return(
        props.gameInProgress ? 
            <Container className='gameboard'>
                {createBoard}
                {/* <Row id='hodgman-button'>
                    <Button onClick={toggleHodgman}>{props.hodgmanOn ? "Hodgman Off" : "Hodgman On"}</Button>
                </Row> */}
            </Container>
        :
        null
    )
    
};

export default GameBoard;