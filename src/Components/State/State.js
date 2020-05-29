import React, { useState } from "react";
import "./State.css"

const State = (props) => {   
    return (
        <div className="state-container">
            <img className="state-image" src={props.image} />
            <div className="whole-hint-container">
                <div class="hint-container" onClick={props.showHint}>
                    <p className="hint-prop">Need a hint</p>
                    <img class="hint-icon" src="https://image.flaticon.com/icons/svg/1828/1828934.svg" />
                </div>
                <p className="hint-message">{props.hintMessage}</p>
            </div>
        </div>
    )
}

export default State;