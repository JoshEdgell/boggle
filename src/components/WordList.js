import React from 'react';

function WordList(props){

    const list = props.correctWords.map((word, i)=>{
        return(
            <li className='correct-words' key={`word ${i}`}>{word}</li>
        )
    });

    return(
        props.gameInProgress ?
            <div className='word-list'>
                <h3><strong>Correct Words</strong></h3>
                <ul>
                    {list}
                </ul>
            </div>
        :
            <div></div>
    )
};

export default WordList;