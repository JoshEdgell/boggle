import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const StartModal = (props) => {

    const toggle = () => {
        props.toggleStartModal();
    }

    const startGame = () =>{
        toggle();
        props.startGame();
    }
    return(
        <Modal isOpen={props.modal} toggle={toggle}>
            <ModalHeader>
                The Unofficial <span className='title-text' title="While John Hodgman was the original inspiration for this game, he was not involved in the planning, developing, or design of this game.  If he wishes to endorse this game as his official Boggle game, credit will be given both freely and happily.  If he wishes his name removed, it shall be done with no ill-will retained by me, the game's creator.">"John Hodgman"</span> Boggle Game
            </ModalHeader>
            <ModalBody>
                <p>Boggle is a word game played with between 16 and 49 lettered dice, which are shaken within a game tray to randomly generate a "board" of letters on which to play</p>
                <p>Players have three minutes to find as many <span className='title-text' title="as defined by the Merriam-Webster Collegiate Dictionary, or at least by their dictionary API">words</span> as possible on the grid, according to the following rules</p>
                <ul>
                    <li>The letters must be adjoining in a chain vertically, horizontally, diagonally, or a combination thereof</li>
                    <li>Words must contain at least three letters</li>
                    <li>No letter cube may be used more than once</li>
                </ul>
                <p>Longer words mean higher scores, so the more "long words" a player can find, the better.  Scoring is as follows:</p>
                <ul>
                    <li>3 lettes - 1 point</li>
                    <li>4 lettes - 2 points</li>
                    <li>5 lettes - 3 points</li>
                    <li>6 lettes - 4 points</li>
                    <li>7 lettes - 5 points</li>
                    <li>8 or more lettes - 11 points</li>
                </ul>
                <p><em>Why is this "John Hodgman's" (Unofficial) Boggle Game?</em> - In episode 354 of the Judge John Hodgman Podcast ("Undisclosed Financial Settlement of Catan"), Mr. Hodgman stated that he doesn't enjoy Boggle because the letters are oriented the wrong way.  As an aspiring web developer, I thought making a Boggle game that could reorient the dice to face the user (while also allowing the user the challenge of playing the game "traditionally") would be a fun challenge.</p>
                <p>If, while playing, you would like to trigger the "Hodgman Rule," you may click the button to reorient the dice with no penalty to your score.  Clicking "Hodgman Off" will return the dice to their original, less-enjoyable positions.</p>
                <p>So, without further ado, please enjoy a fun game of Boggle (or, a less-fun version should you choose to leave the dice in their weird orientations)!</p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={startGame}>Start Game</Button>
            </ModalFooter>
        </Modal>
    )
};

export default StartModal;