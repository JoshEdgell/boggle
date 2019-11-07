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

    let handleFormSubmit = event =>{
        event.preventDefault();
        
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