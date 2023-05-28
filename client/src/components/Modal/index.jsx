import React from "react";
import * as Styled from "./styles";

function Modal(props) {
    return (
        <Styled.Overlay onClick={props.handleClick}>
            <Styled.Modal onClick={(e) => e.stopPropagation()}>
                {props.children}
                <Styled.CloseButton onClick={props.handleClick}>
                    ✕
                </Styled.CloseButton>
            </Styled.Modal>
        </Styled.Overlay>
    );
}

export default Modal;
