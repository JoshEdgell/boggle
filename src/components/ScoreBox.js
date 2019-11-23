import React, { Component } from 'react';
// import React from 'react';

class ScoreBox extends Component{
    constructor(props){
        super();
        this.state = {
            messageClass: 'hide'
        }
    }

    componentDidUpdate = (prevProps) => {
        if ( (prevProps.lastAnswer.message !== this.props.lastAnswer.message) || (prevProps.lastAnswer.className !== this.props.lastAnswer.className) ) {
            this.setState({
                messageClass: this.props.lastAnswer.className
            })
            this.messageTimeout();
        }
    }

    messageTimeout = () => {
        setTimeout(()=>{
            this.setState({
                messageClass: 'hide'
            })
        }, 1000)
    };

    render(){
        return(
            this.props.gameInProgress ? 
                <div className='score-box'>
                    <h3>Score: <strong>{this.props.score}</strong></h3>
                    <div className={`${this.state.messageClass} alert-message`}>
                        {this.props.lastAnswer.message}
                    </div>
                </div>
            :
                <div></div>
        )
    }
}

export default ScoreBox;