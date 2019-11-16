import React, { Component } from 'react';
// import React from 'react';

class Notification extends Component{
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
            <div className={this.state.messageClass}>
            {this.props.lastAnswer.message}
        </div>
        )
    }
}

// function Notification(props){

//     let getClassName = () =>{
//         console.log("getting className")
//         return(
//             props.lastAnswer.className
//         )
//     }

//     return(
//         <div className={getClassName()}>
//             {props.lastAnswer.message}
//         </div>
//     )
// };

export default Notification;