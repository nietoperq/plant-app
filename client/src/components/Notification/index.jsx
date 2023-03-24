import React, { useState, forwardRef } from "react";
import * as Styled from "./styles";

function Notification(props, ref) {
    const [showNotification, setShowNotification] = useState(true);
    console.log(props.show);
    return (
        <Styled.Notification className={props.show ? "show" : "hide"}>
            {props.children}
        </Styled.Notification>
    );
}

export default Notification;
