import React from "react";
import "./SubmitForm.css"

const SubmitForm = (props) => {
    return(
        <div className="submit-container">
            <input className="state-input" onChange={props.changed} value={props.inputValue} ref={props.reference} />
            <button className="submit-button" onClick={props.clicked}>Submit</button>
        </div>
    )
}

export default SubmitForm;