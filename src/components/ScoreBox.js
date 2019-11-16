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
            <div>
                <h3>Score: {this.props.score}</h3>
                <div className={this.state.messageClass}>
                    {this.props.lastAnswer.message}
                </div>
            </div>
        )
    }
}

export default ScoreBox;