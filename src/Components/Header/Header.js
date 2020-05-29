import React from "react";
import "./Header.css"

const Header = (props) => {
    return(
        <div className="header-container">
           <p className="header-title">Do you know your states?</p>
           <button className="restart-button" onClick={props.restart}>Restart</button>
           <p>States Correct: {props.correct}</p>
        </div>
    )
}

export default Header;