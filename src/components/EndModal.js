import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, Container, Row, Col, ModalFooter } from 'reactstrap';

const EndModal = (props) => {

    const toggle = () => {
        props.toggleEndModal();
    }

    const startGame = () =>{
        toggle();
        props.startGame();
    }

    const getWords = props.correctWords.map((word)=>{
        return(
            <Col sm={2} key={word}>
                {word}
            </Col>
        )
    })
    return(
        <Modal isOpen={props.modal} toggle={toggle}>
            <ModalHeader>
                Final Score: {props.score}
            </ModalHeader>
            <ModalBody>
                <h3>You found the following words:</h3>
                <Container>
                    <Row>
                        {getWords}
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <span id='restart-text'>Want to play again?</span>
                <Button onClick={startGame}>New Game</Button>
            </ModalFooter>
        </Modal>
    )
};

export default EndModal;