import React from "react";
import * as Styled from "./styles";

function Auth(props) {
    return (
        <Styled.Container>
            <Styled.Auth>{props.children}</Styled.Auth>
        </Styled.Container>
    );
}

export default Auth;
