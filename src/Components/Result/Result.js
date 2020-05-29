import React from "react";
import "./Result.css"

const Result = (props) => {
    return(
        <div className="result-container">
           <p className="result-title">You got {props.amountCorrect} states correct</p>
           <p className="result-response">{props.response}</p>
           {/* <p>{props.statesCorrect}</p> */}
           <img className="result-gif" src={props.image} />
           <button className="result-restart-button" onClick={props.restart}>Restart</button>
        </div>
    )
}

export default Result;