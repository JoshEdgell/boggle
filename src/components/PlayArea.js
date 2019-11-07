import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function PlayArea(props){
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
        // Clear the input form
        console.log('submitting form');
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