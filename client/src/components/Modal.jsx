import React from "react";

function Modal(props) {
    return (
        <div className="overlay" onClick={props.handleClick}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;
