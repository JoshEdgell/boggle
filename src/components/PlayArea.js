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
    };

    let boardAllowsWord = term => {
        // "array" is the board that's passed in through props
        let array = props.boardLayout
        let word = term.toUpperCase().split('');
        let letters = [];
        let letterPositions = {};
        for (let i = 0; i < array.length; i++) {
            let newArray = [];
            for (let j = 0; j < array[i].length; j++) {
                newArray.push(array[i][j].value);
                if (word.includes(array[i][j].value)) {
                    if (letterPositions[array[i][j].value]) {
                        letterPositions[array[i][j].value].push({row: i, col: j})
                    } else {
                        letterPositions[array[i][j].value] = [{row: i, col: j}]
                    }
                }
            }
            letters.push(newArray);
        }
        if (Object.keys(letterPositions).length < word.length);
        // Paths is going to be an array of arrays
        let paths = [[]];
        // Go through each letter in "word"
        // If there's only one letter position for a letter, put that letter position at the end of every path in "paths"
        // If there are j letter positions for a letter, make j copies of "paths" into a new array
        // In each set of j copies, put the jth letter position at the end of each array
        // This should give all possible paths
        for (let i = 0; i < word.length; i++){
            let newPaths = [];
            if (letterPositions[word[i]]) {
                // If there's a key in letterPositions for a letter in the word...
                for (let j = 0; j < letterPositions[word[i]].length; j++) {
                    // Go through each of the keys in letterPosition
                    for (let k = 0; k < paths.length; k++) {
                        // If the letter position isn't already in a path's array, put it at the end of the path
                        if (!paths[k].includes(letterPositions[word[i]][j])) {
                        let array = Array.from(paths[k]);
                        array.push(letterPositions[word[i]][j]);
                        newPaths.push(array);
                        }
                    }
                };
            } else {
                // If there isn't a key in letterPositions for a letter in the word, return false because it's impossible to make the word from the letters on the board
                return false;
            }
            paths = newPaths;
        }
        for (let i = 0; i < paths.length; i++) {
            // Travel through each path in "paths"
            let path = paths[i];
            let linkExists = true;
            for (let j = 0; j < path.length - 1; j++) {
                // If the distance between two positions on the board is more than one space either vertically or horizontally, the path is broken.  Set "linkExists" to false, break out of the loop to try the next path
                if ( !(Math.abs(path[j].row - path[j+1].row) < 2) || !(Math.abs(path[j].col - path[j+1].col) < 2) ) {
                    linkExists = false;
                    break;
                }
            }
            if (linkExists) {
                // If a path has made it all the way through with links between each pair of letter positions, the path works, and the word can be made from the letters on the board
                return true;
            }
        }
        // If all paths have been tested and none of them work, return "false"
        return false;
    };

    let handleFormSubmit = event =>{
        event.preventDefault();

        if (boardAllowsWord(props.userGuess)) {
            // If the game board can make the word...
            if (!props.correctWords.includes(props.userGuess)) {
                // ...and the word hasn't been guessed
                // Check the entry against the api
                let route = `${url}/${props.userGuess}?key=${key}`
                axios({
                    method: 'GET',
                    url: route
                }).then((response)=>{
                    if (response.data[0].def === undefined) {
                        // props.changeInput('incorrectGuess', `${props.userGuess} isn't a word`);
                        props.changeLastAnswer(`${props.userGuess} isn't a word`, 'incorrect');
                        props.resetGuessInput();
                    } else {
                        props.addCorrectWord(props.userGuess);
                        props.changeLastAnswer(`${props.userGuess} is a word!`, 'correct')
                        props.resetGuessInput();
                    }
                }).catch((error)=>{
                    console.log(error, "error from dictionary")
                })
            } else {
                //If the word has already been guessed
                // props.changeInput('incorrectGuess',`${props.userGuess} has already been guessed`);
                props.changeLastAnswer(`${props.userGuess} has already been guessed`, 'incorrect');
                props.resetGuessInput();
            }
        } else {
            //If the game board can't make the word
            // props.changeInput('incorrectGuess', `${props.userGuess} isn't on the board`)
            props.changeLastAnswer(`${props.userGuess} isn't on the board`, 'incorrect')
            props.resetGuessInput();
        }
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