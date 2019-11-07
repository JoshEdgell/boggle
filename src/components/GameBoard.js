import React from 'react';
import { Container, Row, Col } from 'reactstrap';

// var _ = require('lodash');

function GameBoard(props){

    // props.boardLayout is now an array of 5 arrays, each containing 5 objects.  Each object has a key of "value" which is the letter's value and "class" which is the class that determines the orientation of the tile itself

    let createBoard = props.boardLayout.map((array, i)=>{
        return(
            <Row key={`row ${i}`}>
                {array.map((die, j)=>{
                    return(
                        <Col key={`die ${i},${j}`} className='tile-col'>
                            <div className={props.hodgmanOn ? `tile` : `tile ${die.class}`}>
                                {die.value}
                            </div>
                        </Col>
                    )
                })}
            </Row>
        )
    })

    return(
        <Container className='gameboard'>
            {createBoard}
        </Container>
    )
    
};

export default GameBoard;