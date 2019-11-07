import React from 'react';

function WordList(props){

    const list = props.correctWords.map((word, i)=>{
        return(
            <li className='correct-words' key={`word ${i}`}>{word}</li>
        )
    })
    return(
        <div className='word-list'>
            <h3>Correct Words</h3>
            <ul>
                {list}
            </ul>
        </div>
    )
};

export default WordList;