import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

// var _ = require('lodash');

function GameBoard(props){

    const toggleHodgman = () =>{
        props.toggleHodgman();
    };

    const handleClick = event => {
        const letter = event.target.innerHTML
        let target = event.target;
        let array = Array.from(event.target.classList);
        if (array.includes('clicked')) {
            console.log("this has already beeen clicked")
            target.classList.remove('clicked');
        } else {
            target.classList.add('clicked');
        }
    }

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
                <Row id='hodgman-button'>
                    <Button onClick={toggleHodgman}>{props.hodgmanOn ? "Hodgman Off" : "Hodgman On"}</Button>
                </Row>
            </Container>
        :
        null
    )

    // if (props.gameInProgress) {
    //     return(
    //         <Container className='gameboard'>
    //             {createBoard}
    //             <Button onClick={toggleHodgman}>{props.hodgmanOn ? "Hodgman Off" : "Hodgman On"}</Button>
    //         </Container>
    //     )
    // } else {
    //     return(
    //         <Container className='gameboard'>
                
    //         </Container>
    //     )
    // }
    
};

export default GameBoard;