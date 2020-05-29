import React from "react";
import "./Messages.css"

const Messages = (props) => {
    const classNames = ["message-container"];
    if (props.message === "Correct") {
        classNames.push("state-correct");
    }
    else if (props.message === "Incorrect") {
        classNames.push("state-incorrect");
    }
    else {
        classNames.push("state-message-none");
    }

    return(
        <div className={classNames.join(" ")}>
            <p className="state-message">{props.message}</p>
            <img className="message-image" src={props.messageImage} />
        </div>     
    )
}

export default Messages;