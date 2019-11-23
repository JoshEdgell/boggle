import React from 'react';

function Timer(props){

    return(
        props.gameInProgress ?
            <div className='timer'>
                <h3>{props.time}</h3>
            </div>
        : 
            <div></div>
    )
}

export default Timer;