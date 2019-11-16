import React from 'react';

function WordList(props){

    console.log(props, `props coming into wordList`)

    const list = props.correctWords.map((word, i)=>{
        return(
            <li className='correct-words' key={`word ${i}`}>{word}</li>
        )
    });
    const incorrect =() =>{
        return(
            <li className='correct-words'>
                {props.incorrectGuess}
            </li>
        )
    }
    return(
        <div className='word-list'>
            <h3>Correct Words</h3>
            <ul>
                {list}
                {incorrect()}
            </ul>
        </div>
    )
};

export default WordList;