import React from "react";
import { StyledModal, Overlay } from "./styles/Modal.styled";

function Modal(props) {
    return (
        <Overlay onClick={props.handleClick}>
            <StyledModal onClick={(e) => e.stopPropagation()}>
                {props.children}
            </StyledModal>
        </Overlay>
    );
}

export default Modal;
