import React from "react";
import "./State.css"

const State = (props) => {   
    return (
        <div className="state-container">
            <img className="state-image" src={props.image} alt="state-image"/>
            <div className="whole-hint-container">
                <div className="hint-container" onClick={props.showHint}>
                    <p className="hint-prop">Need a hint</p>
                    <img className="hint-icon" src="https://image.flaticon.com/icons/svg/1828/1828934.svg" alt="hint-icon" />
                </div>
                <p className="hint-message">{props.hintMessage}</p>
            </div>
        </div>
    )
}

export default State;