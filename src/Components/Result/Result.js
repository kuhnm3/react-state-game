import React from "react";
import "./Result.css"

const Result = (props) => {
    const amountCorrect = props.amount;
    let response = null;
    let gif = null;
    
    if (amountCorrect < 3) {
        response = "Oh damn, this is disappointing. You should really learn more about the states."
        gif = "https://media2.giphy.com/media/3o7Zesyac4CuSN5rsA/giphy.gif?cid=ecf05e478811ca2ba10e31fb82210ffb93ba4997afddfbb9&rid=giphy.gif"
    }
    else if (amountCorrect >= 3 && amountCorrect < 7) {
        response = "Alright alright, I mean you know some states, but you really gotta pick it up"
        gif = "https://media1.giphy.com/media/3rSNZwEP4gJsyWFDuI/giphy.gif?cid=ecf05e47046142b90c7b7188fb58f6f30c24cdfa7e8761c4&rid=giphy.gif"
    }
    else if (amountCorrect >= 7) {
        response = "Good job Fam. You know the states of this country. I am proud of yous"
        gif = "https://media3.giphy.com/media/Is1O1TWV0LEJi/giphy.gif?cid=ecf05e47cd22f7ad6b0f822fba5615d4346352e8ef0ff502&rid=giphy.gif"
    }
    
    return(
        <div className="result-container">
           <p className="result-title">You got {amountCorrect} states correct</p>
           <p className="result-response">{response}</p>
           <img className="result-gif" src={gif} alt="gif"/>
           <button className="result-restart-button" onClick={props.restart}>Restart</button>
        </div>
    )
}

export default Result;