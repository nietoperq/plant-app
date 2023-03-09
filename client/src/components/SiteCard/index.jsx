import React from "react";

import * as Styled from "./styles";

function SiteCard(props) {
    const { siteId, name, icon, handleClick } = props;

    function genIcon(icon) {
        switch (icon) {
            case "bedroom":
                return "🛏️";
            case "balcony":
                return "🪟";
            case "livingroom":
                return "🛋️";
            default:
                return "🏡";
        }
    }

    const emoji = genIcon(icon);

    return (
        <Styled.SiteCard id={siteId} onClick={handleClick}>
            <h1>{emoji}</h1>
            <h1>{name}</h1>
        </Styled.SiteCard>
    );
}

export default SiteCard;
