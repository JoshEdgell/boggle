import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
require('dotenv').config();

function PlayArea(props){

    let url = 'https://dictionaryapi.com/api/v3/references/collegiate/json';

    let key = '68739ef5-c8a8-4666-904d-3c89d7427568'

    const toggleHodgman = () =>{
        props.toggleHodgman();
    };

    let handleInputChange = event =>{
        const { name, value } = event.target;
        props.changeInput(name, value)
    }
    let boardAllowsWord = term =>{
        const word = term.toUpperCase();
        let letterPositions = {};
        let array = props.boardLayout
        //Find the positions of all the letters in "word"
        for (let h = 0; h < word.length; h++) {
            letterPositions[word.charAt(h)] = [];
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    if (array[i][j].value === word.charAt(h)) {
                        letterPositions[array[i][j].value].push({row: i, col: j})
                    }
                }
            };
        };
        // Set chainBroken to false ("chainBroken" is a boolean that is true when the word can't be traced through the array)
        let chainBroken = false;
        // If the word is shorter than three letters, the word is not allowed
        if (word.length < 3) {
            chainBroken = false;
        }
        // If the first letter of the word isn't on the board, the word is not allowed
        if (letterPositions[word.charAt(0)].length === 0) {
            chainBroken = true;
        }
        // From each of the positions of the first letter...
        for (let i = 0 ; i < letterPositions[word.charAt(0)].length; i++) {
            // "currentPosition" is the object with the row and column of the current place in the chain
            let currentPosition = letterPositions[word.charAt(0)][i]
            // Cycle through the letters in the word
            for (let j = 1; j < word.length; j++) {
                // Set linkExists to false ("linkExists" is a boolean that indicates there's a link between the current letter and the next - the next letter's array of positions contains an element that is one space away from the current letter's position)
                let linkExists = false;
                // Cycle through the array of values for each letter, checking all positions against "currentPosition"
                // If one position is within one space (but not on the same space) of "currentPosition," set "linkExists" to true
                // If no positions are within one space of "currentPosition," set "chainBroken" as false
                for (let k = 0; k < letterPositions[word.charAt(j)].length; k++) {
                    if ( ( Math.abs(currentPosition.row - letterPositions[word.charAt(j)][k].row) < 2 && Math.abs(currentPosition.col - letterPositions[word.charAt(j)][k].col) < 2 ) && (currentPosition.row !== letterPositions[word.charAt(j)][k].row || currentPosition.col !== letterPositions[word.charAt(j)][k].col) ) {
                        currentPosition = letterPositions[word.charAt(j)][k];
                        linkExists = true;
                    }
                    if (linkExists) {
                        currentPosition = letterPositions[word.charAt(j)][k];
                        break;
                    }
                }
                if (!linkExists) {
                    chainBroken = true;
                }
            }
        }
        return !chainBroken
    };

    let handleFormSubmit = event =>{
        event.preventDefault();

        if (boardAllowsWord(props.userGuess)) {
            console.log(`${props.userGuess} is on the board`)
        } else {
            console.log(`${props.userGuess} is not on the board`)
        }
        
        // Check the entry against the api
        let route = `${url}/${props.userGuess}?key=${key}`
        axios({
            method: 'GET',
            url: route
        }).then((response)=>{
            if (response.data.length !== 0) {
                props.addCorrectWord(props.userGuess);
                props.resetGuessInput();
            } else {
                console.log(`${props.userGuess} is not a word`)
            }
        }).catch((error)=>{
            console.log(error, "error from dictionary")
        })
        // Clear the input form
        // console.log('submitting form');
    }

    let startButton = () =>{
        if (!props.gameInProgress) {
            return(
                <Button onClick={props.startGame}>Start Game</Button>
            )
        }
    }

    return(
        <div className='playarea'>
            {startButton()}
            <Button onClick={toggleHodgman}>{props.hodgmanOn ? "Hodgman Off" : "Hodgman On"}</Button>
            <Form>
                <FormGroup>
                    <Label for='user-guess'>
                        <Input id='user-guess' type='text' name='userGuess' value={props.userGuess} onChange={handleInputChange}/>
                    </Label>
                    <Input type='submit' value='Guess' onClick={handleFormSubmit}/>
                </FormGroup>
            </Form>
        </div>
    )
};

export default PlayArea;