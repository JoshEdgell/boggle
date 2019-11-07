import React from 'react';

function Timer(props){

    return(
        <div className='timer'>
            <h3>{props.time}</h3>
        </div>
    )
}

export default Timer;